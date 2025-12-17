import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
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
  const [hideNavbar, setHideNavbar] = useState(false);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const user = useSelector((state) => state.auth?.user);
  const profileLink = user ? (user.role === 'admin' ? '/admin' : '/profile') : '/login';

  /* =========================
     Scroll hide / show
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current + 15 && currentY > 120) {
        setHideNavbar(true);
      } else if (currentY < lastScrollY.current - 15) {
        setHideNavbar(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* =========================
     Route change
  ========================= */
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  /* =========================
     GSAP entrance
  ========================= */
  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  /* =========================
     Body scroll lock (mobile)
  ========================= */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <header
        ref={navbarRef}
        className={`fixed top-0 w-full z-100 transition-all duration-300 ${
          hideNavbar ? 'opacity-0 -translate-y-6' : 'opacity-100 translate-y-0'
        }`}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="max-w-[1400px] mx-auto w-full p-5 sm:px-7 lg:px-10">
          <div className="flex justify-between items-center py-3 px-5 pl-7 border border-border rounded-full bg-bg/60 backdrop-blur-2xl md:w-fit mx-auto">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 ml-28">
              <ul className="flex gap-8 uppercase text-sm font-medium tracking-wide">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                          : 'text-gray-400 hover:text-primary transition'
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to={profileLink}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                        : 'text-gray-400 hover:text-primary transition'
                    }
                  >
                    {user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
                  </NavLink>
                </li>
              </ul>

              <PrimaryButton
                text={'Book A Call'}
                url={'/cta'}
                className="rounded-full min-w-32 shadow-lg shadow-primary/40"
              />
            </nav>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-3xl text-primary cursor-pointer"
            >
              <CgMenuMotion />
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          BACKDROP (ONLY WHEN OPEN)
      ========================= */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/80 z-999" onClick={() => setMenuOpen(false)} />
      )}

      {/* =========================
          MOBILE DRAWER
      ========================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] z-999
        p-5 transform transition-transform duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 bg-bg/60 backdrop-blur-2xl rounded-2xl border border-border h-fit">
          <div className="flex justify-between items-center pb-8">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-xl text-primary"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-6 uppercase font-medium pb-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? 'text-primary' : 'text-gray-400')}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to={profileLink}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'text-primary' : 'text-gray-400')}
              >
                {user ? (user.role === 'admin' ? 'ADMIN' : 'PROFILE') : 'LOGIN'}
              </NavLink>
            </li>
          </ul>

          <PrimaryButton
            text={'Book A Call'}
            url={'/cta'}
            size="lg"
            className="shadow-lg rounded-md shadow-primary/40"
          />
        </div>
      </aside>
    </>
  );
};

export default Navbar;
