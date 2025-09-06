import { pool } from "../config/db.js";

export const findByMovieId = async (movieId, date = null) => {
  let query = `
    SELECT s.*, sc.screen_name, sc.screen_number, t.name as theater_name, t.address as theater_address
    FROM showtimes s
    JOIN screens sc ON s.screen_id = sc.id
    JOIN theaters t ON sc.theater_id = t.id
    WHERE s.movie_id = $1 AND s.is_active = true
  `;
  const params = [movieId];

  if (date) {
    query += ` AND s.show_date = $2`;
    params.push(date);
  }

  query += ` ORDER BY s.show_date, s.show_time`;

  const result = await pool.query(query, params);
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    `
    SELECT s.*, sc.screen_name, sc.screen_number, sc.seat_layout, 
           t.name as theater_name, t.address as theater_address,
           m.title as movie_title, m.duration
    FROM showtimes s
    JOIN screens sc ON s.screen_id = sc.id
    JOIN theaters t ON sc.theater_id = t.id
    JOIN movies m ON s.movie_id = m.id
    WHERE s.id = $1 AND s.is_active = true
  `,
    [id]
  );
  return result.rows[0];
};

export const create = async (showtimeData) => {
  const { movie_id, screen_id, show_date, show_time, price } = showtimeData;
  const result = await pool.query(
    `INSERT INTO showtimes (movie_id, screen_id, show_date, show_time, price)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [movie_id, screen_id, show_date, show_time, price]
  );
  return result.rows[0];
};

export const update = async (id, showtimeData) => {
  const { movie_id, screen_id, show_date, show_time, price } = showtimeData;
  const result = await pool.query(
    `UPDATE showtimes 
     SET movie_id = $1, screen_id = $2, show_date = $3, show_time = $4, 
         price = $5, updated_at = CURRENT_TIMESTAMP
     WHERE id = $6 RETURNING *`,
    [movie_id, screen_id, show_date, show_time, price, id]
  );
  return result.rows[0];
};

export const remove = async (id) => {
  const result = await pool.query(
    "UPDATE showtimes SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const getAvailableSeats = async (showtimeId) => {
  const result = await pool.query(
    `
    SELECT 
      s.seat_layout,
      COALESCE(
        json_agg(
          json_build_object(
            'seat_number', bs.seat_number,
            'seat_price', bs.seat_price
          )
        ) FILTER (WHERE bs.seat_number IS NOT NULL),
        '[]'::json
      ) as booked_seats
    FROM showtimes st
    JOIN screens s ON st.screen_id = s.id
    LEFT JOIN bookings b ON st.id = b.showtime_id AND b.booking_status = 'confirmed'
    LEFT JOIN booking_seats bs ON b.id = bs.booking_id
    WHERE st.id = $1 AND st.is_active = true
    GROUP BY s.seat_layout
  `,
    [showtimeId]
  );

  return result.rows[0];
};
