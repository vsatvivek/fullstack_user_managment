import { pool } from "../config/db.js";
import { randomBytes } from "crypto";

export const create = async (bookingData) => {
  const { user_id, showtime_id, seats } = bookingData;

  // Generate unique booking reference
  const bookingReference = "BK" + randomBytes(4).toString("hex").toUpperCase();

  // Calculate total amount
  const totalAmount = seats.reduce(
    (sum, seat) => sum + parseFloat(seat.price),
    0
  );

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Create booking
    const bookingResult = await client.query(
      `INSERT INTO bookings (user_id, showtime_id, booking_reference, total_amount)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, showtime_id, bookingReference, totalAmount]
    );

    const booking = bookingResult.rows[0];

    // Create booking seats
    for (const seat of seats) {
      await client.query(
        `INSERT INTO booking_seats (booking_id, seat_number, seat_price)
         VALUES ($1, $2, $3)`,
        [booking.id, seat.seat_number, seat.price]
      );
    }

    await client.query("COMMIT");

    // Return booking with seats
    const result = await pool.query(
      `
      SELECT b.*, 
             json_agg(
               json_build_object(
                 'seat_number', bs.seat_number,
                 'seat_price', bs.seat_price
               )
             ) as seats,
             st.show_date, st.show_time, st.price as showtime_price,
             m.title as movie_title, m.duration,
             sc.screen_name, sc.screen_number,
             t.name as theater_name, t.address as theater_address
      FROM bookings b
      JOIN booking_seats bs ON b.id = bs.booking_id
      JOIN showtimes st ON b.showtime_id = st.id
      JOIN movies m ON st.movie_id = m.id
      JOIN screens sc ON st.screen_id = sc.id
      JOIN theaters t ON sc.theater_id = t.id
      WHERE b.id = $1
      GROUP BY b.id, st.show_date, st.show_time, st.price, m.title, m.duration, 
               sc.screen_name, sc.screen_number, t.name, t.address
    `,
      [booking.id]
    );

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const findByUserId = async (userId, limit = 20, offset = 0) => {
  const result = await pool.query(
    `
    SELECT b.*, 
           json_agg(
             json_build_object(
               'seat_number', bs.seat_number,
               'seat_price', bs.seat_price
             )
           ) as seats,
           st.show_date, st.show_time, st.price as showtime_price,
           m.title as movie_title, m.duration, m.poster_url,
           sc.screen_name, sc.screen_number,
           t.name as theater_name, t.address as theater_address
    FROM bookings b
    JOIN booking_seats bs ON b.id = bs.booking_id
    JOIN showtimes st ON b.showtime_id = st.id
    JOIN movies m ON st.movie_id = m.id
    JOIN screens sc ON st.screen_id = sc.id
    JOIN theaters t ON sc.theater_id = t.id
    WHERE b.user_id = $1
    GROUP BY b.id, st.show_date, st.show_time, st.price, m.title, m.duration, m.poster_url,
             sc.screen_name, sc.screen_number, t.name, t.address
    ORDER BY b.booking_date DESC
    LIMIT $2 OFFSET $3
  `,
    [userId, limit, offset]
  );

  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    `
    SELECT b.*, 
           json_agg(
             json_build_object(
               'seat_number', bs.seat_number,
               'seat_price', bs.seat_price
             )
           ) as seats,
           st.show_date, st.show_time, st.price as showtime_price,
           m.title as movie_title, m.duration, m.poster_url,
           sc.screen_name, sc.screen_number,
           t.name as theater_name, t.address as theater_address,
           u.name as user_name, u.email as user_email
    FROM bookings b
    JOIN booking_seats bs ON b.id = bs.booking_id
    JOIN showtimes st ON b.showtime_id = st.id
    JOIN movies m ON st.movie_id = m.id
    JOIN screens sc ON st.screen_id = sc.id
    JOIN theaters t ON sc.theater_id = t.id
    JOIN users u ON b.user_id = u.id
    WHERE b.id = $1
    GROUP BY b.id, st.show_date, st.show_time, st.price, m.title, m.duration, m.poster_url,
             sc.screen_name, sc.screen_number, t.name, t.address, u.name, u.email
  `,
    [id]
  );

  return result.rows[0];
};

export const findByReference = async (reference) => {
  const result = await pool.query(
    `
    SELECT b.*, 
           json_agg(
             json_build_object(
               'seat_number', bs.seat_number,
               'seat_price', bs.seat_price
             )
           ) as seats,
           st.show_date, st.show_time, st.price as showtime_price,
           m.title as movie_title, m.duration, m.poster_url,
           sc.screen_name, sc.screen_number,
           t.name as theater_name, t.address as theater_address,
           u.name as user_name, u.email as user_email
    FROM bookings b
    JOIN booking_seats bs ON b.id = bs.booking_id
    JOIN showtimes st ON b.showtime_id = st.id
    JOIN movies m ON st.movie_id = m.id
    JOIN screens sc ON st.screen_id = sc.id
    JOIN theaters t ON sc.theater_id = t.id
    JOIN users u ON b.user_id = u.id
    WHERE b.booking_reference = $1
    GROUP BY b.id, st.show_date, st.show_time, st.price, m.title, m.duration, m.poster_url,
             sc.screen_name, sc.screen_number, t.name, t.address, u.name, u.email
  `,
    [reference]
  );

  return result.rows[0];
};

export const updateStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE bookings SET booking_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

export const cancel = async (id) => {
  return await updateStatus(id, "cancelled");
};
