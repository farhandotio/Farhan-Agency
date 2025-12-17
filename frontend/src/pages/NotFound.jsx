import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-xl"
      >
        {/* 404 */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[120px] sm:text-[160px] font-extrabold leading-none text-neutral-200"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xl sm:text-2xl font-semibold text-neutral-300 mt-2"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-neutral-400 mt-4"
        >
          The page you are looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
