// Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice"; // thunk to login
import { setUser } from "../../app/features/auth/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      // dispatch login thunk (similar to register)
      const res = await dispatch(loginUser(data)).unwrap();

      // res should contain the user object
      if (res) {
        // set user in Redux store
        dispatch(setUser(res));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="fixed h-screen w-full z-10000000 bg-bg flex items-center justify-center p-5 md:p-10">
      <div className="w-full max-w-sm bg-cardBg p-5 sm:p-7 rounded-3xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl border border-border">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-text">Welcome Back</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="relative">
              <input
                type="email"
                placeholder="john@gmail.com"
                className="w-full p-3 pl-12 input"
                {...register("email", { required: "Email is required" })}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 pl-12 input"
                {...register("password", { required: "Password is required" })}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText" />

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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-lg text-base font-semibold text-white bg-primary hover:bg-hoverPrimary focus:outline-none transition-all duration-150 ${
              isSubmitting ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            <LogIn className="w-5 h-5 mr-2" />
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* <div className="flex items-center my-6">
          <div className="grow border-t border-border"></div>
          <span className="shrink mx-4 text-mutedText text-xs">OR</span>
          <div className="grow border-t border-border"></div>
        </div> */}

        {/* <button
          onClick={() => {
            window.location.href =
              "https://farhanagency.vercel.app/api/auth/google";
          }}
          type="button"
          className="w-full flex items-center justify-center py-3 px-4 border border-border rounded-xl text-text cursor-pointer bg-cardBg hover:bg-hoverCardBg focus:outline-none transition-all duration-150"
        >
          <Chrome className="w-5 h-5 mr-3 text-primary" />
          <span className="font-semibold">Sign In with Google</span>
        </button> */}

        <p className="mt-4 text-center text-sm text-mutedText">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-medium text-primary hover:text-primary transition duration-150"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
