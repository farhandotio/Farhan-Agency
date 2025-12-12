// App.jsx
import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import { fetchProfile } from './app/features/auth/authSlice';

import MainRoutes from './routes/MainRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import InitialLoader from './components/common/InitialLoader';

import SmoothScroll from './components/common/SmoothScroll';
import ScrollToTop from './components/common/ScrollToTop';
import CursorEffect from './components/common/CursorEffect';

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    if (!hasFetchedProfile.current) {
      dispatch(fetchProfile());
      hasFetchedProfile.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>MD Farhan Sadik — Web Developer</title>
      </Helmet>

      {/* Global Smooth Scroll */}
      <SmoothScroll />

      <div className="relative bg-bg text-text min-h-screen">
        <InitialLoader minDuration={900} />
        <Navbar />

        {/* Smooth ScrollToTop */}
        <ScrollToTop />

        <main id="main-content" className="max-w-[1900px] mx-auto">
          <CursorEffect />
          <MainRoutes />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AppWrapper;
