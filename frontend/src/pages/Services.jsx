// Services.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import ServiceCard from "../components/services/ServiceCard";
import Loading from "../components/common/Loading";
import Skeleton from "../components/common/Skeleton";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          "https://farhan-agency-wryw.onrender.com/api/services"
        );
        setServices(data.data || data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Build JSON-LD only after services are loaded
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Services by MD Farhan Sadik",
    provider: {
      "@type": "Person",
      name: "MD Farhan Sadik",
      url: "https://farhansadik.vercel.app",
      sameAs: [
        "https://github.com/farhandotio",
        "https://www.linkedin.com/in/mdsadikdev",
      ],
    },
    description:
      "Frontend, Backend and Fullstack development services by MD Farhan Sadik — building modern, scalable web applications with performance and accessibility in mind.",
    serviceType: "Fullstack Web Development",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services Catalog",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title || s.name || `Service ${i + 1}`,
          description: s.description || s.heroDescription || "",
          url: s.slug
            ? `https://farhansadik.vercel.app/services/${s.slug}`
            : s.url || "https://farhansadik.vercel.app/services",
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-bg py-30 px-5 sm:px-7 lg:px-10">
      {/* SEO / Social Metadata */}
      <Helmet>
        <title>Services I Offer — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Services I offer: Frontend, Backend, and Fullstack development. I build modern, responsive, and scalable web applications tailored to client needs."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, frontend development, backend development, fullstack developer, web development services, React, Node.js"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* Canonical */}
        <link rel="canonical" href="https://farhansadik.vercel.app/services" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Services I Offer — MD Farhan Sadik"
        />
        <meta
          property="og:description"
          content="Frontend, Backend and Fullstack development services by MD Farhan Sadik. I build modern, scalable web applications optimized for performance and accessibility."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://farhansadik.vercel.app/services"
        />
        <meta
          property="og:image"
          content="https://farhansadik.vercel.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Services I Offer — MD Farhan Sadik"
        />
        <meta
          name="twitter:description"
          content="Hire MD Farhan Sadik for frontend, backend or fullstack web development. Modern, maintainable and scalable solutions."
        />
        <meta
          name="twitter:image"
          content="https://farhansadik.vercel.app/og-image.png"
        />

        {/* JSON-LD structured data */}
        {!loading && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <header className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-8">
          Services I Offer
        </h1>
        <p className="text-xl max-w-4xl text-mutedText" itemProp="description">
          I provide frontend, backend, and fullstack development services —
          building modern, scalable web applications optimized for performance,
          accessibility, and maintainability.
        </p>
      </header>

      {loading ? (
        <div className="min-h-[300px] flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg">
              <Skeleton width="100%" height="180px" rounded />
              <Skeleton width="80%" height="20px" className="mt-4" />
              <Skeleton width="60%" height="20px" className="mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service._id || service.slug || service.title}
                  service={service}
                />
              ))
            ) : (
              <p className="text-mutedText">
                No services available at the moment.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
