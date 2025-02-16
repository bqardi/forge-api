import { db } from "../config/db.js";
import { getAllItems } from "../models/pluginModel.js";
import { buildUpdateQuery } from "../utils/buildQuery.js";

export const getAll = async (req, res) => {
  try {
    const { page, limit, sortBy, order } = req.query;

    const currentPage = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const sortOrder = order === "DESC" ? "DESC" : "ASC";
    const sortField = sortBy ?? "created_at";

    if (currentPage < 1) {
      return res
        .status(400)
        .json({ message: "Page must be a positive integer" });
    }

    if (pageSize < 1) {
      return res
        .status(400)
        .json({ message: "Limit must be a positive integer" });
    }

    const result = await getAllItems(
      currentPage,
      pageSize,
      sortField,
      sortOrder
    );

    res.status(200).json({
      items: result.items,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage,
        pageSize,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM plugins WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createOne = async (req, res) => {
  const { name, version } = req.body;
  try {
    const existingPlugin = await db.query(
      "SELECT * FROM plugins WHERE name = $1",
      [name]
    );
    if (existingPlugin.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Plugin with this name already exists" });
    }

    const result = await db.query(
      "INSERT INTO plugins (name, version) VALUES ($1, $2) RETURNING *",
      [name, version]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateOne = async (req, res) => {
  const { id } = req.params;
  const { name, version } = req.body;

  try {
    const { query, values } = buildUpdateQuery("plugins", id, {
      name,
      version,
    });

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM plugins WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
