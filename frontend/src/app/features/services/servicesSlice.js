// src/features/services/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchServicesApi,
  fetchServiceBySlugApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
} from "./serviceApi";

// ------------------ Async Thunks ------------------ //
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchServicesApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchServiceBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await fetchServiceBySlugApi(slug);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createServiceApi(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateServiceApi({ id, payload });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteServiceApi(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ------------------ Slice ------------------ //
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    total: 0,
    page: 1,
    limit: 20,
    selectedService: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedService(state) {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.total = action.payload.meta.total;
        state.page = action.payload.meta.page;
        state.limit = action.payload.meta.limit;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by slug
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.unshift(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((s) => s._id !== action.payload.id);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;
