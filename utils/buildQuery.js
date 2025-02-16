export const buildUpdateQuery = (table, id, fields) => {
  const setClauses = [];
  const values = [];
  let query = `UPDATE ${table} SET `;

  Object.keys(fields).forEach((key, index) => {
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
