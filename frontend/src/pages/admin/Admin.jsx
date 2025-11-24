// File: Admin.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaServicestack,
  FaProjectDiagram,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
  { name: "Users", path: "/admin/users", icon: FaUsers },
  { name: "Orders", path: "/admin/orders", icon: FaBoxOpen },
  { name: "Services", path: "/admin/services", icon: FaServicestack },
  { name: "Create Service", path: "/admin/services/create", icon: FaPlus },
  { name: "Projects", path: "/admin/projects", icon: FaProjectDiagram },
  { name: "Create Project", path: "/admin/projects/create", icon: FaPlus },
];

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-19">
      {/* Mobile header with menu icon */}
      <div className="flex items-center gap-2 md:hidden px-5 sm:px-7 lg:px-10">
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((s) => !s)}
          className="rounded-md focus:outline-none text-xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="text-lg font-semibold">Admin Panel</div>

        <div style={{ width: 40 }} />
      </div>

      <div className="flex gap-5 pt-5 ">
        {isOpen && (
          <div
            className="fixed inset-0 z-30 md:hidden"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        <aside
          className={`z-40 w-64 bg-bg border-r border-border md:flex flex-col  px-5 sm:px-7 lg:px-10 absolute transform transition-transform duration-200
            ${
              isOpen
                ? "translate-x-0 fixed top-0 left-0 h-full shadow-lg"
                : " -translate-x-full md:translate-x-0 md:static md:h-auto"
            }`}
          role="navigation"
          aria-label="Admin sidebar"
        >
          <div className="py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-text font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-semibold">Admin</div>
                <div className="text-xs text-mutedText">Dashboard</div>
              </div>
            </div>

            {/* close icon visible on mobile inside sidebar */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex flex-col gap-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;

              const isDashboard =
                link.name === "Dashboard" &&
                (location.pathname === "/admin" ||
                  location.pathname === "/admin/dashboard");

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded hover:bg-hoverCardBg transition
                  ${
                    isActive || isDashboard
                      ? "bg-primary text-text font-semibold"
                      : "text-mutedText"
                  }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                >
                  <Icon />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}

            <button
              onClick={handleLogout}
              className="bg-danger text-text px-2.5 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 pb-10  px-5 sm:px-7 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
