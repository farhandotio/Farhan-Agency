import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

// -------------------- THUNKS -------------------- //

// Get Profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getProfile();
      return res.data?.user || null;
      
    } catch (err) {
      return rejectWithValue("Unauthorized");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      return res.data?.user || null;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await authApi.register(formData);
      return res.data?.user || null;
    } catch (err) {
      return rejectWithValue("Register failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

// Fetch All Users (Admin)
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getAllUsers();
      return res.data?.users || []; // expecting array
    } catch (err) {
      return rejectWithValue("Fetch users failed");
    }
  }
);

// Update Profile (with picture)
export const updateProfileUser = createAsyncThunk(
  "auth/updateProfileUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await authApi.updateProfile(formData);
      return res.data?.user || null;
    } catch (err) {
      return rejectWithValue("Update profile failed");
    }
  }
);

// -------------------- INITIAL STATE -------------------- //

const initialState = {
  user: null,            // always object or null
  loading: false,
  error: null,

  // admin users list
  users: [],             // array of user objects (admin)
  usersLoading: false,
  usersError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload || null; // ensure object/null
    },
    clearUser(state) {
      state.user = null;
    },
    // optional: clear users list (admin)
    clearUsers(state) {
      state.users = [];
      state.usersError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object or null
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || null;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // keep current state but set error if any
        state.error = action.payload || null;
      })

      // fetchAllUsers (admin)
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload; // array
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.users = [];
        state.usersError = action.payload || null;
      })

      // updateProfileUser
      .addCase(updateProfileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // updated user object
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const {
  clearAuthError,
  clearUser,
  setUser,
  clearUsers,
} = authSlice.actions;
export default authSlice.reducer;
