import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const data = {
  brand: {
    name: "Farhan Agency",
    tagline: "Modern UI, fast experiences",
  },
  navColumns: [
    {
      title: "Services",
      links: [
        { title: "Web Design", href: "/services/web-design" },
        { title: "E-commerce", href: "/services/ecommerce" },
        { title: "UI / UX", href: "/services/ui-ux" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Projects", href: "/projects" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Contact", href: "/contact" },
        { title: "Testimonials", href: "/reviews" },
        { title: "Case Studies", href: "/case-studies" },
      ],
    },
  ],
  contact: {
    address: "Dhaka, Bangladesh",
    email: "hello@farhanagency.com",
    phone: "+880 1234-567890",
    hours: "Mon–Fri, 9:00–18:00 (GMT+6)",
  },
  social: [
    {
      id: "instagram",
      network: "instagram",
      href: "https://www.instagram.com/farhansadik02/",
      ariaLabel: "Follow Farhan Agency on instagram",
    },
    {
      id: "linkedin",
      network: "LinkedIn",
      href: "https://www.linkedin.com/in/mdsadikdev/",
      ariaLabel: "Follow Farhan Agency on LinkedIn",
    },
    {
      id: "github",
      network: "GitHub",
      href: "https://github.com/farhandotio",
      ariaLabel: "View Farhan Agency on GitHub",
    },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.brand.name,
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://yourdomain.com",
    logo: data.brand.logo,
    sameAs: data.social.map((s) => s.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: data.contact.phone,
        contactType: "customer service",
        email: data.contact.email,
        hoursAvailable: data.contact.hours,
        availableLanguage: ["English", "Bengali"],
      },
    ],
  };

  return (
    <footer className="max-w-[1900px] mx-auto text-mutedText">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-5 md:px-7 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div className="space-y-4 md:col-span-2">
            <Link
              to="/"
              aria-label={`${data.brand.name} - Home`}
              className="inline-flex items-center gap-3"
            >
              <div>
                <p className="font-bold text-xl text-text uppercase">
                  {data.brand.name}
                </p>
                <p className="text-sm text-mutedText">{data.brand.tagline}</p>
              </div>
            </Link>

            <p className="text-sm text-mutedText">
              We craft fast, accessible websites and beautiful UI systems for
              startups and brands.
            </p>

            <div className="mt-4 flex items-center gap-5" aria-hidden="true">
              {/* Small social icons */}
              {data.social.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="text-3xl rounded hover:text-hoverPrimary transition"
                >
                  {/* simple svg icons */}
                  {s.id === "instagram" && <FaInstagram />}
                  {s.id === "linkedin" && <CiLinkedin />}
                  {s.id === "github" && <AiOutlineGithub />}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {data.navColumns.map((col) => (
            <div
              key={col.title}
              aria-labelledby={`footer-${col.title.toLowerCase()}`}
            >
              <h4
                id={`footer-${col.title.toLowerCase()}`}
                className="text-sm font-semibold text-text mb-3 uppercase"
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.href}
                      className="text-sm text-mutedText hover:text-text transition"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.04)] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} {data.brand.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {data.legal.map((l) => (
                <Link
                  key={l.title}
                  to={l.href}
                  className="text-sm text-mutedText hover:text-white"
                >
                  {l.title}
                </Link>
              ))}
            </div>

            <div className="text-sm text-gray-400">
              Made with care in Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
