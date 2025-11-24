// File: Users.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../app/features/auth/authSlice";
import Skeleton from "../../components/common/Skeleton";

/**
 * Small UserRow (card) — shows avatar (image or initials), name, email, role
 */
function UserCard({ user }) {
  const nameStr =
    user.fullname?.firstName || user.fullname?.lastName
      ? `${user.fullname?.firstName || ""} ${user.fullname?.lastName || ""}`.trim()
      : user.name || user.email || "U";

  const initials = nameStr
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // try common avatar fields — adjust to your API if needed
  const avatarSrc =
    user.avatar ||
    user.profileImage ||
    user.picture ||
    user.photoUrl ||
    user.profile?.picture ||
    null;

  return (
    <button
      type="button"
      className="w-full text-left p-3 rounded-lg hover:shadow-sm transition bg-cardBg border border-border flex items-center gap-4"
    >
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-hoverCardBg flex items-center justify-center overflow-hidden shrink-0">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={nameStr}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-mutedText">{initials}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <div className="font-medium truncate text-sm md:text-base">
              {user.fullname?.firstName || user.name || "Unnamed User"}{" "}
              {user.fullname?.lastName ? user.fullname.lastName : ""}
            </div>
            <div className="text-xs md:text-sm text-mutedText truncate">{user.email}</div>
            {user.company && (
              <div className="text-xs md:text-sm text-mutedText truncate">{user.company}</div>
            )}
          </div>

          <div className="text-right">
            <div className="inline-block py-1 px-2 rounded-full bg-hoverCardBg text-xs md:text-sm font-medium">
              {user.role || "user"}
            </div>
            <div className="text-xs md:text-sm text-mutedText mt-1">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm text-mutedText">
          <div className="truncate">{user.bio || user.designation || ""}</div>
        </div>
      </div>
    </button>
  );
}

const Users = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    usersLoading,
    usersError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (usersLoading)
    return (
      <div className="min-h-[300px] flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg">
            <Skeleton width="100%" height="72px" rounded />
            <div className="mt-3">
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="14px" className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  if (usersError) return <div className="text-danger">{usersError}</div>;

  return (
    <div>
      {/* Header with total count on the right (top) */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>

        <div
          className="inline-flex items-center gap-3 text-sm text-mutedText"
          aria-hidden="true"
        >
          <span className="text-mutedText">Total:</span>
          <span className="px-3 py-1 rounded-full bg-hoverCardBg text-sm font-medium">
            {users?.length ?? 0}
          </span>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-mutedText">No users found.</p>
      ) : (
        <div className="grid gap-3">
          {users.map((u) => (
            <UserCard key={u._id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
