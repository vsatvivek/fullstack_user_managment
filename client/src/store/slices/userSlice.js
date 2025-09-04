// client/src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all users
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to fetch users");
  }
});

// Create user
export const createUser = createAsyncThunk("users/create", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post("http://localhost:5000/api/users", userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to create user");
  }
});

// Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // create
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // update
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) {
          state.list[idx] = action.payload;
        }
      })
      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
