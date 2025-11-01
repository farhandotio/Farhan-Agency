import React from "react";

import ProcessCard from "../components/process/ProcessCard";
import ProcessHero from "../components/process/ProcessHero";

const processSteps = [
  // 1. Software Requirements Specification (SRS)
  {
    id: 1,
    step: "Step 1",
    iconName: "document",
    iconBgColor: "bg-teal-500",
    title: "Software Requirements Specification (SRS)",
    week: "Week 1",
    description:
      "Comprehensive documentation of your project requirements, technical specifications, and functional details to ensure clear understanding and alignment.",

    deliverables: [
      "Complete SRS document (PDF)",
      "Technical architecture overview",
      "Feature specifications",
      "Database schema design",
    ],

    collaboration: {
      main: "2 Revision Rounds",
      note: "Client review and requirement refinement",
    },

    // Download Link
    template: {
      text: "Download SRS Template",
      link: "#",
    },
    type: "standard", // কার্ডের ধরন: সাধারণ ধাপ
  },

  // 2. Low-Fidelity Wireframes
  {
    id: 2,
    step: "Step 2",
    iconName: "squares",
    iconBgColor: "bg-orange-500",
    title: "Low-Fidelity Wireframes",
    week: "Week 2",
    description:
      "Basic structural blueprints showing layout, navigation flow, and content placement without visual design elements.",

    deliverables: [
      "Wireframe files (Figma/Sketch)",
      "User journey mapping",
      "Information architecture",
      "Navigation structure",
    ],

    collaboration: {
      main: "3 Revision Rounds",
      note: "Structure and flow optimization",
    },

    template: {
      text: "Download Wireframe Kit",
      link: "#",
    },
    type: "standard",
  },

  // 3. Interactive Prototype
  {
    id: 3,
    step: "Step 3",
    iconName: "puzzle",
    iconBgColor: "bg-purple-500",
    title: "Interactive Prototype",
    week: "Week 3-4",
    description:
      "High-fidelity, clickable prototype with real interactions, animations, and user experience flows for testing and validation.",

    deliverables: [
      "Interactive Figma prototype",
      "User testing scenarios",
      "Animation specifications",
      "Design system components",
    ],

    collaboration: {
      main: "User Testing Session",
      note: "Joint usability testing and feedback",
    },

    template: null,
    type: "standard",
  },

  // 4. MVP Development Plan
  {
    id: 4,
    step: "Step 4",
    iconName: "rocket",
    iconBgColor: "bg-green-500",
    title: "MVP Development Plan",
    week: "Week 4",
    description:
      "Strategic roadmap defining core features, development phases, and launch timeline for your minimum viable product.",

    deliverables: [
      "MVP feature prioritization",
      "Development timeline",
      "Resource allocation plan",
      "Launch strategy document",
    ],

    collaboration: {
      main: "Strategy Workshop",
      note: "Feature prioritization session",
    },

    template: null,
    type: "standard",
  },

  // 5. User Flow Mapping
  {
    id: 5,
    step: "Step 5",
    iconName: "flow-chart",
    iconBgColor: "bg-blue-500",
    title: "User Flow Mapping",
    week: "Week 5",
    description:
      "Detailed user journey documentation showing every interaction, decision point, and pathway through your application.",

    deliverables: [
      "Complete user flow diagrams",
      "Edge case scenarios",
      "Error state handling",
      "Conversion optimization paths",
    ],

    collaboration: {
      main: "Flow Review Session",
      note: "Journey optimization meeting",
    },

    template: null,
    type: "standard",
  },

  // 6. API Documentation
  {
    id: 6,
    step: "Step 6",
    iconName: "api",
    iconBgColor: "bg-purple-500",
    title: "API Documentation",
    week: "Week 6",
    description:
      "Comprehensive technical documentation for all API endpoints, data structures, and integration guidelines.",

    deliverables: [
      "Complete API documentation",
      "Endpoint specifications",
      "Authentication methods",
      "Integration examples",
    ],

    collaboration: {
      main: "Technical Review",
      note: "API structure validation",
    },

    template: null,
    type: "standard",
  },

  // 7. Payment & Delivery (বিশেষ ধরনের কার্ড)
  {
    id: 7,
    step: "Step 7",
    iconName: "credit-card",
    iconBgColor: "bg-green-500",
    title: "Payment & Delivery",
    week: "Week 7-8",
    description:
      "Structured payment schedule and comprehensive delivery process ensuring quality and client satisfaction.",

    paymentStructure: [
      {
        percentage: "50% Upfront",
        description: "Project Initiation",
      },
      {
        percentage: "50% on Delivery",
        description: "Final Handover",
      },
    ],

    deliveryProcess: [
      "Complete source code delivery",
      "Documentation package",
      "Deployment guidelines",
      "30-day support period",
    ],

    qualityAssurance:
      "Final delivery includes comprehensive testing, code review, and performance optimization.",

    template: null,
    type: "delivery",
  },
];

export const Process = () => {
  return (
    <div className="px-5 md:px-7 lg:px-10 py-30">
      <ProcessHero />
      <section className="space-y-12">
        {processSteps.map((stepData, index) => (
          <ProcessCard
            key={stepData.id}
            stepData={stepData}
            isLast={index === processSteps.length - 1}
          />
        ))}
      </section>
    </div>
  );
};

export default Process;
