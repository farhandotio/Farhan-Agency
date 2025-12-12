import React from 'react';
import { Helmet } from 'react-helmet';
import ProcessCard from '../components/process/ProcessCard';
import ProcessHero from '../components/process/ProcessHero';

const processSteps = [
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

const Process = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fullstack Web Development Process',
    provider: {
      '@type': 'Person',
      name: 'MD Farhan Sadik',
      url: 'https://farhansadik.vercel.app',
    },
    description:
      'I provide a step-by-step web development process covering discovery, wireframes, UI design, frontend and backend development, testing, and delivery.',
    serviceType: 'Fullstack Web Development',
    hasOfferCatalog: processSteps.map((step) => ({
      '@type': 'Offer',
      name: step.title,
      description: step.description,
      itemOffered: {
        '@type': 'CreativeWork',
        name: step.title,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>My Web Development Process — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Explore my web development process from discovery to deployment — wireframes, UI design, frontend and backend development, testing and delivery."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, web development, my process, discovery, wireframes, UI design, frontend, backend, QA, deployment"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* Open Graph */}
        <meta property="og:title" content="My Web Development Process — MD Farhan Sadik" />
        <meta
          property="og:description"
          content="Step-by-step web development process by MD Farhan Sadik: discovery, wireframes, UI, frontend, backend, testing and delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://farhansadik.vercel.app/process" />
        <meta property="og:image" content="https://farhansadik.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Web Development Process — MD Farhan Sadik" />
        <meta
          name="twitter:description"
          content="My end-to-end web development workflow: plan, design, build, test and launch."
        />
        <meta name="twitter:image" content="https://farhansadik.vercel.app/og-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
    </>
  );
};

export default Process;
