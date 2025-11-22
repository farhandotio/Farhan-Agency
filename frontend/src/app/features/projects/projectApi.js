import axios from "axios";

const API_URL = "https://farhan-agency-wryw.onrender.com/api/projects";

// GET /projects?search=&page=&limit=&sort=
export const fetchProjectsApi = async (params = {}) => {
  const response = await axios.get(API_URL, {
    params,
    withCredentials: true, // cookie send হবে
  });
  return response.data;
};

// GET /projects/:id
export const fetchProjectByIdApi = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// POST /projects
export const createProjectApi = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

// PATCH /projects/:id
export const updateProjectApi = async ({ id, formData }) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

// DELETE /projects/:id
export const deleteProjectApi = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
