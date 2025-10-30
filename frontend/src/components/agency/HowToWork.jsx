import React, { useState } from "react";

// The data structure remains the same
const steps = [
  {
    id: 1,
    shortTitle: "SRS",
    longTitle: "Requirements & Planning",
    description:
      "We gather project goals, define scope, and create a detailed plan for execution. This phase includes creating a detailed Software Requirements Specification (SRS) document, setting clear milestones, and allocating resources.",
  },
  {
    id: 2,
    shortTitle: "Wireframe",
    longTitle: "Design & Prototype",
    description:
      "We design the layout, visuals, and user flow to define your product’s structure. This involves creating wireframes, mockups, and a clickable prototype to ensure the user experience (UX) meets your strategic goals.",
  },
  {
    id: 3,
    shortTitle: "MVP",
    longTitle: "Prototype & Review",
    description:
      "We build a functional demo version (Minimum Viable Product) for client testing and early feedback. The MVP focuses on core features, allowing for rapid iteration and validation before full-scale development.",
  },
  {
    id: 4,
    shortTitle: "Payment",
    longTitle: "50% Upfront Payment",
    description:
      "After MVP approval, 50% payment confirms the start of full development. This financial commitment allows us to scale the development team and commence the rigorous coding phase.",
  },
  {
    id: 5,
    shortTitle: "Development",
    longTitle: "Build & Testing",
    description:
      "We develop the full product, optimize performance, and ensure quality testing. This includes backend engineering, frontend implementation, continuous integration, and exhaustive quality assurance (QA).",
  },
  {
    id: 6,
    shortTitle: "Deployment",
    longTitle: "Launch & Final Payment",
    description:
      "We deploy the project live, deliver all source files, and receive the final 50% payment. Post-launch support and monitoring are initiated to ensure stability and smooth operation.",
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
