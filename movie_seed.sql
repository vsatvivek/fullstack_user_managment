-- Seed data for Movie Booking System
-- Insert sample theaters
INSERT INTO
    theaters (
        name,
        address,
        city,
        state,
        zip_code,
        phone,
        total_screens
    )
VALUES
    (
        'CineMax Downtown',
        '123 Main Street',
        'New York',
        'NY',
        '10001',
        '(555) 123-4567',
        5
    ),
    (
        'Movie Palace',
        '456 Broadway',
        'New York',
        'NY',
        '10013',
        '(555) 234-5678',
        8
    ),
    (
        'Cinema Central',
        '789 5th Avenue',
        'New York',
        'NY',
        '10022',
        '(555) 345-6789',
        6
    ),
    (
        'Film Forum',
        '321 West 42nd Street',
        'New York',
        'NY',
        '10036',
        '(555) 456-7890',
        4
    ),
    (
        'Theater One',
        '654 Park Avenue',
        'New York',
        'NY',
        '10065',
        '(555) 567-8901',
        7
    );

-- Insert sample movies
INSERT INTO
    movies (
        title,
        description,
        duration,
        genre,
        rating,
        release_date,
        poster_url,
        trailer_url
    )
VALUES
    (
        'The Dark Knight',
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        152,
        'Action',
        'PG-13',
        '2008-07-18',
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=EXeTwQWrcwY'
    ),
    (
        'Inception',
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        148,
        'Sci-Fi',
        'PG-13',
        '2010-07-16',
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=YoHD9XEInc0'
    ),
    (
        'Pulp Fiction',
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        154,
        'Crime',
        'R',
        '1994-10-14',
        'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItZzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=s7EdQ4FqbhY'
    ),
    (
        'The Shawshank Redemption',
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        142,
        'Drama',
        'R',
        '1994-09-23',
        'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=6hB3S9bIaco'
    ),
    (
        'Forrest Gump',
        'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
        142,
        'Drama',
        'PG-13',
        '1994-07-06',
        'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=bLvqoHBptjg'
    ),
    (
        'The Matrix',
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        136,
        'Sci-Fi',
        'R',
        '1999-03-31',
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=m8e-FF8MsqU'
    ),
    (
        'Goodfellas',
        'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
        146,
        'Crime',
        'R',
        '1990-09-19',
        'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtNTNjYy00NzU0LWE4NTktYjRjMTQ1M2UwMjkxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=qo5jJ5XcwHE'
    ),
    (
        'The Godfather',
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        175,
        'Crime',
        'R',
        '1972-03-24',
        'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=sY1S34973zA'
    ),
    (
        'Avatar',
        'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        162,
        'Sci-Fi',
        'PG-13',
        '2009-12-18',
        'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=5PSNL1qE6VY'
    ),
    (
        'Titanic',
        'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
        194,
        'Romance',
        'PG-13',
        '1997-12-19',
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
        'https://www.youtube.com/watch?v=2e-eXJ6HgkQ'
    );

-- Insert screens for CineMax Downtown (theater_id = 1)
INSERT INTO
    screens (
        theater_id,
        screen_number,
        screen_name,
        total_seats,
        seat_layout
    )
