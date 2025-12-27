import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import serviceRoutes from './routes/service.routes.js';
import orderRoutes from './routes/order.routes.js';
import visitorRoutes from './routes/visitor.routes.js';

const app = express();
app.set('trust proxy', true);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const whitelist = ['http://localhost:5173', 'https://farhansadik.vercel.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
// app.use("/api/admin", adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/visitors', visitorRoutes);

export default app;
