import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import Skeleton from "../common/Skeleton";

const ServiceSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          "https://farhan-agency-wryw.onrender.com/api/services"
        );
        // Maximum 5 services
        setServices((data.data || data).slice(0, 5));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex flex-col gap-6 px-5 sm:px-7 lg:px-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg">
            <Skeleton width="100%" height="180px" rounded />
            <Skeleton width="80%" height="20px" className="mt-4" />
            <Skeleton width="60%" height="20px" className="mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      className="py-16 md:py-24 bg-bg"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="mx-auto px-5 sm:px-7 lg:px-10">
        {/* Header Section */}
        <header className="mb-16 md:mb-24 text-center lg:text-left">
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-8"
          >
            What I Do
          </h2>
          <p
            className="text-xl max-w-4xl text-mutedText mx-auto lg:mx-0"
            itemProp="description"
          >
            I build modern web applications with clean, scalable code. From
            responsive frontend interfaces to robust backend systems, I help
            bring digital ideas to life.
          </p>
        </header>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5" role="list">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={service._id}
              className={`bg-cardBg p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-border hover:bg-hoverCardBg ${
                index === 0 && "grid md:col-span-2"
              } ${index === 1 && "grid md:col-span-2"} ${
                index === 2 && "grid md:col-span-3"
              } ${index === 3 && "grid md:col-span-3"} ${
                index === 4 && "grid md:col-span-4"
              }`}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="hasOfferCatalog"
              role="listitem"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-indigo-50 text-3xl">
                <img
                  src={service.heroImageUrl}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                  itemProp="image"
                  className="rounded-sm h-full w-full object-cover"
                />
              </div>

              <h3
                className="text-2xl font-semibold text-text mb-3"
                itemProp="name"
              >
                {service.title}
              </h3>

              <p
                className="text-mutedText leading-relaxed"
                itemProp="description"
              >
                {service.heroDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <meta
        name="description"
        content="MD Farhan Sadik offers Frontend, Backend, and Fullstack Development — building modern, scalable web applications and digital products for clients and personal projects."
      />
    </section>
  );
};

export default React.memo(ServiceSection);
