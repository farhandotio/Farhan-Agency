// File: EditProfileForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileUser } from "../../app/features/auth/authSlice";
import { FiUser, FiMail, FiBriefcase } from "react-icons/fi";

const EditProfileForm = ({ user, onCancel, onSaved }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const [preview, setPreview] = useState(user?.picture || null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.fullname?.firstName || "",
      lastName: user?.fullname?.lastName || "",
      email: user?.email || "",
      company: user?.company || "",
      picture: null,
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.fullname?.firstName || "",
      lastName: user?.fullname?.lastName || "",
      email: user?.email || "",
      company: user?.company || "",
      picture: null,
    });
    setPreview(user?.picture || null);
  }, [user, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("picture", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.firstName) formData.append("fullname.firstName", data.firstName);
    if (data.lastName) formData.append("fullname.lastName", data.lastName);
    if (data.email) formData.append("email", data.email);
    formData.append("company", data.company || "");
    if (data.picture) formData.append("picture", data.picture);

    const action = await dispatch(updateProfileUser(formData));
    if (updateProfileUser.fulfilled.match(action)) {
      onSaved?.();
    }
  };

  // Input wrapper with icon
  const InputWithIcon = ({ icon: Icon, label, registerProps, error, type = "text" }) => (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center border border-border bg-hoverCardBg rounded px-2 py-2">
        <Icon className="text-gray-400 mr-2" />
        <input
          type={type}
          {...registerProps}
          className="w-full outline-none bg-hoverCardBg"
        />
      </div>
      {error && <p className="text-danger text-sm mt-1">{error.message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
      {/* Profile Photo */}
      <div className="flex justify-center mb-4">
        <div
          className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-primary flex items-center justify-center bg-hoverCardBg"
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-pText">Upload</span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* First & Last Name on same line */}
      <div className="flex gap-2">
        <InputWithIcon
          icon={FiUser}
          label="First Name"
          registerProps={register("firstName", { required: "First name is required" })}
          error={errors.firstName}
        />
        <InputWithIcon
          icon={FiUser}
          label="Last Name"
          registerProps={register("lastName", { required: "Last name is required" })}
          error={errors.lastName}
        />
      </div>

      {/* Email */}
      <InputWithIcon
        icon={FiMail}
        label="Email"
        type="email"
        registerProps={register("email", { required: "Email is required" })}
        error={errors.email}
      />

      {/* Company */}
      <InputWithIcon
        icon={FiBriefcase}
        label="Company"
        registerProps={register("company")}
      />

      {/* Save & Cancel */}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
