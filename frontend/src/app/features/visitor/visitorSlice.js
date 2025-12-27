import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as visitorApi from './visitorApi'; 

// -------------------- THUNKS -------------------- //

// 1. Track Visitor (Frontend theke data pathano)
export const trackVisitorAction = createAsyncThunk(
  'visitor/trackVisitor',
  async (visitorData, { rejectWithValue }) => {
    try {
      const res = await visitorApi.trackVisitorApi(visitorData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Tracking failed');
    }
  }
);

// 2. Fetch Visitor Stats (Admin dashboard-er jonno)
export const fetchVisitorStats = createAsyncThunk(
  'visitor/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await visitorApi.getVisitorStatsApi();
      return res.data; // expecting array of visitors or stats
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch stats failed');
    }
  }
);

// -------------------- INITIAL STATE -------------------- //

const initialState = {
  stats: [], // All visitor data for admin
  loading: false, // For tracking request
  statsLoading: false, // For fetching all stats
  error: null,
  statsError: null,
};

const visitorSlice = createSlice({
  name: 'visitor',
  initialState,

  reducers: {
    clearVisitorError(state) {
      state.error = null;
      state.statsError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // trackVisitorAction
      .addCase(trackVisitorAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(trackVisitorAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(trackVisitorAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchVisitorStats (Admin Only)
      .addCase(fetchVisitorStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchVisitorStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchVisitorStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload;
      });
  },
});

export const { clearVisitorError } = visitorSlice.actions;
export default visitorSlice.reducer;
