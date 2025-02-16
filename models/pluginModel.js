import { db } from "../config/db.js";

export const getAllItems = async (
  page = 1,
  limit = 10,
  sortBy = "created_at",
  order = "ASC"
) => {
  const offset = (page - 1) * limit;

  const { rows } = await db.query(
    `SELECT * FROM plugins ORDER BY ${sortBy} ${order} LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const { rows: countRows } = await db.query(
    "SELECT COUNT(*) AS total FROM plugins"
  );
  const total = parseInt(countRows[0].total, 10);

  return {
    items: rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
