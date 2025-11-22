// src/features/projects/projectApi.js
import axios from "axios";

const API_URL = "/api/projects";

export const fetchProjectsApi = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchProjectByIdApi = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProjectApi = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProjectApi = async ({ id, formData }) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProjectApi = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
