import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user, onEdit, onLogout }) => {
  const navigate = useNavigate();
  if (!user) return null;

  const fullname = `${user.fullname?.firstName || ""} ${
    user.fullname?.lastName || ""
  }`.trim();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="p-4 border border-border rounded bg-cardBg">
      <div className="flex items-center space-x-4">
        <img
          src={user.picture || "/default-avatar.png"}
          alt="avatar"
          className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div>
          <div className="md:text-lg font-medium">{fullname || user.email}</div>
          <div className="text-xs md:text-sm text-pText">{user.email}</div>
          {user.company && (
            <div className="text-sm text-pText">{user.company}</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="px-2.5 py-1 rounded bg-primary text-text cursor-pointer hover:bg-primary/95"
        >
          Edit
        </button>

        <button
          onClick={handleLogout}
          className="px-2.5 py-1 rounded bg-danger text-text cursor-pointer hover:bg-danger/95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
