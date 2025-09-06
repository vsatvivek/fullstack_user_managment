import { pool } from "../config/db.js";

export const findAll = async (filters = {}) => {
  const { genre, search, limit = 20, offset = 0 } = filters;
  let query = `
    SELECT * FROM movies 
    WHERE is_active = true
  `;
  const params = [];
  let paramCount = 0;

  if (genre) {
    paramCount++;
    query += ` AND genre = $${paramCount}`;
    params.push(genre);
  }

  if (search) {
    paramCount++;
    query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
    params.push(`%${search}%`);
  }

  query += ` ORDER BY release_date DESC LIMIT $${paramCount + 1} OFFSET $${
    paramCount + 2
  }`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM movies WHERE id = $1 AND is_active = true",
    [id]
  );
  return result.rows[0];
};

export const create = async (movieData) => {
  const {
    title,
    description,
    duration,
    genre,
    rating,
    release_date,
    poster_url,
    trailer_url,
  } = movieData;
  const result = await pool.query(
    `INSERT INTO movies (title, description, duration, genre, rating, release_date, poster_url, trailer_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      title,
      description,
      duration,
      genre,
      rating,
      release_date,
      poster_url,
      trailer_url,
    ]
  );
  return result.rows[0];
};

export const update = async (id, movieData) => {
  const {
    title,
    description,
    duration,
    genre,
    rating,
    release_date,
    poster_url,
    trailer_url,
  } = movieData;
  const result = await pool.query(
    `UPDATE movies 
     SET title = $1, description = $2, duration = $3, genre = $4, rating = $5, 
         release_date = $6, poster_url = $7, trailer_url = $8, updated_at = CURRENT_TIMESTAMP
     WHERE id = $9 RETURNING *`,
    [
      title,
      description,
      duration,
      genre,
      rating,
      release_date,
      poster_url,
      trailer_url,
      id,
    ]
  );
  return result.rows[0];
};

export const remove = async (id) => {
  const result = await pool.query(
    "UPDATE movies SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const getGenres = async () => {
  const result = await pool.query(
    "SELECT DISTINCT genre FROM movies WHERE is_active = true AND genre IS NOT NULL ORDER BY genre"
  );
  return result.rows.map((row) => row.genre);
};
