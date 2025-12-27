import axios from 'axios';

// Koyeb-e deploy kora apnar backend URL
const API_BASE = 'https://farhan-agency-eg4k.onrender.com/api/visitors';

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// -------------------- VISITOR APIs -------------------- //

// 1. Visitor tracking logic pathanor jonno
export const trackVisitorApi = (visitorData) => instance.post('/track', visitorData);

// 2. Admin dashboard-er jonno stats fetch kora
export const getVisitorStatsApi = () => instance.get('/stats');

export default {
  trackVisitorApi,
  getVisitorStatsApi,
};
