import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import Skeleton from '../common/Skeleton';
import SectionHeader from '../common/SectionHeader';

const ServiceSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('https://farhan-agency-eg4k.onrender.com/api/services');
        // Maximum 5 services
        setServices((data.data || data).slice(0, 5));
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    // ... (Loading state remains the same, assuming Skeleton and Loading components handle dark theme correctly)
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
      className="relative py-16 md:py-24 overflow-hidden bg-bg" // Added relative & bg-bg
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* 🌟 Lighting Layer - Very Subtle Background Glow */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        {/* Soft, wide radial linear for central focus */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 mx-auto px-5 sm:px-7 lg:px-10 max-w-[1900px]">
        {/* Header Section */}
        <SectionHeader
          title={
            <span className="bg-clip-text text-transparent bg-linear-to-r from-text to-primary">
              What I Do
            </span>
          }
          description="I build modern web applications with clean, scalable code. From
            responsive frontend interfaces to robust backend systems, I help
            bring digital ideas to life."
          size="xl"
          className="text-center mb-16"
        />

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6" role="list">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={service._id}
              className={`
                relative p-6 rounded-xl transition duration-500 ease-in-out cursor-pointer
                bg-cardBg border border-border 
                shadow-xl shadow-gray-900/50 
                hover:shadow-primary/30 hover:bg-hoverCardBg 
                group
                ${index === 0 && 'grid md:col-span-2'} 
                ${index === 1 && 'grid md:col-span-2'} 
                ${index === 2 && 'grid md:col-span-3'} 
                ${index === 3 && 'grid md:col-span-3'} 
                ${index === 4 && 'grid md:col-span-4'}
              `}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="hasOfferCatalog"
              role="listitem"
            >
              {/* 💡 Neon Corner Accent (Optional) */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-border text-3xl overflow-hidden">
                <img
                  src={service.heroImageUrl}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                  itemProp="image"
                  className="rounded-lg h-full w-full object-cover transition duration-500 group-hover:scale-105" // Hover scale for image
                />
              </div>

              <h3
                className="text-2xl font-semibold text-text mb-3 group-hover:text-primary transition duration-300"
                itemProp="name"
              >
                {service.title}
              </h3>

              <p className="text-gray-400 leading-relaxed" itemProp="description">
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
