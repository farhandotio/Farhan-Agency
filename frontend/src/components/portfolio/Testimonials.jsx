import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowDown } from 'react-icons/io5';
import ReviewStar from '../common/ReviewStar';
import SectionHeader from '../common/SectionHeader';

const testimonials = [
  {
    id: 1,
    name: 'Afjal Hossain',
    role: 'Founder, TechVerse Solutions',
    message:
      'Farhan didn’t just redesign our website, he restructured the entire frontend for performance and scalability. Page load time dropped significantly, and the UI finally feels premium and intentional.',
    rating: 5,
    glowColor: 'primary',
  },
  {
    id: 2,
    name: 'Sarah Ahmed',
    role: 'Marketing Lead, PureDrop',
    message:
      'What impressed me most was Farhan’s understanding of brand identity. The dark UI, smooth animations, and interactive elements aligned perfectly with our product vision.',
    rating: 5,
    glowColor: 'fuchsia',
  },
  {
    id: 3,
    name: 'Rafiul Islam',
    role: 'Co-Founder, DripNest',
    message:
      'Communication was clear, timelines were respected, and every design decision had a reason behind it. The final product felt polished and production-ready.',
    rating: 4.9,
    glowColor: 'primary',
  },
  {
    id: 4,
    name: 'Nafisa Rahman',
    role: 'Product Manager, Serve Studio',
    message:
      'Farhan’s workflow is very structured. From wireframes to final deployment, everything was transparent. It made collaboration extremely smooth.',
    rating: 5,
    glowColor: 'fuchsia',
  },
];

const Testimonials = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative py-20 lg:py-30 p-5 md:p-7 lg:p-10 text-text overflow-hidden" // text-text changed to text-text
    >
      {/* 🌟 Background Lighting Effect Layer */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        {/* Soft radial linear for central focus */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-[1900px] mx-auto">
        <SectionHeader
          title={
            <span className="bg-clip-text text-transparent bg-linear-to-r from-text to-primary">
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold leading-tight text-text group-hover:text-primary transition-colors duration-300">
                        {t.name}
                      </h3>
                      <p className="text-sm text-mutedText mt-1">{t.role}</p>
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
                  <p className="mt-5 text-mutedText max-w-50 md:max-w-sm text-base leading-relaxed italic">
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
        <p className="text-center text-mutedText text-sm mt-8 animate-pulse">
          Scroll to see more reviews &rarr;
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
