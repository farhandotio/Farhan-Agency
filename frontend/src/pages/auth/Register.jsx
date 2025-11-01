import React, { useState, useCallback } from "react";
import {
  Package,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  Chrome,
  User,
  Image as ImageIcon,
} from "lucide-react";

// Combined Input Class: This represents your custom 'input' class
const INPUT_CLASSES = `w-full p-3 pl-12 border border-border rounded-xl focus:ring-primary focus:border-primary transition duration-150 text-sm bg-cardBg text-text placeholder-mutext-mutedText`;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // State to store the URL for the selected profile picture preview
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (profilePicturePreview) {
          URL.revokeObjectURL(profilePicturePreview);
        }
        setProfilePicturePreview(URL.createObjectURL(file));
      } else {
        setProfilePicturePreview(null);
      }
    },
    [profilePicturePreview]
  );

  return (
    <div
      className={`h-screen z-10000000 bg-bg fixed w-screen p-5 sm:p-10 font-sans`}
    >
      <div className="flex items-center justify-center h-full">
        <div
          className={`w-full max-w-lg bg-cardBg p-5 sm:p-5 lg:p-10 rounded-3xl shadow-2xl transition-all duration-300 transform hover:shadow-xl border border-border md:scale-85`}
        >
          {/* --- Form Fields --- */}
          <form className="space-y-5">
            {/* Profile Picture Upload Section (New Logic) */}
            <div className="flex justify-center items-center gap-2">
              {/* Hidden File Input: This is the actual file selector */}
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" // Hides the ugly default file input
              />

              {/* Visual Profile Picture Circle / Label: Clickable area for file upload */}
              <label
                htmlFor="profilePictureInput"
                className={`cursor-pointer w-24 h-24 rounded-full border-4 border-primary/50 shadow-lg bg-inputBg flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-xl`}
                title="Click to upload profile picture"
              >
                {profilePicturePreview ? (
                  <img
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className={`w-10 h-10 text-mutedText`} />
                )}
              </label>
              <label
                htmlFor="profilePictureInput"
                className={`block text-sm font-medium text-text cursor-pointer hover:text-primary transition-colors`}
              >
                {profilePicturePreview ? "Change Picture" : "Upload Picture"}
              </label>
            </div>

            {/* First Name & Last Name (Side by Side) */}
            <div className="flex gap-4">
              {/* First Name (Uses flex-1 for equal width) */}
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className={`block text-sm font-medium text-text mb-1`}
                >
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="w-full p-3 pl-12 input"
                  />
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                  />
                </div>
              </div>

              {/* Last Name (Uses flex-1 for equal width) */}
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className={`block text-sm font-medium text-text mb-1`}
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full p-3 pl-12 input"
                  />
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                  />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium text-text mb-1`}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="john@gmail.com"
                  className="w-full p-3 pl-12 input"
                />
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                />
              </div>
            </div>

            {/* Password Input with Hide/Show Toggle */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium text-text mb-1`}
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
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                />

                {/* Eye Icon Button for Visibility Toggle */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedText hover:text-primary transition duration-150 p-1 rounded-full focus:outline-none`}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Primary Register Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-primary hover:bg-pritext-primary focus:outline-none transition-all cursor-pointer duration-150 transform hover:scale-[1.01]`}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Register
            </button>
          </form>

          {/* --- Divider and Google Auth --- */}
          <div className="flex items-center my-6">
            <div className={`grow border-t border-border`}></div>
            <span className={`shrink mx-4 text-mutedText text-xs`}>OR</span>
            <div className={`grow border-t border-border`}></div>
          </div>

          {/* Sign Up with Google Button */}
          <button
            type="button"
            className={`w-full flex items-center justify-center py-3 px-4 border border-border rounded-xl text-text cursor-pointer bg-cardBg hover:bg-hoverCardBg focus:outline-none transition-all duration-150`}
          >
            <Chrome className={`w-5 h-5 mr-3 text-primary`} />
            <span className="font-semibold">Sign Up with Google</span>
          </button>

          {/* Login Link */}
          <p className={`mt-4 text-center text-sm text-mutedText`}>
            Already have an account?
            <a
              href="#"
              className={`ml-1 font-medium text-primary hover:text-primary transition duration-150`}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
