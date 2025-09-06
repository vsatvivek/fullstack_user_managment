import { pool } from "../config/db.js";

export const findAll = async () => {
  const result = await pool.query(
    "SELECT * FROM theaters WHERE is_active = true ORDER BY name"
  );
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM theaters WHERE id = $1 AND is_active = true",
    [id]
  );
  return result.rows[0];
};

export const create = async (theaterData) => {
  const { name, address, city, state, zip_code, phone, total_screens } =
    theaterData;
  const result = await pool.query(
    `INSERT INTO theaters (name, address, city, state, zip_code, phone, total_screens)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, address, city, state, zip_code, phone, total_screens]
  );
  return result.rows[0];
};

export const update = async (id, theaterData) => {
  const { name, address, city, state, zip_code, phone, total_screens } =
    theaterData;
  const result = await pool.query(
    `UPDATE theaters 
     SET name = $1, address = $2, city = $3, state = $4, zip_code = $5, 
         phone = $6, total_screens = $7, updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 RETURNING *`,
    [name, address, city, state, zip_code, phone, total_screens, id]
  );
  return result.rows[0];
};

export const remove = async (id) => {
  const result = await pool.query(
    "UPDATE theaters SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
