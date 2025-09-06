import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for booking operations
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to create booking" }
      );
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      const res = await axios.get(
        `http://localhost:5000/api/bookings/my-bookings?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch bookings" }
      );
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch booking" }
      );
    }
  }
);

export const fetchBookingByReference = createAsyncThunk(
  "bookings/fetchBookingByReference",
  async (reference, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/bookings/reference/${reference}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch booking" }
      );
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to cancel booking" }
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    currentBooking: null,
    selectedSeats: [],
    loading: false,
    error: null,
    success: null,
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
    clearSuccess: (state) => {
      state.success = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    addSelectedSeat: (state, action) => {
      const seat = action.payload;
      const existingIndex = state.selectedSeats.findIndex(
        (s) => s.seat_number === seat.seat_number
      );
      if (existingIndex === -1) {
        state.selectedSeats.push(seat);
      }
    },
    removeSelectedSeat: (state, action) => {
      const seatNumber = action.payload;
      state.selectedSeats = state.selectedSeats.filter(
        (s) => s.seat_number !== seatNumber
      );
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
        state.success = "Booking created successfully!";
        state.selectedSeats = [];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create booking";
      })

      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch bookings";
      })

      // Fetch booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch booking";
      })

      // Fetch booking by reference
      .addCase(fetchBookingByReference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingByReference.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
      })
      .addCase(fetchBookingByReference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch booking";
      })

      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload.message || "Booking cancelled successfully";
        // Update the booking in the list
        const index = state.bookings.findIndex(
          (b) => b.id === action.payload.booking.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload.booking;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to cancel booking";
      });
  },
});

export const {
  clearError,
  clearSuccess,
  clearCurrentBooking,
  setSelectedSeats,
  addSelectedSeat,
  removeSelectedSeat,
  clearSelectedSeats,
  setPagination,
} = bookingSlice.actions;

export default bookingSlice.reducer;
