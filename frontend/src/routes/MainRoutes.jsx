// File: MainRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Portfolio from '../pages/Portfolio';
import About from '../pages/About';
import Services from '../pages/Services';
import ServiceDetailsPage from '../pages/ServiceDetailsPage';
import Projects from '../pages/Projects';
import Process from '../pages/Process';
import Contact from '../pages/Contact';
import Profile from '../pages/client/Profile';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Admin from '../pages/admin/Admin';

// Admin child pages
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Orders from '../pages/admin/Orders';
import ServicesAdmin from '../pages/admin/Services';
import ProjectsAdmin from '../pages/admin/Projects';
import CreateProject from '../pages/admin/CreateProject';
import CreateService from '../pages/admin/CreateService';
import NotFound from '../pages/NotFound';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Public / Client routes */}
      <Route path="/" element={<Portfolio />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<Projects />} />
      <Route path="/process" element={<Process />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes with sidebar + children */}
      <Route path="/admin" element={<Admin />}>
        {/* Default child route */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="services/create" element={<CreateService />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="projects/create" element={<CreateProject />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
