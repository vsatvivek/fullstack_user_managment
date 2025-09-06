# Movie Booking System

A full-stack movie booking application built with React, Node.js, Express, and PostgreSQL. This application allows users to browse movies, view showtimes, select seats, and manage their bookings.

## Features

### User Features

- **Movie Browsing**: Browse available movies with filtering by genre and search functionality
- **Movie Details**: View detailed information about movies including description, duration, rating, and trailer
- **Showtime Selection**: See available showtimes for movies across different theaters
- **Seat Selection**: Interactive seat selection with real-time availability
- **Booking Management**: Create, view, and cancel movie bookings
- **User Authentication**: Secure login/register system with email verification

### Admin Features

- **User Management**: View and manage user accounts
- **Movie Management**: Add, edit, and manage movies (CRUD operations)
- **Theater Management**: Manage theaters and screens
- **Showtime Management**: Create and manage movie showtimes
- **Booking Analytics**: View booking statistics and reports

## Technology Stack

### Frontend

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Yup** - Form validation

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Express Validator** - Input validation

## Database Schema

The application uses the following main tables:

- **users** - User accounts and authentication
- **movies** - Movie information and metadata
- **theaters** - Theater locations and details
- **screens** - Individual screens within theaters
- **showtimes** - Movie showtimes and scheduling
- **bookings** - User booking records
- **booking_seats** - Seat assignments for bookings

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with:

```
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

5. Create the database:

```sql
CREATE DATABASE fullstack_db;
```

6. Run the database schema:

```bash
psql -d fullstack_db -f ../database.sql
```

7. Seed the database with sample data:

```bash
psql -d fullstack_db -f ../movie_seed.sql
```

8. Start the server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot` - Forgot password
- `POST /api/auth/reset` - Reset password
- `POST /api/auth/set-password` - Set initial password

### Movies

- `GET /api/movies` - Get all movies (with filtering)
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/genres` - Get all genres
- `POST /api/movies` - Create movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### Theaters

- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/:id` - Get theater by ID
- `POST /api/theaters` - Create theater (admin)
- `PUT /api/theaters/:id` - Update theater (admin)
- `DELETE /api/theaters/:id` - Delete theater (admin)

### Showtimes

- `GET /api/showtimes/movie/:movieId` - Get showtimes for a movie
- `GET /api/showtimes/:id` - Get showtime by ID
- `GET /api/showtimes/:id/seats` - Get available seats for showtime
- `POST /api/showtimes` - Create showtime (admin)
- `PUT /api/showtimes/:id` - Update showtime (admin)
- `DELETE /api/showtimes/:id` - Delete showtime (admin)

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/reference/:reference` - Get booking by reference
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (admin)

### Users

- `GET /api/users` - Get all users (admin)
- `POST /api/users` - Create user (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)
- `GET /api/users/stats` - Get user statistics (admin)
- `GET /api/users/export` - Export users (admin)

## Usage

### For Regular Users

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Movies**: Visit the Movies page to see available films
3. **View Details**: Click on a movie to see details and available showtimes
4. **Select Showtime**: Choose a date and time for your movie
5. **Select Seats**: Pick your preferred seats from the interactive seat map
6. **Confirm Booking**: Review your selection and confirm the booking
7. **Manage Bookings**: View and cancel bookings from the My Bookings page

### For Admins

1. **User Management**: Access the Users page to manage user accounts
2. **Movie Management**: Add, edit, or remove movies from the system
3. **Theater Management**: Manage theater locations and screens
4. **Showtime Management**: Create and manage movie showtimes
5. **Analytics**: View user statistics and booking reports

## Project Structure

```
fullstack_user_managment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── layout/        # Layout components
│   │   └── styles/        # CSS and styling
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middlewares
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── package.json
├── database.sql           # Database schema
├── movie_seed.sql         # Sample data
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
