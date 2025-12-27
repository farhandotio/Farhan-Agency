import axios from 'axios';

const API_BASE = 'https://farhan-agency-eg4k.onrender.com/api/orders';

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// -------------------- ORDER APIs -------------------- //

// Create Order (User Only — supports files)
export const createOrder = (orderData) =>
  instance.post('/create', orderData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Get All Orders (Admin Only)
export const getAllOrders = () => instance.get('/all');

// Get Logged-in User’s Orders
export const getMyOrders = () => instance.get('/my-orders');

// Delete User’s Own Order
export const deleteMyOrder = (id) => instance.delete(`/delete/${id}`);

// Update Order Status (Admin Only)
export const updateOrderStatus = (id, statusData) => instance.patch(`/update/${id}`, statusData);

// Delete Order by Admin (hard delete)
export const deleteOrderByAdmin = (id) => instance.delete(`/admin/delete/${id}`);
