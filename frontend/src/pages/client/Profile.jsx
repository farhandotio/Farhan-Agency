// File: src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logoutUser } from "../../app/features/auth/authSlice";
import { fetchMyOrders } from "../../app/features/order/orderSlice";
import UserProfile from "../../components/profile/UserProfile";
import EditProfileForm from "../../components/profile/EditProfileForm";
import UserOrders from "../../components/profile/UserOrders";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((s) => s.auth);
  const { myOrders, myStatus } = useSelector((s) => s.order || {});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (authLoading && !user) return <div className="p-6">Loading profile…</div>;

  return (
    <div className="px-5 sm:px-7 lg:px-10 py-30">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          My Profile
        </h1>
        <p className="text-lg md:text-xl text-mutedText max-w-3xl">
          Welcome to your profile. Here you can view your personal information,
          update your details, and see a history of your orders.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <UserProfile
            user={user}
            onEdit={() => setEditing(true)}
            onLogout={() => dispatch(logoutUser())}
          />
        </div>

        {/* Orders Section */}
        <div className="md:col-span-2">
          <UserOrders orders={myOrders} status={myStatus} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-bg bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-cardBg rounded-lg w-full max-w-lg relative">
            <EditProfileForm
              user={user}
              onCancel={() => setEditing(false)}
              onSaved={() => setEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
