import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CgMenuMotion } from 'react-icons/cg';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

const navLinks = [
  { name: 'SERVICES', href: '/services' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'PROCESS', href: '/process' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollActive(currentScrollY > 50);

      // scroll down → hide
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNavbar(true);
      }
      // scroll up → show
      else {
        setHideNavbar(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const profileLink = user ? (user.role === 'admin' ? '/admin' : '/profile') : '/login';

  return (
    <header
      className={`fixed top-0 w-full backdrop-blur-2xl text-text py-5 z-50
    transition-all duration-300 ease-in-out
    ${hideNavbar ? '-translate-y-full' : 'translate-y-0'}
    ${
      scrollActive
        ? 'bg-bg/90'
        : 'bg-bg/80'
    }`}
    >
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
                      isActive
                        ? 'text-primary font-semibold text-shadow-sm-cyan border-b-2 border-primary/80 pb-1' // Active Link Neon Glow
                        : 'text-gray-400 hover:text-primary' // Subtle hover change
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Login/Profile Button with Cyan Glow */}
          <PrimaryButton
            text={user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
            url={profileLink}
            onClick={scrollToTop}
            className="rounded-full text-sm shadow-lg shadow-primary/50 hover:shadow-primary/70"
          />
        </nav>

        {/* Mobile Menu Icon with Cyan Glow */}
        <CgMenuMotion
          onClick={() => {
            scrollToTop();
            setMenuOpen(true);
          }}
          className="lg:hidden uppercase text-4xl text-primary font-semibold tracking-wide rounded-full transition duration-300 cursor-pointer shadow-lg shadow-primary/40 hover:shadow-primary/60 p-1"
        />
      </div>

      {/* Mobile Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] bg-bg text-text text-lg uppercase transform transition-transform duration-500 p-5 border-l-4 border-primary/50 shadow-2xl shadow-primary/60 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ... (Drawer Content remains largely the same) ... */}
        <div className="flex justify-between pb-10">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold text-primary hover:text-hoverPrimary transition cursor-pointer"
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
                    isActive ? 'text-primary font-semibold text-shadow-sm-cyan' : 'text-gray-400'
                  }`
                }
              >
                <span className="text-xl">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Dynamic Mobile Button with Cyan Glow */}
        <PrimaryButton
          text={user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
          url={profileLink}
          onClick={() => {
            scrollToTop();
            setMenuOpen(false);
          }}
          size="lg"
          className="rounded-md text-md text-center shadow-lg shadow-primary/50"
        />
      </div>
    </header>
  );
};

export default Navbar;
