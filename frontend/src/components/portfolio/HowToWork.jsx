import React, { useState } from "react";
import SectionHeader from "../common/SectionHeader";

// Steps for your development process
const steps = [
  {
    id: 1,
    step: 'Step 1',
    iconName: 'document',
    iconBgColor: 'bg-teal-500',
    title: 'Project Discovery & Goal Alignment',
    week: 'Phase 1',
    description:
      "I begin by understanding the project's goals, target users, and business context so the final product solves the right problems.",
    deliverables: [
      'Project brief',
      'User personas',
      'Competitive analysis',
      'Clear project objectives',
    ],
    collaboration: {
      main: 'Kickoff Call',
      note: 'I align requirements, priorities and success metrics with the client',
    },
    template: {
      text: 'Download Discovery Template',
      link: '/downloads/discovery-template.pdf',
    },
    type: 'standard',
  },
  {
    id: 2,
    step: 'Step 2',
    iconName: 'squares',
    iconBgColor: 'bg-orange-500',
    title: 'Wireframe Architecture',
    week: 'Phase 1',
    description:
      'I create structural wireframes that show page layouts, content priority, and the main user flows before visual design begins.',
    deliverables: [
      'Low-fidelity wireframes',
      'Site structure map',
      'Content layout plan',
      'Initial interaction outline',
    ],
    collaboration: {
      main: 'Wireframe Review',
      note: 'We iterate on flow and information hierarchy with client feedback',
    },
    template: {
      text: 'Download Wireframe Template',
      link: '/downloads/wireframe-template.pdf',
    },
    type: 'standard',
  },
  {
    id: 3,
    step: 'Step 3',
    iconName: 'puzzle',
    iconBgColor: 'bg-purple-500',
    title: 'High-Fidelity UI Design',
    week: 'Phase 2',
    description:
      'I translate the approved structure into pixel-perfect UI screens that reflect brand voice, visual hierarchy and accessible patterns.',
    deliverables: [
      'High-fidelity screens',
      'Color and typography system',
      'Micro-interaction previews',
      'Reusable design components',
    ],
    collaboration: {
      main: 'Design Review',
      note: 'I refine visuals based on your feedback until the UI is ready for development',
    },
    template: {
      text: 'Download UI System',
      link: '/downloads/ui-system.pdf',
    },
    type: 'standard',
  },
  {
    id: 4,
    step: 'Step 4',
    iconName: 'rocket',
    iconBgColor: 'bg-green-500',
    title: 'Frontend Development',
    week: 'Phase 2',
    description:
      'I implement the UI into a responsive, component-based frontend using modern frameworks and best practices for performance.',
    deliverables: [
      'Component-based architecture',
      'Responsive layouts',
      'Animation & interaction setup',
      'Optimized frontend code',
    ],
    collaboration: {
      main: 'Development Sync',
      note: 'I sync with stakeholders to validate features and adjust priorities during development',
    },
    template: {
      text: 'Download Code Standards',
      link: '/downloads/code-standards.pdf',
    },
    type: 'standard',
  },
  {
    id: 5,
    step: 'Step 5',
    iconName: 'flow-chart',
    iconBgColor: 'bg-blue-500',
    title: 'Backend & API Integration',
    week: 'Phase 3',
    description:
      'I integrate backend services and APIs, implement data models, and ensure secure, reliable communication between client and server.',
    deliverables: [
      'API endpoint setup',
      'Database integration',
      'Server configuration',
      'Core feature logic development',
    ],
    collaboration: {
      main: 'Tech Review Meeting',
      note: 'I validate API contracts and integration points with you or your backend team',
    },
    template: {
      text: 'Download API Structure',
      link: '/downloads/api-structure.pdf',
    },
    type: 'standard',
  },
  {
    id: 6,
    step: 'Step 6',
    iconName: 'api',
    iconBgColor: 'bg-purple-500',
    title: 'Testing & Quality Assurance',
    week: 'Phase 3',
    description:
      'I run thorough testing across functionality, performance and devices to make sure the product works reliably in real conditions.',
    deliverables: [
      'Functionality testing',
      'Performance optimization',
      'Cross-device compatibility',
      'Bug fixes and improvements',
    ],
    collaboration: {
      main: 'QA Validation',
      note: 'I perform final checks and share test reports for transparency',
    },
    template: {
      text: 'Download QA Checklist',
      link: '/downloads/qa-checklist.pdf',
    },
    type: 'standard',
  },
  {
    id: 7,
    step: 'Step 7',
    iconName: 'credit-card',
    iconBgColor: 'bg-yellow-500',
    title: 'Deployment & Delivery',
    week: 'Phase 4',
    description:
      'I deploy the project to a secure production environment, hand over documentation, and provide post-launch support to ensure a smooth launch.',
    paymentStructure: [
      { percentage: '10% Upfront', description: 'Project initiation' },
      { percentage: '90% On Delivery', description: 'Final handover' },
    ],
    deliveryProcess: [
      'Live deployment',
      'Documentation package',
      'Performance tuning',
      '30-day post-launch support',
    ],
    qualityAssurance:
      'I deliver tested, production-ready code and assist with monitoring and quick fixes after launch.',
    template: {
      text: 'Download Delivery Docs',
      link: '/downloads/delivery-docs.pdf',
    },
    type: 'delivery',
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
        <SectionHeader
          title="How I Work"
          description="I follow a transparent and structured development process, from planning to delivery, to ensure every project meets quality standards."
          size="lg"
        />

        {/* Accordion Process List */}
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
                  title={`Toggle details for ${step.title}`}
                >
                  <div className="flex-1 items-center">
                    <h3
                      id={`step-title-${step.id}`}
                      className="text-lg sm:text-3xl font-bold text-text tracking-wide"
                    >
                      {`${step.id}. ${step.title}`}
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
