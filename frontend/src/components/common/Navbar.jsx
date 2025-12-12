import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuMotion } from "react-icons/cg";
import Logo from "./Logo";
import PrimaryButton from "./PrimaryButton";

const navLinks = [
  { name: "SERVICES", href: "/services" },
  { name: "PROJECTS", href: "/projects" },
  { name: "PROCESS", href: "/process" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const profileLink = user
    ? user.role === "admin"
      ? "/admin"
      : "/profile"
    : "/login";

  return (
    <header className="fixed top-0 w-full bg-bg/80 backdrop-blur-2xl text-text py-5 z-50">
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-5 sm:px-7 lg:px-10">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-5 lg:space-x-8">
          <ul className="flex space-x-6 lg:space-x-8 uppercase text-sm md:text-xs lg:text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `transition duration-300 hover:text-primary ${
                      isActive ? 'text-primary font-semibold' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <PrimaryButton
            text={user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
            url={profileLink}
            onClick={scrollToTop}
            className="rounded-full text-sm shadow-xl"
          />
        </nav>

        {/* Mobile Menu */}
        <CgMenuMotion
          onClick={() => {
            scrollToTop();
            setMenuOpen(true);
          }}
          className="lg:hidden uppercase text-3xl font-semibold tracking-wide rounded-full transition duration-300 cursor-pointer"
        />
      </div>

      {/* Mobile Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] bg-bg backdrop-blur-4xl text-text text-lg uppercase transform transition-transform duration-500 p-5 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between pb-10">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold hover:text-primary transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-6 font-medium tracking-wide pb-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                onClick={() => {
                  scrollToTop();
                  setMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `transition duration-300 hover:text-primary ${
                    isActive ? 'text-primary font-semibold' : ''
                  }`
                }
              >
                <span className="text-lg">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Dynamic Mobile Button */}
        <PrimaryButton
          text={user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
          url={profileLink} // internal React Router link
          onClick={() => {
            scrollToTop();
            setMenuOpen(false);
          }}
          size="lg"
          className="rounded-md text-md text-center shadow-xl"
        />
      </div>
    </header>
  );
};

export default Navbar;
