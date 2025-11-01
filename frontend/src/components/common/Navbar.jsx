import React, { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "SERVICES", href: "/services" },
    { name: "PROJECTS", href: "/projects" },
    { name: "PROCESS", href: "/process" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-bg text-text py-5 z-1000">
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-5 sm:px-7 lg:px-10">
        {/* Logo/Brand Name */}
        <Link to="/">
          <h1 className="text-xl lg:text-3xl whitespace-nowrap uppercase font-bold tracking-widest">
            Farhan <span className="text-secondary">Agency</span>
            <span className="text-primary">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5 lg:space-x-12">
          <ul className="flex space-x-6 lg:space-x-8 uppercase text-sm md:text-xs lg:text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `transition duration-300 hover:text-primary ${
                      isActive ? "text-primary font-semibold" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* "PROFILE" Button */}
          <NavLink
            to="/profile"
            className="flex items-center px-6 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
          >
            PROFILE
            <SlPencil className="ml-2 text-base" />
          </NavLink>
        </nav>

        {/* Mobile MENU button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden uppercase text-sm font-semibold tracking-wider border-2 border-primary px-5 py-2 rounded-full hover:bg-hoverPrimary hover:text-white transition duration-300"
        >
          Menu
        </button>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] bg-bg text-text flex flex-col items-center justify-center gap-10 text-lg uppercase transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-8 text-xl font-bold hover:text-primary transition"
        >
          ✕
        </button>

        {/* Nav Links */}
        <ul className="flex flex-col items-center gap-6 font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `transition duration-300 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* "PROFILE" Button */}
        <NavLink
          to="/profile"
          onClick={() => setMenuOpen(false)}
          className="flex items-center px-8 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
        >
          PROFILE
          <SlPencil className="ml-2 text-base" />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
