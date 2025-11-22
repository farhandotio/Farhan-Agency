// src/features/services/serviceApi.js
import axios from "axios";

const API_URL = "/api/services";

// GET /services?search=&page=&limit=&featured=
export const fetchServicesApi = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

// GET /services/:slug
export const fetchServiceBySlugApi = async (slug) => {
  const response = await axios.get(`${API_URL}/${slug}`);
  return response.data.data;
};

// POST /services
export const createServiceApi = async (payload) => {
  const response = await axios.post(API_URL, payload);
  return response.data.data;
};

// PATCH /services/:id
export const updateServiceApi = async ({ id, payload }) => {
  const response = await axios.patch(`${API_URL}/${id}`, payload);
  return response.data.data;
};

// DELETE /services/:id
export const deleteServiceApi = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return { id, message: response.data.message };
};
