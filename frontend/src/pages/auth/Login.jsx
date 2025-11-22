// File: Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.role === "admin") navigate("/admin");
      else navigate("/profile");
    }
  };

  const InputWithIcon = ({ icon: Icon, type = "text", placeholder, registerProps, error, showToggle }) => (
    <div className="relative w-full mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Icon size={20} />
      </span>
      <input
        type={type}
        placeholder={placeholder}
        {...registerProps}
        className="w-full border border-border px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {showToggle && (
        <span
          onClick={showToggle.toggle}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
        >
          {showToggle.show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-25 bg-bg px-5 sm:px-7 lg:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cardBg p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Email */}
        <InputWithIcon
          icon={AiOutlineMail}
          type="email"
          placeholder="Email"
          registerProps={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        {/* Password */}
        <InputWithIcon
          icon={AiOutlineLock}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          registerProps={register("password", { required: "Password is required" })}
          error={errors.password}
          showToggle={{ show: showPassword, toggle: () => setShowPassword(!showPassword) }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-text py-2 rounded hover:bg-hoverPrimary cursor-pointer transition mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-pText">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
