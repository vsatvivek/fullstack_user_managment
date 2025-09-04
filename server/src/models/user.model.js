import { pool } from "../config/db.js"; // your pg client or pool

/**
 * Find user by email
 */
export const findByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);
  return rows[0];
};

/**
 * Insert new user
 */
export const insertUser = async ({ name, email, role = "user", status = "pending" }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, role, status) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [name, email, role, status]
  );
  return rows[0];
};

/**
 * Update user by id
 */
export const modifyUser = async (id, updates) => {
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const setClause = fields.map((f, i) => `${f}=$${i + 1}`).join(", ");
  const values = Object.values(updates);

  const { rows } = await pool.query(
    `UPDATE users SET ${setClause} WHERE id=$${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return rows[0];
};

/**
 * Delete user
 */
export const removeUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};

/**
 * Find all users with pagination, search, sort
 */
export const findAllUsers = async ({ q, sort = "created_at", offset = 0, limit = 10 }) => {
  let where = "";
  const params = [];

  if (q) {
    params.push(`%${q}%`);
    where = `WHERE name ILIKE $${params.length} OR email ILIKE $${params.length}`;
  }

  const order = sort.includes(":")
    ? `${sort.split(":")[0]} ${sort.split(":")[1].toUpperCase()}`
    : `${sort} DESC`;

  const query = `
    SELECT * FROM users 
    ${where}
    ORDER BY ${order}
    LIMIT ${limit} OFFSET ${offset}
  `;

  const { rows } = await pool.query(query, params);

  const countRes = await pool.query(
    `SELECT COUNT(*) FROM users ${where}`,
    params
  );

  return { rows, count: parseInt(countRes.rows[0].count, 10) };
};

/**
 * Export users to CSV
 */
export const exportUsersToCSV = async () => {
  const { rows } = await pool.query(
    "SELECT name, email, role, status, created_at FROM users ORDER BY created_at DESC"
  );

  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]).join(",");
  const csv = [headers, ...rows.map((r) => Object.values(r).join(","))].join("\n");
  return csv;
};

/**
 * Count users by status (for dashboard chart)
 */
export const countUsersByStatus = async () => {
  const { rows } = await pool.query(`
    SELECT status, COUNT(*) as count
    FROM users
    GROUP BY status
  `);

  // Convert array into an object like { active: 5, pending: 3, inactive: 2 }
  const stats = {};
  rows.forEach((r) => {
    stats[r.status] = parseInt(r.count, 10);
  });

  return stats;
};