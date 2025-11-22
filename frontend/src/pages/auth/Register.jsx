// File: Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../app/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaUser, FaBuilding, FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      password: "",
      picture: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullname[firstName]", data.firstName);
    formData.append("fullname[lastName]", data.lastName);
    if (data.company) formData.append("company", data.company);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.picture && data.picture[0]) formData.append("picture", data.picture[0]);

    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.role === "admin") navigate("/admin");
      else navigate("/profile");
    }
  };

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const InputWithIcon = ({ icon: Icon, type = "text", placeholder, registerProps, error }) => (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Icon size={18} />
      </span>
      <input
        type={type}
        placeholder={placeholder}
        {...registerProps}
        className="w-full border border-border px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-25 bg-bg px-5 sm:px-7 lg:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cardBg p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <label htmlFor="picture" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-hoverCardBg border border-border flex items-center justify-center hover:ring-2 hover:ring-primary transition">
              {preview ? (
                <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <FaCamera size={28} className="text-gray-400" />
              )}
            </div>
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            {...register("picture")}
            onChange={handlePictureChange}
            className="hidden"
          />
        </div>

        {/* First + Last Name */}
        <div className="flex gap-4">
          <InputWithIcon
            icon={FaUser}
            placeholder="First Name"
            registerProps={register("firstName", { required: "First name is required" })}
            error={errors.firstName}
          />
          <InputWithIcon
            icon={FaUser}
            placeholder="Last Name"
            registerProps={register("lastName", { required: "Last name is required" })}
            error={errors.lastName}
          />
        </div>

        {/* Company */}
        <InputWithIcon
          icon={FaBuilding}
          placeholder="Company (optional)"
          registerProps={register("company")}
        />

        {/* Email */}
        <InputWithIcon
          icon={AiOutlineMail}
          type="email"
          placeholder="Email"
          registerProps={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <AiOutlineLock size={20} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-border px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-text cursor-pointer py-2 rounded hover:bg-hoverPrimary transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
