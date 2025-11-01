import React, { useState } from "react";

// The data structure remains the same
const steps = [
  {
    id: 1,
    shortTitle: "SRS",
    longTitle: "Requirements & Planning",
    description:
      "Collect project goals, scope and technical requirements; produce a complete Software Requirements Specification (SRS) with architecture overview, feature specs and DB schema.",
  },
  {
    id: 2,
    shortTitle: "Wireframe",
    longTitle: "Low-Fidelity Wireframes",
    description:
      "Create structural blueprints (Figma/Sketch) showing layout, navigation and information architecture to validate structure and user journeys.",
  },
  {
    id: 3,
    shortTitle: "Prototype",
    longTitle: "Interactive Prototype",
    description:
      "Build a high-fidelity, clickable prototype with interactions, animations and user-testing scenarios for usability validation and design feedback.",
  },
  {
    id: 4,
    shortTitle: "MVP Plan",
    longTitle: "MVP Development Plan",
    description:
      "Define core features, prioritize scope and set a development timeline — includes resource allocation and a launch strategy for the Minimum Viable Product.",
  },
  {
    id: 5,
    shortTitle: "User Flow",
    longTitle: "User Flow Mapping",
    description:
      "Document detailed user journeys, decision points, edge cases and error handling to optimize conversion paths and overall UX flow.",
  },
  {
    id: 6,
    shortTitle: "API Doc",
    longTitle: "API Documentation",
    description:
      "Provide comprehensive documentation for API endpoints, data structures, authentication and integration examples for developers and integrators.",
  },
  {
    id: 7,
    shortTitle: "Delivery",
    longTitle: "Payment & Delivery",
    description:
      "Define payment milestones (e.g., 50% upfront, 50% on delivery), deliver source code, deployment guidelines, docs and include a post-launch support period.",
  },
];

const HowToWork = () => {
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (id) => {
    setOpenStep(openStep === id ? null : id);
  };
  return (
    <section className="py-20 md:py-32 bg-bg" aria-labelledby="process-heading">
      <div className="mx-auto px-5 sm:px-7 lg:px-10">
        {/* Main Heading and Description */}
        <header className="mb-16 md:mb-24">
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight tracking-tight"
            title="Complete software development process step-by-step"
          >
            Complete development process
          </h2>
          <p className="text-xl text-mutedText max-w-4xl">
            Our comprehensive, transparent development lifecycle ensures
            successful project delivery from initial concept to final launch.
          </p>
        </header>

        {/* --- Accordion Process List --- */}
        <div className="divide-y divide-border">
          {steps.map((step) => {
            const isOpen = openStep === step.id;

            return (
              <div key={step.id}>
                <button
                  className="w-full text-left py-8 md:py-10 flex justify-between items-start cursor-pointer hover:bg-hoverCardBg focus:outline-none hover:px-5 transition-all duration-300"
                  onClick={() => toggleStep(step.id)}
                  aria-expanded={isOpen}
                  aria-controls={`step-content-${step.id}`}
                  aria-labelledby={`step-title-${step.id}`}
                  title={`Toggle details for ${step.longTitle}`}
                >
                  <div className="flex-1 items-center">
                    <h3
                      id={`step-title-${step.id}`}
                      className="text-lg sm:text-3xl font-bold text-text tracking-wide"
                    >
                      {`${step.id}. ${step.longTitle}`}
                    </h3>
                  </div>

                  <div className="md:p-1">
                    <svg
                      className={`w-6 h-6 text-text transform transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </button>

                <div
                  id={`step-content-${step.id}`}
                  role="region"
                  aria-labelledby={`step-title-${step.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-96 opacity-100 pb-8 md:pb-10"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-lg text-mutedText font-light pl-4 pt-2 md:pt-4 max-w-6xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToWork;
