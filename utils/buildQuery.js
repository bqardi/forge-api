export const buildUpdateQuery = (table, id, fields) => {
  const setClauses = [];
  const values = [];
  let query = `UPDATE ${table} SET `;

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined && fields[key] !== null) {
      setClauses.push(`${key} = $${values.length + 1}`);
      values.push(fields[key]);
    }
  });

  if (setClauses.length === 0) {
    throw new Error("No fields to update");
  }

  query +=
    setClauses.join(", ") + ` WHERE id = $${values.length + 1} RETURNING *`;
  values.push(id);

  return { query, values };
};

export const buildCreateQuery = (table, fields) => {
  const keys = [];
  const placeholders = [];
  const values = [];
  let query = `INSERT INTO ${table} (`;

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined && fields[key] !== null) {
      keys.push(key);
      placeholders.push(`$${values.length + 1}`);
      values.push(fields[key]);
    }
  });

  query += keys.join(", ") + ") VALUES (" + placeholders.join(", ") + ")";

  return { query, values };
};
