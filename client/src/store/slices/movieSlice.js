import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for movie operations
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.genre) queryParams.append("genre", params.genre);
      if (params.search) queryParams.append("search", params.search);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      const res = await axios.get(
        `http://localhost:5000/api/movies?${queryParams}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch movies" }
      );
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch movie" }
      );
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies/genres");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch genres" }
      );
    }
  }
);

export const fetchShowtimes = createAsyncThunk(
  "movies/fetchShowtimes",
  async ({ movieId, date }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (date) queryParams.append("date", date);

      const res = await axios.get(
        `http://localhost:5000/api/showtimes/movie/${movieId}?${queryParams}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch showtimes" }
      );
    }
  }
);

export const fetchShowtimeById = createAsyncThunk(
  "movies/fetchShowtimeById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/showtimes/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch showtime" }
      );
    }
  }
);

export const fetchAvailableSeats = createAsyncThunk(
  "movies/fetchAvailableSeats",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/showtimes/${showtimeId}/seats`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch available seats" }
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentMovie: null,
    genres: [],
    showtimes: [],
    currentShowtime: null,
    availableSeats: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearShowtimes: (state) => {
      state.showtimes = [];
    },
    clearCurrentShowtime: (state) => {
      state.currentShowtime = null;
    },
    clearAvailableSeats: (state) => {
      state.availableSeats = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch movies";
      })

      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload.movie;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch movie";
      })

      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload.genres;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch genres";
      })

      // Fetch showtimes
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload.showtimes;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch showtimes";
      })

      // Fetch showtime by ID
      .addCase(fetchShowtimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShowtime = action.payload.showtime;
      })
      .addCase(fetchShowtimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch showtime";
      })

      // Fetch available seats
      .addCase(fetchAvailableSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSeats = action.payload;
      })
      .addCase(fetchAvailableSeats.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch available seats";
      });
  },
});

export const {
  clearError,
  clearCurrentMovie,
  clearShowtimes,
  clearCurrentShowtime,
  clearAvailableSeats,
  setFilters,
} = movieSlice.actions;

export default movieSlice.reducer;
