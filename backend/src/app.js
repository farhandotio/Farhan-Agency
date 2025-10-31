import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config/config.js";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
import projectRoutes from "./routes/project.routes.js";
// import serviceRoutes from "./routes/service.routes.js";
// import orderRoutes from "./routes/order.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/orders", orderRoutes);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);


export default app;
