// Register.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, Chrome, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../app/features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.user || { isLoading: false }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: null,
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // watch file so React Hook Form knows about it (optional)
  const watchedFile = watch("profilePicture");

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (profilePicturePreview) {
          URL.revokeObjectURL(profilePicturePreview);
        }
        const objectUrl = URL.createObjectURL(file);
        setProfilePicturePreview(objectUrl);
        // set file to react-hook-form
        setValue("profilePicture", file, { shouldValidate: true });
      } else {
        if (profilePicturePreview) {
          URL.revokeObjectURL(profilePicturePreview);
        }
        setProfilePicturePreview(null);
        setValue("profilePicture", null, { shouldValidate: true });
      }
    },
    [profilePicturePreview, setValue]
  );

  // cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
      }
    };
  }, [profilePicturePreview]);

  const onSubmit = async (data) => {
    try {
      // build FormData (include both key styles to be safe)
      const formData = new FormData();
      formData.append("firstName", data.firstName || "");
      formData.append("lastName", data.lastName || "");
      // also append fullname.* in case backend expects nested fields
      formData.append("fullname.firstName", data.firstName || "");
      formData.append("fullname.lastName", data.lastName || "");
      formData.append("email", data.email || "");
      formData.append("password", data.password || "");
      if (data.profilePicture) {
        formData.append("picture", data.profilePicture);
      }

      // dispatch thunk (registerUser expects FormData or plain object)
      const action = await dispatch(registerUser(formData));

      if (action.error) {
        // registration failed — action.error may contain message
        console.error("Register failed:", action.error);
        return;
      }

      navigate("/");
      // success
      console.log("Registration success:", action.payload);
      // TODO: navigate or show toast if you want
    } catch (err) {
      console.error("Registration exception:", err);
    }
  };

  return (
    <div
      className={`h-screen z-10000000 bg-bg fixed w-screen p-5 sm:p-10 font-sans`}
    >
      <div className="flex items-center justify-center h-full">
        <div
          className={`w-full max-w-sm bg-cardBg p-5 sm:p-7 rounded-3xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl border border-border`}
        >
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-text">Create Your Account</h1>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="flex items-center gap-2 mb-7">
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="profilePictureInput"
                className={`cursor-pointer w-24 h-24 rounded-full border-4 border-primary bg-inputBg flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-hoverPrimary shadow-lg shadow-primary/50`}
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

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="w-full p-3 pl-12 input"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full p-3 pl-12 input"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="john@gmail.com"
                  className="w-full p-3 pl-12 input"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                />
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
                  id="password"
                  placeholder="••••••••"
                  className="w-full p-3 pl-12 input"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mutedText`}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedText hover:text-primary transition duration-150 p-1 rounded-full focus:outline-none cursor-pointer`}
                  title={showPassword ? "Hide password" : "Show password"}
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
              disabled={isSubmitting || isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-primary hover:bg-pritext-primary focus:outline-none transition-all cursor-pointer duration-150 transform hover:bg-hoverPrimary ${
                isSubmitting || isLoading
                  ? "opacity-70 pointer-events-none"
                  : ""
              }`}
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isSubmitting || isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* <div className="flex items-center my-6">
            <div className={`grow border-t border-border`}></div>
            <span className={`shrink mx-4 text-mutedText text-xs`}>OR</span>
            <div className={`grow border-t border-border`}></div>
          </div> */}

          {/* <button
            onClick={() => {
              window.location.href =
                "https://farhanagency.vercel.app/api/auth/google";
            }}
            type="button"
            className={`w-full flex items-center justify-center py-3 px-4 border border-border rounded-xl text-text cursor-pointer bg-cardBg hover:bg-hoverCardBg focus:outline-none transition-all duration-150`}
          >
            <Chrome className={`w-5 h-5 mr-3 text-primary`} />
            <span className="font-semibold">Sign Up with Google</span>
          </button> */}

          <p className={`mt-4 text-center text-sm text-mutedText`}>
            Already have an account?
            <Link
              to="/login"
              className={`ml-1 font-medium text-primary hover:text-primary transition duration-150`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
