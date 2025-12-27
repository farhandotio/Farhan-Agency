import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/order/orderSlice";
import authReducer from "./features/auth/authSlice";
import servicesReducer from "./features/services/servicesSlice";
import projectsReducer from "./features/projects/projectsSlice";
import visitorReducer from "./features/visitor/visitorSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer,
    services: servicesReducer,
    projects: projectsReducer,
    visitor: visitorReducer,
  },
});

export default store;