VALUES
    (
        1,
        1,
        'Screen 1',
        100,
        '{"rows": [{"row": "A", "seats": [{"seat_number": "A1"}, {"seat_number": "A2"}, {"seat_number": "A3"}, {"seat_number": "A4"}, {"seat_number": "A5"}, {"seat_number": "A6"}, {"seat_number": "A7"}, {"seat_number": "A8"}, {"seat_number": "A9"}, {"seat_number": "A10"}]}, {"row": "B", "seats": [{"seat_number": "B1"}, {"seat_number": "B2"}, {"seat_number": "B3"}, {"seat_number": "B4"}, {"seat_number": "B5"}, {"seat_number": "B6"}, {"seat_number": "B7"}, {"seat_number": "B8"}, {"seat_number": "B9"}, {"seat_number": "B10"}]}, {"row": "C", "seats": [{"seat_number": "C1"}, {"seat_number": "C2"}, {"seat_number": "C3"}, {"seat_number": "C4"}, {"seat_number": "C5"}, {"seat_number": "C6"}, {"seat_number": "C7"}, {"seat_number": "C8"}, {"seat_number": "C9"}, {"seat_number": "C10"}]}, {"row": "D", "seats": [{"seat_number": "D1"}, {"seat_number": "D2"}, {"seat_number": "D3"}, {"seat_number": "D4"}, {"seat_number": "D5"}, {"seat_number": "D6"}, {"seat_number": "D7"}, {"seat_number": "D8"}, {"seat_number": "D9"}, {"seat_number": "D10"}]}, {"row": "E", "seats": [{"seat_number": "E1"}, {"seat_number": "E2"}, {"seat_number": "E3"}, {"seat_number": "E4"}, {"seat_number": "E5"}, {"seat_number": "E6"}, {"seat_number": "E7"}, {"seat_number": "E8"}, {"seat_number": "E9"}, {"seat_number": "E10"}]}, {"row": "F", "seats": [{"seat_number": "F1"}, {"seat_number": "F2"}, {"seat_number": "F3"}, {"seat_number": "F4"}, {"seat_number": "F5"}, {"seat_number": "F6"}, {"seat_number": "F7"}, {"seat_number": "F8"}, {"seat_number": "F9"}, {"seat_number": "F10"}]}, {"row": "G", "seats": [{"seat_number": "G1"}, {"seat_number": "G2"}, {"seat_number": "G3"}, {"seat_number": "G4"}, {"seat_number": "G5"}, {"seat_number": "G6"}, {"seat_number": "G7"}, {"seat_number": "G8"}, {"seat_number": "G9"}, {"seat_number": "G10"}]}, {"row": "H", "seats": [{"seat_number": "H1"}, {"seat_number": "H2"}, {"seat_number": "H3"}, {"seat_number": "H4"}, {"seat_number": "H5"}, {"seat_number": "H6"}, {"seat_number": "H7"}, {"seat_number": "H8"}, {"seat_number": "H9"}, {"seat_number": "H10"}]}, {"row": "I", "seats": [{"seat_number": "I1"}, {"seat_number": "I2"}, {"seat_number": "I3"}, {"seat_number": "I4"}, {"seat_number": "I5"}, {"seat_number": "I6"}, {"seat_number": "I7"}, {"seat_number": "I8"}, {"seat_number": "I9"}, {"seat_number": "I10"}]}, {"row": "J", "seats": [{"seat_number": "J1"}, {"seat_number": "J2"}, {"seat_number": "J3"}, {"seat_number": "J4"}, {"seat_number": "J5"}, {"seat_number": "J6"}, {"seat_number": "J7"}, {"seat_number": "J8"}, {"seat_number": "J9"}, {"seat_number": "J10"}]}]}'
    ),
    (
        1,
        2,
        'Screen 2',
        80,
        '{"rows": [{"row": "A", "seats": [{"seat_number": "A1"}, {"seat_number": "A2"}, {"seat_number": "A3"}, {"seat_number": "A4"}, {"seat_number": "A5"}, {"seat_number": "A6"}, {"seat_number": "A7"}, {"seat_number": "A8"}]}, {"row": "B", "seats": [{"seat_number": "B1"}, {"seat_number": "B2"}, {"seat_number": "B3"}, {"seat_number": "B4"}, {"seat_number": "B5"}, {"seat_number": "B6"}, {"seat_number": "B7"}, {"seat_number": "B8"}]}, {"row": "C", "seats": [{"seat_number": "C1"}, {"seat_number": "C2"}, {"seat_number": "C3"}, {"seat_number": "C4"}, {"seat_number": "C5"}, {"seat_number": "C6"}, {"seat_number": "C7"}, {"seat_number": "C8"}]}, {"row": "D", "seats": [{"seat_number": "D1"}, {"seat_number": "D2"}, {"seat_number": "D3"}, {"seat_number": "D4"}, {"seat_number": "D5"}, {"seat_number": "D6"}, {"seat_number": "D7"}, {"seat_number": "D8"}]}, {"row": "E", "seats": [{"seat_number": "E1"}, {"seat_number": "E2"}, {"seat_number": "E3"}, {"seat_number": "E4"}, {"seat_number": "E5"}, {"seat_number": "E6"}, {"seat_number": "E7"}, {"seat_number": "E8"}]}, {"row": "F", "seats": [{"seat_number": "F1"}, {"seat_number": "F2"}, {"seat_number": "F3"}, {"seat_number": "F4"}, {"seat_number": "F5"}, {"seat_number": "F6"}, {"seat_number": "F7"}, {"seat_number": "F8"}]}, {"row": "G", "seats": [{"seat_number": "G1"}, {"seat_number": "G2"}, {"seat_number": "G3"}, {"seat_number": "G4"}, {"seat_number": "G5"}, {"seat_number": "G6"}, {"seat_number": "G7"}, {"seat_number": "G8"}]}, {"row": "H", "seats": [{"seat_number": "H1"}, {"seat_number": "H2"}, {"seat_number": "H3"}, {"seat_number": "H4"}, {"seat_number": "H5"}, {"seat_number": "H6"}, {"seat_number": "H7"}, {"seat_number": "H8"}]}, {"row": "I", "seats": [{"seat_number": "I1"}, {"seat_number": "I2"}, {"seat_number": "I3"}, {"seat_number": "I4"}, {"seat_number": "I5"}, {"seat_number": "I6"}, {"seat_number": "I7"}, {"seat_number": "I8"}]}, {"row": "J", "seats": [{"seat_number": "J1"}, {"seat_number": "J2"}, {"seat_number": "J3"}, {"seat_number": "J4"}, {"seat_number": "J5"}, {"seat_number": "J6"}, {"seat_number": "J7"}, {"seat_number": "J8"}]}]}'
    ),
    (
        1,
        3,
        'Screen 3',
        120,
        '{"rows": [{"row": "A", "seats": [{"seat_number": "A1"}, {"seat_number": "A2"}, {"seat_number": "A3"}, {"seat_number": "A4"}, {"seat_number": "A5"}, {"seat_number": "A6"}, {"seat_number": "A7"}, {"seat_number": "A8"}, {"seat_number": "A9"}, {"seat_number": "A10"}, {"seat_number": "A11"}, {"seat_number": "A12"}]}, {"row": "B", "seats": [{"seat_number": "B1"}, {"seat_number": "B2"}, {"seat_number": "B3"}, {"seat_number": "B4"}, {"seat_number": "B5"}, {"seat_number": "B6"}, {"seat_number": "B7"}, {"seat_number": "B8"}, {"seat_number": "B9"}, {"seat_number": "B10"}, {"seat_number": "B11"}, {"seat_number": "B12"}]}, {"row": "C", "seats": [{"seat_number": "C1"}, {"seat_number": "C2"}, {"seat_number": "C3"}, {"seat_number": "C4"}, {"seat_number": "C5"}, {"seat_number": "C6"}, {"seat_number": "C7"}, {"seat_number": "C8"}, {"seat_number": "C9"}, {"seat_number": "C10"}, {"seat_number": "C11"}, {"seat_number": "C12"}]}, {"row": "D", "seats": [{"seat_number": "D1"}, {"seat_number": "D2"}, {"seat_number": "D3"}, {"seat_number": "D4"}, {"seat_number": "D5"}, {"seat_number": "D6"}, {"seat_number": "D7"}, {"seat_number": "D8"}, {"seat_number": "D9"}, {"seat_number": "D10"}, {"seat_number": "D11"}, {"seat_number": "D12"}]}, {"row": "E", "seats": [{"seat_number": "E1"}, {"seat_number": "E2"}, {"seat_number": "E3"}, {"seat_number": "E4"}, {"seat_number": "E5"}, {"seat_number": "E6"}, {"seat_number": "E7"}, {"seat_number": "E8"}, {"seat_number": "E9"}, {"seat_number": "E10"}, {"seat_number": "E11"}, {"seat_number": "E12"}]}, {"row": "F", "seats": [{"seat_number": "F1"}, {"seat_number": "F2"}, {"seat_number": "F3"}, {"seat_number": "F4"}, {"seat_number": "F5"}, {"seat_number": "F6"}, {"seat_number": "F7"}, {"seat_number": "F8"}, {"seat_number": "F9"}, {"seat_number": "F10"}, {"seat_number": "F11"}, {"seat_number": "F12"}]}, {"row": "G", "seats": [{"seat_number": "G1"}, {"seat_number": "G2"}, {"seat_number": "G3"}, {"seat_number": "G4"}, {"seat_number": "G5"}, {"seat_number": "G6"}, {"seat_number": "G7"}, {"seat_number": "G8"}, {"seat_number": "G9"}, {"seat_number": "G10"}, {"seat_number": "G11"}, {"seat_number": "G12"}]}, {"row": "H", "seats": [{"seat_number": "H1"}, {"seat_number": "H2"}, {"seat_number": "H3"}, {"seat_number": "H4"}, {"seat_number": "H5"}, {"seat_number": "H6"}, {"seat_number": "H7"}, {"seat_number": "H8"}, {"seat_number": "H9"}, {"seat_number": "H10"}, {"seat_number": "H11"}, {"seat_number": "H12"}]}, {"row": "I", "seats": [{"seat_number": "I1"}, {"seat_number": "I2"}, {"seat_number": "I3"}, {"seat_number": "I4"}, {"seat_number": "I5"}, {"seat_number": "I6"}, {"seat_number": "I7"}, {"seat_number": "I8"}, {"seat_number": "I9"}, {"seat_number": "I10"}, {"seat_number": "I11"}, {"seat_number": "I12"}]}, {"row": "J", "seats": [{"seat_number": "J1"}, {"seat_number": "J2"}, {"seat_number": "J3"}, {"seat_number": "J4"}, {"seat_number": "J5"}, {"seat_number": "J6"}, {"seat_number": "J7"}, {"seat_number": "J8"}, {"seat_number": "J9"}, {"seat_number": "J10"}, {"seat_number": "J11"}, {"seat_number": "J12"}]}]}'
    ),
    (
        1,
        4,
        'Screen 4',
        90,
        '{"rows": [{"row": "A", "seats": [{"seat_number": "A1"}, {"seat_number": "A2"}, {"seat_number": "A3"}, {"seat_number": "A4"}, {"seat_number": "A5"}, {"seat_number": "A6"}, {"seat_number": "A7"}, {"seat_number": "A8"}, {"seat_number": "A9"}]}, {"row": "B", "seats": [{"seat_number": "B1"}, {"seat_number": "B2"}, {"seat_number": "B3"}, {"seat_number": "B4"}, {"seat_number": "B5"}, {"seat_number": "B6"}, {"seat_number": "B7"}, {"seat_number": "B8"}, {"seat_number": "B9"}]}, {"row": "C", "seats": [{"seat_number": "C1"}, {"seat_number": "C2"}, {"seat_number": "C3"}, {"seat_number": "C4"}, {"seat_number": "C5"}, {"seat_number": "C6"}, {"seat_number": "C7"}, {"seat_number": "C8"}, {"seat_number": "C9"}]}, {"row": "D", "seats": [{"seat_number": "D1"}, {"seat_number": "D2"}, {"seat_number": "D3"}, {"seat_number": "D4"}, {"seat_number": "D5"}, {"seat_number": "D6"}, {"seat_number": "D7"}, {"seat_number": "D8"}, {"seat_number": "D9"}]}, {"row": "E", "seats": [{"seat_number": "E1"}, {"seat_number": "E2"}, {"seat_number": "E3"}, {"seat_number": "E4"}, {"seat_number": "E5"}, {"seat_number": "E6"}, {"seat_number": "E7"}, {"seat_number": "E8"}, {"seat_number": "E9"}]}, {"row": "F", "seats": [{"seat_number": "F1"}, {"seat_number": "F2"}, {"seat_number": "F3"}, {"seat_number": "F4"}, {"seat_number": "F5"}, {"seat_number": "F6"}, {"seat_number": "F7"}, {"seat_number": "F8"}, {"seat_number": "F9"}]}, {"row": "G", "seats": [{"seat_number": "G1"}, {"seat_number": "G2"}, {"seat_number": "G3"}, {"seat_number": "G4"}, {"seat_number": "G5"}, {"seat_number": "G6"}, {"seat_number": "G7"}, {"seat_number": "G8"}, {"seat_number": "G9"}]}, {"row": "H", "seats": [{"seat_number": "H1"}, {"seat_number": "H2"}, {"seat_number": "H3"}, {"seat_number": "H4"}, {"seat_number": "H5"}, {"seat_number": "H6"}, {"seat_number": "H7"}, {"seat_number": "H8"}, {"seat_number": "H9"}]}, {"row": "I", "seats": [{"seat_number": "I1"}, {"seat_number": "I2"}, {"seat_number": "I3"}, {"seat_number": "I4"}, {"seat_number": "I5"}, {"seat_number": "I6"}, {"seat_number": "I7"}, {"seat_number": "I8"}, {"seat_number": "I9"}]}, {"row": "J", "seats": [{"seat_number": "J1"}, {"seat_number": "J2"}, {"seat_number": "J3"}, {"seat_number": "J4"}, {"seat_number": "J5"}, {"seat_number": "J6"}, {"seat_number": "J7"}, {"seat_number": "J8"}, {"seat_number": "J9"}]}]}'
    ),
    (
        1,
        5,
        'Screen 5',
        110,
        '{"rows": [{"row": "A", "seats": [{"seat_number": "A1"}, {"seat_number": "A2"}, {"seat_number": "A3"}, {"seat_number": "A4"}, {"seat_number": "A5"}, {"seat_number": "A6"}, {"seat_number": "A7"}, {"seat_number": "A8"}, {"seat_number": "A9"}, {"seat_number": "A10"}, {"seat_number": "A11"}]}, {"row": "B", "seats": [{"seat_number": "B1"}, {"seat_number": "B2"}, {"seat_number": "B3"}, {"seat_number": "B4"}, {"seat_number": "B5"}, {"seat_number": "B6"}, {"seat_number": "B7"}, {"seat_number": "B8"}, {"seat_number": "B9"}, {"seat_number": "B10"}, {"seat_number": "B11"}]}, {"row": "C", "seats": [{"seat_number": "C1"}, {"seat_number": "C2"}, {"seat_number": "C3"}, {"seat_number": "C4"}, {"seat_number": "C5"}, {"seat_number": "C6"}, {"seat_number": "C7"}, {"seat_number": "C8"}, {"seat_number": "C9"}, {"seat_number": "C10"}, {"seat_number": "C11"}]}, {"row": "D", "seats": [{"seat_number": "D1"}, {"seat_number": "D2"}, {"seat_number": "D3"}, {"seat_number": "D4"}, {"seat_number": "D5"}, {"seat_number": "D6"}, {"seat_number": "D7"}, {"seat_number": "D8"}, {"seat_number": "D9"}, {"seat_number": "D10"}, {"seat_number": "D11"}]}, {"row": "E", "seats": [{"seat_number": "E1"}, {"seat_number": "E2"}, {"seat_number": "E3"}, {"seat_number": "E4"}, {"seat_number": "E5"}, {"seat_number": "E6"}, {"seat_number": "E7"}, {"seat_number": "E8"}, {"seat_number": "E9"}, {"seat_number": "E10"}, {"seat_number": "E11"}]}, {"row": "F", "seats": [{"seat_number": "F1"}, {"seat_number": "F2"}, {"seat_number": "F3"}, {"seat_number": "F4"}, {"seat_number": "F5"}, {"seat_number": "F6"}, {"seat_number": "F7"}, {"seat_number": "F8"}, {"seat_number": "F9"}, {"seat_number": "F10"}, {"seat_number": "F11"}]}, {"row": "G", "seats": [{"seat_number": "G1"}, {"seat_number": "G2"}, {"seat_number": "G3"}, {"seat_number": "G4"}, {"seat_number": "G5"}, {"seat_number": "G6"}, {"seat_number": "G7"}, {"seat_number": "G8"}, {"seat_number": "G9"}, {"seat_number": "G10"}, {"seat_number": "G11"}]}, {"row": "H", "seats": [{"seat_number": "H1"}, {"seat_number": "H2"}, {"seat_number": "H3"}, {"seat_number": "H4"}, {"seat_number": "H5"}, {"seat_number": "H6"}, {"seat_number": "H7"}, {"seat_number": "H8"}, {"seat_number": "H9"}, {"seat_number": "H10"}, {"seat_number": "H11"}]}, {"row": "I", "seats": [{"seat_number": "I1"}, {"seat_number": "I2"}, {"seat_number": "I3"}, {"seat_number": "I4"}, {"seat_number": "I5"}, {"seat_number": "I6"}, {"seat_number": "I7"}, {"seat_number": "I8"}, {"seat_number": "I9"}, {"seat_number": "I10"}, {"seat_number": "I11"}]}, {"row": "J", "seats": [{"seat_number": "J1"}, {"seat_number": "J2"}, {"seat_number": "J3"}, {"seat_number": "J4"}, {"seat_number": "J5"}, {"seat_number": "J6"}, {"seat_number": "J7"}, {"seat_number": "J8"}, {"seat_number": "J9"}, {"seat_number": "J10"}, {"seat_number": "J11"}]}]}'
    );

