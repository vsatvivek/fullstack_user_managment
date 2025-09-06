-- Create DB (run as a superuser)
-- CREATE DATABASE fullstack_db;
-- Then connect to the database and run the following schema:
CREATE TABLE
  IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120),
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

ALTER TABLE users
ALTER COLUMN password
DROP NOT NULL;

ALTER TABLE users
ADD COLUMN status VARCHAR(20) DEFAULT 'pending';

-- Movie Booking System Tables
-- Movies table
CREATE TABLE
  IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- in minutes
    genre VARCHAR(100),
    rating VARCHAR(10), -- PG, PG-13, R, etc.
    release_date DATE,
    poster_url VARCHAR(500),
    trailer_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Theaters table
CREATE TABLE
  IF NOT EXISTS theaters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20),
    phone VARCHAR(20),
    total_screens INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Screens table (individual screens within theaters)
CREATE TABLE
  IF NOT EXISTS screens (
    id SERIAL PRIMARY KEY,
    theater_id INTEGER REFERENCES theaters (id) ON DELETE CASCADE,
    screen_number INTEGER NOT NULL,
    screen_name VARCHAR(100),
    total_seats INTEGER NOT NULL,
    seat_layout JSONB, -- Store seat arrangement as JSON
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Showtimes table
CREATE TABLE
  IF NOT EXISTS showtimes (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies (id) ON DELETE CASCADE,
    screen_id INTEGER REFERENCES screens (id) ON DELETE CASCADE,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Bookings table
CREATE TABLE
  IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    showtime_id INTEGER REFERENCES showtimes (id) ON DELETE CASCADE,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    booking_status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, cancelled, completed
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Booking seats table (many-to-many relationship between bookings and seats)
CREATE TABLE
  IF NOT EXISTS booking_seats (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings (id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL, -- e.g., "A1", "B5", etc.
    seat_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies (title);

CREATE INDEX IF NOT EXISTS idx_movies_genre ON movies (genre);

CREATE INDEX IF NOT EXISTS idx_movies_release_date ON movies (release_date);

CREATE INDEX IF NOT EXISTS idx_showtimes_movie_date ON showtimes (movie_id, show_date);

CREATE INDEX IF NOT EXISTS idx_showtimes_screen_time ON showtimes (screen_id, show_time);

CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings (user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_showtime ON bookings (showtime_id);

CREATE INDEX IF NOT EXISTS idx_booking_seats_booking ON booking_seats (booking_id);