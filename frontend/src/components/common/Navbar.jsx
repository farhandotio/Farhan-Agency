import React from "react";
import { SlPencil } from "react-icons/sl";
import { Link, NavLink } from "react-router-dom"; // ✅ use NavLink instead of Link

const Navbar = () => {
  const navLinks = [
    { name: "SERVICES", href: "/services" },
    { name: "PROJECTS", href: "/projects" },
    { name: "PROCESS", href: "/process" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full bg-bg text-text py-5 z-1000">
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-5 sm:px-7 lg:px-10">
        {/* Logo/Brand Name */}
        <Link to="/">
          <h1 className="text-2xl uppercase font-bold tracking-widest">
            Farhan Agency.
          </h1>
        </Link>

        {/* Navigation Links and Button Container */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <ul className="flex space-x-6 lg:space-x-8 uppercase text-sm font-medium tracking-wide">
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

          {/* "LET'S TALK" Button */}
          <NavLink
            to="/contact"
            className="flex items-center px-6 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
          >
            LET'S TALK
            <SlPencil className="ml-2 text-base" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