-- Insert sample showtimes for the next 7 days
INSERT INTO
    showtimes (movie_id, screen_id, show_date, show_time, price)
VALUES
    -- The Dark Knight showtimes
    (1, 1, CURRENT_DATE, '10:00', 12.50),
    (1, 1, CURRENT_DATE, '13:30', 12.50),
    (1, 1, CURRENT_DATE, '17:00', 15.00),
    (1, 1, CURRENT_DATE, '20:30', 15.00),
    (
        1,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '11:00',
        12.50
    ),
    (
        1,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '14:30',
        12.50
    ),
    (
        1,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '18:00',
        15.00
    ),
    (
        1,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '21:30',
        15.00
    ),
    -- Inception showtimes
    (2, 3, CURRENT_DATE, '10:30', 13.00),
    (2, 3, CURRENT_DATE, '14:00', 13.00),
    (2, 3, CURRENT_DATE, '17:30', 16.00),
    (2, 3, CURRENT_DATE, '21:00', 16.00),
    (
        2,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '11:30',
        13.00
    ),
    (
        2,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '15:00',
        13.00
    ),
    (
        2,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '18:30',
        16.00
    ),
    (
        2,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '22:00',
        16.00
    ),
    -- Pulp Fiction showtimes
    (3, 5, CURRENT_DATE, '12:00', 11.00),
    (3, 5, CURRENT_DATE, '15:30', 11.00),
    (3, 5, CURRENT_DATE, '19:00', 14.00),
    (3, 5, CURRENT_DATE, '22:30', 14.00),
    (
        3,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '12:30',
        11.00
    ),
    (
        3,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '16:00',
        11.00
    ),
    (
        3,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '19:30',
        14.00
    ),
    (
        3,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '23:00',
        14.00
    ),
    -- The Shawshank Redemption showtimes
    (4, 2, CURRENT_DATE, '09:30', 10.50),
    (4, 2, CURRENT_DATE, '13:00', 10.50),
    (4, 2, CURRENT_DATE, '16:30', 13.50),
    (4, 2, CURRENT_DATE, '20:00', 13.50),
    (
        4,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '10:00',
        10.50
    ),
    (
        4,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '13:30',
        10.50
    ),
    (
        4,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '17:00',
        13.50
    ),
    (
        4,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '20:30',
        13.50
    ),
    -- Forrest Gump showtimes
    (5, 4, CURRENT_DATE, '11:00', 11.50),
    (5, 4, CURRENT_DATE, '14:30', 11.50),
    (5, 4, CURRENT_DATE, '18:00', 14.50),
    (5, 4, CURRENT_DATE, '21:30', 14.50),
    (
        5,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '11:30',
        11.50
    ),
    (
        5,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '15:00',
        11.50
    ),
    (
        5,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '18:30',
        14.50
    ),
    (
        5,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '22:00',
        14.50
    ),
    -- The Matrix showtimes
    (6, 5, CURRENT_DATE, '10:00', 12.00),
    (6, 5, CURRENT_DATE, '13:30', 12.00),
    (6, 5, CURRENT_DATE, '17:00', 15.00),
    (6, 5, CURRENT_DATE, '20:30', 15.00),
    (
        6,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '10:30',
        12.00
    ),
    (
        6,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '14:00',
        12.00
    ),
    (
        6,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '17:30',
        15.00
    ),
    (
        6,
        1,
        CURRENT_DATE + INTERVAL '1 day',
        '21:00',
        15.00
    ),
    -- Goodfellas showtimes
    (7, 2, CURRENT_DATE, '12:30', 11.50),
    (7, 2, CURRENT_DATE, '16:00', 11.50),
    (7, 2, CURRENT_DATE, '19:30', 14.50),
    (7, 2, CURRENT_DATE, '23:00', 14.50),
    (
        7,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '13:00',
        11.50
    ),
    (
        7,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '16:30',
        11.50
    ),
    (
        7,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '20:00',
        14.50
    ),
    (
        7,
        4,
        CURRENT_DATE + INTERVAL '1 day',
        '23:30',
        14.50
    ),
    -- The Godfather showtimes
    (8, 3, CURRENT_DATE, '09:00', 12.00),
    (8, 3, CURRENT_DATE, '12:30', 12.00),
    (8, 3, CURRENT_DATE, '16:00', 15.00),
    (8, 3, CURRENT_DATE, '19:30', 15.00),
    (
        8,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '09:30',
        12.00
    ),
    (
        8,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '13:00',
        12.00
    ),
    (
        8,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '16:30',
        15.00
    ),
    (
        8,
        5,
        CURRENT_DATE + INTERVAL '1 day',
        '20:00',
        15.00
    ),
    -- Avatar showtimes
    (9, 4, CURRENT_DATE, '10:30', 13.50),
    (9, 4, CURRENT_DATE, '14:00', 13.50),
    (9, 4, CURRENT_DATE, '17:30', 16.50),
    (9, 4, CURRENT_DATE, '21:00', 16.50),
    (
        9,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '11:00',
        13.50
    ),
    (
        9,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '14:30',
        13.50
    ),
    (
        9,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '18:00',
        16.50
    ),
    (
        9,
        2,
        CURRENT_DATE + INTERVAL '1 day',
        '21:30',
        16.50
    ),
    -- Titanic showtimes
    (10, 5, CURRENT_DATE, '11:30', 12.50),
    (10, 5, CURRENT_DATE, '15:00', 12.50),
    (10, 5, CURRENT_DATE, '18:30', 15.50),
    (10, 5, CURRENT_DATE, '22:00', 15.50),
    (
        10,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '12:00',
        12.50
    ),
    (
        10,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '15:30',
        12.50
    ),
    (
        10,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '19:00',
        15.50
    ),
    (
        10,
        3,
        CURRENT_DATE + INTERVAL '1 day',
        '22:30',
        15.50
    );