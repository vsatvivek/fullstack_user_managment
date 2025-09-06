// client/src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    bookings: bookingReducer,
  },
});
