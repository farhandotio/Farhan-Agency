import React from "react";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import ReviewStar from "../common/ReviewStar";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder, TechVerse",
    image:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    message:
      "Farhan Agency transformed our outdated website into a modern, high-performing platform. The attention to detail and smooth animations were exceptional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    role: "Marketing Head, PureDrop",
    image:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "They understood our brand perfectly. The dark-themed design with interactive 3D bottle made PureDrop stand out. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mohammed Rafi",
    role: "CEO, DripNest",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "Working with Farhan was smooth and professional. Every section felt intentional and visually striking.",
    rating: 4.8,
  },
  {
    id: 4,
    name: "John Doe",
    role: "Founder, TechVerse",
    image:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    message:
      "Farhan Agency transformed our outdated website into a modern, high-performing platform. The attention to detail and smooth animations were exceptional!",
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah Ahmed",
    role: "Marketing Head, PureDrop",
    image:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "They understood our brand perfectly. The dark-themed design with interactive 3D bottle made PureDrop stand out. Highly recommended!",
    rating: 5,
  },
  {
    id: 6,
    name: "Mohammed Rafi",
    role: "CEO, DripNest",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "Working with Farhan was smooth and professional. Every section felt intentional and visually striking.",
    rating: 4.8,
  },
];

const Testimonials = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="pt-15 pb-20 lg:pb-30 p-5 md:p-7 lg:p-10 bg-bg text-text"
    >
      <div className="">
        <header className="mb-16 md:mb-24">
          <div className="flex justify-between w-full gap-2">
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-extrabold w-full"
            >
              What clients say about Farhan Agency
            </h2>
            <Link
              to={"/reviews"}
              className="flex whitespace-nowrap h-fit max-md:hidden w-fit mx-auto gap-2 bg-primary hover:bg-hoverPrimary text-text font-semibold px-6 py-3 rounded-full transition-all"
              aria-label="Contact Farhan Agency"
            >
              <span> All Reviews </span>{" "}
              <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
            </Link>
          </div>
          <p className="mt-2 text-mutedText max-w-3xl text-lg">
            Real feedback from brands and founders who trusted us to craft their
            product websites and experiences.
          </p>
        </header>

        {/* Grid: 1 col mobile, 2 md, 3 lg */}
        <div className="flex gap-5 flex-nowrap overflow-x-auto hidden-scrollbar">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="relative group shrink-0 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex max-md:flex-col items-start gap-4">
                <img
                  src={t.image}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[rgba(255,255,255,0.04)]"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold leading-none">
                        {t.name}
                      </h3>
                      <p className="text-xs md:text-sm text-mutedText">
                        {t.role}
                      </p>
                    </div>

                    <div className="flex flex-col items-end max-md:hidden">
                      <ReviewStar value={t.rating} label={t.name} />
                    </div>
                  </div>
                  <div className="flex flex-col md:hidden">
                    <ReviewStar value={t.rating} label={t.name} />
                  </div>

                  <p className="mt-4  text-mutedText max-w-50 md:max-w-sm text-sm leading-relaxed">
                    {t.message}
                  </p>
                </div>
              </div>

              {/* Decorative quote mark */}
              <svg
                className="absolute right-4 bottom-4 w-10 h-10 text-[rgba(255,255,255,0.04)]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 7a3.5 3.5 0 00-3.5 3.5V14H12V10.5A3.5 3.5 0 009.5 7zm8 0a3.5 3.5 0 00-3.5 3.5V14H20V10.5A3.5 3.5 0 0017.5 7z" />
              </svg>
            </article>
          ))}
        </div>

        {/* CTA or small note under testimonials */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to={"/reviews"}
            className="flex w-fit mx-auto gap-2 bg-primary text-text font-semibold px-6 py-3 rounded-full shadow-md hover:scale-[1.02] transition-transform"
            aria-label="Contact Farhan Agency"
          >
            <span> All Reviews </span>{" "}
            <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
