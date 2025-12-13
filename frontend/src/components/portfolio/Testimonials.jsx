import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowDown } from 'react-icons/io5';
import ReviewStar from '../common/ReviewStar';
import SectionHeader from '../common/SectionHeader';

const testimonials = [
  {
    id: 1,
    name: 'Afjal Hossain',
    role: 'Founder, TechVerse',
    image:
      'https://images.unsplash.com/photo-1585807515950-bc46d934c28b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    message:
      'Farhan transformed our outdated website into a modern, high-performing platform. The attention to detail and smooth animations were exceptional!',
    rating: 5,
    glowColor: 'primary', // Highlight specific color for the card
  },
  {
    id: 2,
    name: 'Sarah Ahmed',
    role: 'Marketing Head, PureDrop',
    image:
      'https://images.unsplash.com/photo-1543933573-1e0a7578328f?q=80&w=459&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    message:
      'Farhan understood our brand perfectly. The dark-themed design with interactive 3D bottle made PureDrop stand out. Highly recommended!',
    rating: 5,
    glowColor: 'fuchsia', // Highlight specific color for the card
  },
  {
    id: 3,
    name: 'Mohammed Rafi',
    role: 'CEO, DripNest',
    image:
      'https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    message:
      'Working with Farhan was smooth and professional. Every section felt intentional and visually striking.',
    rating: 4.8,
    glowColor: 'primary', // Highlight specific color for the card
  },
];

const Testimonials = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative pt-15 pb-20 lg:pb-30 p-5 md:p-7 lg:p-10 bg-bg text-white overflow-hidden" // text-text changed to text-white
    >
      {/* 🌟 Background Lighting Effect Layer */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        {/* Soft radial linear for central focus */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-[1900px] mx-auto">
        <SectionHeader
          title={
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-primary">
              What clients say about me
            </span>
          }
          description="Genuine feedback from clients and founders who trusted me to craft
            their product websites and digital experiences."
          size="xl"
          className="text-center"
        />

        {/* Grid: Uses flex overflow for horizontal scroll effect */}
        <div className="flex gap-6 mt-12 flex-nowrap overflow-x-auto pb-5 hidden-scrollbar">
          {testimonials.map((t, index) => (
            <article
              key={t.id}
              className={`
                relative group shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] overflow-hidden 
                bg-cardBg border border-border p-6 rounded-2xl 
                shadow-md 
                transition-all duration-300 ease-in-out
                ${
                  t.glowColor === 'primary'
                    ? 'hover:shadow-primary/30'
                    : 'hover:shadow-secondary/30'
                } 
              `}
            >
              {/* --- 💡 Dynamic Neon Corner Accent --- */}
              <div
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  t.glowColor === 'primary' ? 'bg-primary' : 'bg-secondary'
                } 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg ${
                    t.glowColor === 'primary' ? 'shadow-primary/80' : 'shadow-fuchsia-500/80'
                  }`}
              ></div>

              <div className="flex max-md:flex-col items-start gap-5">
                <img
                  src={t.image}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  className={`w-16 h-16 rounded-full object-cover ring-2 
                    ${t.glowColor === 'primary' ? 'ring-primary/50' : 'ring-fuchsia-500/50'}
                    group-hover:ring-offset-2 ring-offset-bg transition-all duration-300`}
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors duration-300">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{t.role}</p>
                    </div>

                    <div className="flex flex-col items-end max-md:hidden">
                      {/* ReviewStar should use the appropriate color for the stars */}
                      <ReviewStar
                        value={t.rating}
                        label={t.name}
                        colorClass={t.glowColor === 'primary' ? 'text-primary' : 'text-secondary'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:hidden mt-2">
                    <ReviewStar
                      value={t.rating}
                      label={t.name}
                      colorClass={t.glowColor === 'primary' ? 'text-primary' : 'text-secondary'}
                    />
                  </div>

                  {/* Message: Increased font size for better readability */}
                  <p className="mt-5 text-gray-300 max-w-50 md:max-w-sm text-base leading-relaxed italic">
                    <span
                      className={`text-2xl font-serif mr-1 ${
                        t.glowColor === 'primary' ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      “
                    </span>
                    {t.message}
                    <span
                      className={`text-2xl font-serif ml-1 ${
                        t.glowColor === 'primary' ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      ”
                    </span>
                  </p>
                </div>
              </div>

              {/* Decorative quote mark (Hidden in the background, adjusted opacity and position) */}
              <svg
                className="absolute right-4 bottom-4 w-12 h-12 text-[rgba(255,255,255,0.06)] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 7a3.5 3.5 0 00-3.5 3.5V14H12V10.5A3.5 3.5 0 009.5 7zm8 0a3.5 3.5 0 00-3.5 3.5V14H20V10.5A3.5 3.5 0 0017.5 7z" />
              </svg>
            </article>
          ))}
        </div>

        {/* Optional: Add a subtle scroll indicator for overflow-x-auto */}
        <p className="text-center text-gray-500 text-sm mt-8 animate-pulse">
          Scroll to see more reviews &rarr;
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
