import axios from "axios";

const API_BASE = "https://farhan-agency.onrender.com/api/orders";

// Fetch all orders for logged-in user
export const fetchOrders = () => {
  return axios.get(`${API_BASE}/my-orders`, { withCredentials: true });
};

// Create a new order
export const createOrder = (orderData) => {
  return axios.post(`${API_BASE}/create`, orderData, { withCredentials: true });
};

// Delete a user's order
export const deleteOrder = (orderId) => {
  return axios.delete(`${API_BASE}/${orderId}`, { withCredentials: true });
};
