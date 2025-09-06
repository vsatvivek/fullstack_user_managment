import { pool } from "../config/db.js";

export const findByTheaterId = async (theaterId) => {
  const result = await pool.query(
    "SELECT * FROM screens WHERE theater_id = $1 AND is_active = true ORDER BY screen_number",
    [theaterId]
  );
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM screens WHERE id = $1 AND is_active = true",
    [id]
  );
  return result.rows[0];
};

export const create = async (screenData) => {
  const { theater_id, screen_number, screen_name, total_seats, seat_layout } =
    screenData;
  const result = await pool.query(
    `INSERT INTO screens (theater_id, screen_number, screen_name, total_seats, seat_layout)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [theater_id, screen_number, screen_name, total_seats, seat_layout]
  );
  return result.rows[0];
};

export const update = async (id, screenData) => {
  const { screen_number, screen_name, total_seats, seat_layout } = screenData;
  const result = await pool.query(
    `UPDATE screens 
     SET screen_number = $1, screen_name = $2, total_seats = $3, seat_layout = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 RETURNING *`,
    [screen_number, screen_name, total_seats, seat_layout, id]
  );
  return result.rows[0];
};

export const remove = async (id) => {
  const result = await pool.query(
    "UPDATE screens SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
