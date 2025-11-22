import React from "react";

const UserProfile = ({ user, onEdit, onLogout }) => {
  if (!user) return null;

  const fullname = `${user.fullname?.firstName || ""} ${
    user.fullname?.lastName || ""
  }`.trim();

  return (
    <div className="p-4 border border-border rounded bg-cardBg">
      <div className="flex items-center space-x-4">
        <img
          src={user.picture || "/default-avatar.png"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-medium">{fullname || user.email}</div>
          <div className="text-sm text-pText">{user.email}</div>
          {user.company && (
            <div className="text-sm text-pText">{user.company}</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-2 rounded bg-primary text-text"
        >
          Edit
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-2 rounded bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile