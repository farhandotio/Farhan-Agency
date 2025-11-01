import React, { useState } from "react";
import {
  Package,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  Chrome,
  CheckSquare,
} from "lucide-react";

const Login = () => {
  // State for toggling password visibility icon appearance (design only)
  const [showPassword, setShowPassword] = useState(false);

  // Placeholder function for UI interaction
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed min-h-screen w-full z-10000000 bg-bg flex items-center justify-center p-5 md:p-10">
      {/* Login Card Container */}
      <div className="w-full max-w-sm bg-cardBg p-5 sm:p-7 rounded-3xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl border border-border">
        {/* Logo and Title Section */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/50">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text">
            Welcome Back
          </h1>
        </div>

        {/* --- Form Fields --- */}
        <form className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="admin@farhanagency.com"
                className="w-full p-3 pl-12 input"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText" />
            </div>
          </div>

          {/* Password Input with Hide/Show Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="w-full p-3 pl-12 input"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

              {/* Eye Icon Button for Visibility Toggle (Design) */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedText hover:text-text transition duration-150 p-1 rounded-full focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password Link */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-mutedText cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 checkbox"
              />
              Remember me
            </label>
            <a
              href="#"
              className="font-medium text-mutedText hover:text-hoverPrimary transition duration-150"
            >
              Forgot password?
            </a>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-primary  hover:bg-hoverPrimary focus:outline-none transition-all cursor-pointer duration-150"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
        </form>

        {/* --- Divider and Google Auth --- */}
        <div className="flex items-center my-6">
          <div className="grow border-t border-border"></div>
          <span className="shrink mx-4 text-mutedText text-xs">OR</span>
          <div className="grow border-t border-border"></div>
        </div>

        {/* Sign In with Google Button (Design) */}
        <button
          type="button"
          className="w-full flex items-center justify-center py-3 px-4 border border-border rounded-xl text-text cursor-pointer bg-cardBg hover:bg-hoverCardBg focus:outline-none transition-all duration-150"
        >
          {/* Using Chrome icon as a proxy for Google/Browser icon */}
          <Chrome className="w-5 h-5 mr-3 text-primary" />
          <span className="font-semibold">Sign In with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
