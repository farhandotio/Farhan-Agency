// ReviewStar.jsx
import React from "react";

/**
 * ReviewStar
 * Props:
 *  - value: number (rating, e.g., 5 or 4.8)
 *  - label?: string (optional context shown to screen readers, e.g., reviewer name or product)
 *  - className?: string (optional extra wrapper classes)
 *
 * Keeps the same visual style as your previous Rating component (full, half, empty stars),
 * and adds aria-label + sr-only text for SEO / accessibility.
 */
const Star = ({ filled = true }) => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    className={filled ? "text-yellow-400" : "text-gray-600"}
  >
    <path
      d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 15.77 4.82 17.44l.99-5.77L1.62 7.59l5.79-.84L10 1.5z"
      stroke="currentColor"
      strokeWidth="0.3"
    />
  </svg>
);

const ReviewStar = ({ value = 5, label = "", className = "" }) => {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5 && fullStars < 5;
  const total = 5;

  const ariaLabel = `${label ? label + " — " : ""}Rated ${value} out of 5`;

  return (
    <div
      className={`inline-flex items-center md:gap-1 gap-0.5 ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Invisible text for screen readers & SEO */}
      <span className="sr-only">{ariaLabel}</span>

      {/* Stars */}
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        if (idx <= fullStars) return <Star key={i} filled />;
        if (idx === fullStars + 1 && hasHalf) {
          return (
            <span key={i} className="relative inline-block w-4 h-4" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-400 absolute left-0 top-0"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`half-grad-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 15.77 4.82 17.44l.99-5.77L1.62 7.59l5.79-.84L10 1.5z"
                  fill={`url(#half-grad-${i})`}
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 absolute left-0 top-0"
                aria-hidden="true"
              >
                <path
                  d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 15.77 4.82 17.44l.99-5.77L1.62 7.59l5.79-.84L10 1.5z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </svg>
            </span>
          );
        }
        return <Star key={i} filled={false} />;
      })}

      {/* Numeric value (keeps your current design) */}
      <span className="text-sm ml-1 md:ml-2 text-mutedText font-medium" aria-hidden="true">
        {value}
      </span>
    </div>
  );
};

export default ReviewStar;
