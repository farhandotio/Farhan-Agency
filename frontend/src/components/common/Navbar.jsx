import React, { useEffect, useState } from "react";
import { SlPencil } from "react-icons/sl";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../app/features/auth/authSlice";

const navLinks = [
  { name: "SERVICES", href: "/services" },
  { name: "PROJECTS", href: "/projects" },
  { name: "PROCESS", href: "/process" },
  { name: "ABOUT", href: "/about" },
  { name: "START A PROJECT", href: "/contact" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Smooth scroll when route changes (covers normal navigation)
  useEffect(() => {
    // If you prefer instant jump on route change, remove behavior: "smooth"
    window.scrollTo({ top: 0, behavior: "smooth" });
    // also close mobile menu on route change (if it was open)
    setMenuOpen(false);
  }, [location.pathname]);

  // one-line helper you can use inline: onClick={() => scrollToTop()}
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // handle nested user if needed (from authSlice)
  const currentUser = user?.user ?? user ?? null;
  const isLoggedIn = !!(currentUser && Object.keys(currentUser).length > 0);
  const isAdmin = currentUser?.role === "admin";

  return (
    <header className="fixed top-0 w-full bg-bg text-text py-5 z-50">
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-5 sm:px-7 lg:px-10">
        {/* Logo/Brand Name */}
        <Link
          onClick={scrollToTop} // <-- one-line usage
          to="/"
          aria-label="Farhan Agency home"
        >
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

          {/* Profile / Join Us Button */}
          <NavLink
            onClick={scrollToTop}
            to={isLoggedIn ? (isAdmin ? "/admin" : "/profile") : "/register"}
            className="flex items-center px-6 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
            aria-label={isLoggedIn ? "Go to profile" : "Join us / Register"}
          >
            {isLoading ? "Loading..." : isLoggedIn ? "PROFILE" : "JOIN US"}
            <SlPencil className="ml-2 text-base" />
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            scrollToTop();
            setMenuOpen(true);
          }}
          className="lg:hidden uppercase text-sm font-semibold tracking-wider border-2 border-primary px-5 py-2 rounded-full hover:bg-hoverPrimary hover:text-white transition duration-300"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] bg-bg text-text flex flex-col items-center justify-center gap-10 text-lg uppercase transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-8 text-xl font-bold hover:text-primary transition"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Nav Links */}
        <ul className="flex flex-col items-center gap-6 font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                onClick={() => {
                  scrollToTop(); // immediate scroll if user clicks same route
                  setMenuOpen(false);
                }}
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

        {/* Profile / Join Us Button */}
        <NavLink
          to={isLoggedIn ? (isAdmin ? "/admin" : "/profile") : "/register"}
          onClick={() => {
            scrollToTop();
            setMenuOpen(false);
          }}
          className="flex items-center px-8 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
          aria-label={isLoggedIn ? "Go to profile" : "Join us / Register"}
        >
          {isLoading ? "Loading..." : isLoggedIn ? "PROFILE" : "JOIN US"}
          <SlPencil className="ml-2 text-base" />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
