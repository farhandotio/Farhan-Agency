// ServiceDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Component for the Service Details Page
const ServiceDetailsPage = () => {
  const { slug } = useParams(); // Get slug from URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch service data from API
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `https://farhan-agency.onrender.com/api/services/${slug}`
        );
        setService(data.data || data);
        console.log(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Service not found!");
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-mutedText">Loading...</div>
    );
  }

  if (error || !service) {
    return (
      <div className="text-center py-20 text-lg text-red-500">{error}</div>
    );
  }

  // --- Reusable Components for Structure ---
  const HeroSection = ({ title, description, imageUrl }) => (
    <div className="bg-bg pt-30 pb-12 min-h-[600px] flex justify-between items-center">
      <div className="px-5 sm:px-7 lg:px-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text mb-4">
            {title}
          </h2>
          <p className="mt-4 text-xl lg:text-2xl text-mutedText">
            {description}
          </p>
          <Link to="/contact">
            <button className="mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary cursor-pointer hover:bg-hoverSecondary">
              Start A Project Now
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            className="w-full aspect-video object-cover rounded-lg shadow-xl"
            src={imageUrl}
            alt={title}
          />
        </div>
      </div>
    </div>
  );

  const OverviewCard = ({ title, description }) => (
    <div className="p-5 bg-cardBg rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-mutedText text-sm">{description}</p>
    </div>
  );

  const FeatureItem = ({ iconName, title, features }) => (
    <div className="border border-border rounded-lg p-5 bg-bg shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-xl text-secondary">⭕</span>
        <h4 className="text-lg font-semibold text-text">{title}</h4>
      </div>
      <ul className="space-y-2 text-mutedText">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">✔</span>
            <p className="text-sm">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const StepProcessItem = ({ stepNumber, title, description }) => (
    <div className="flex items-start mb-6">
      <div className="shrink-0">
        <div className="h-8 w-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
          {stepNumber}
        </div>
      </div>
      <div className="ml-4 pt-1">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-1 text-mutedText text-sm">{description}</p>
      </div>
    </div>
  );

  const TimelineCard = ({
    projectType,
    duration,
    inclusions,
    isHighlighted,
  }) => (
    <div
      className={`flex flex-col p-5 rounded-lg border-2 ${
        isHighlighted
          ? "border-primary bg-cardBg shadow-lg scale-105"
          : "border-border bg-bg"
      } transition-transform duration-300 ease-in-out text-center`}
    >
      <div className="text-lg font-bold mb-2">
        <span
          className={`text-2xl ${isHighlighted ? "text-primary" : "text-text"}`}
        >
          {duration}
        </span>
      </div>
      <p
        className={`text-sm font-semibold ${
          isHighlighted ? "text-primary" : "text-mutedText"
        } uppercase tracking-wider mb-4`}
      >
        {projectType}
      </p>
      <ul className="space-y-1 text-sm text-mutedText">
        {inclusions.map((item, index) => (
          <li key={index} className="flex items-center justify-center">
            <span className="text-primary mr-1 text-xs">●</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-bg">
      <HeroSection
        title={service.title}
        description={service.heroDescription}
        imageUrl={service.heroImageUrl}
      />

      <div className="px-5 sm:px-7 lg:px-10 py-12">
        {/* Service Overview */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-4">
              Service Overview
            </h2>
            <p className="text-lg text-mutedText mb-8">
              {service.serviceOverview.description}
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {service.serviceOverview.offerings.map((offering, index) => (
                <OverviewCard
                  key={index}
                  title={offering.title}
                  description={offering.description}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 bg-bg p-5 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-text mb-4">
              Key Technologies
            </h3>
            <ul className="space-y-3">
              {service.serviceOverview.keyTechnologies.map((tech, index) => (
                <li key={index} className="flex items-center text-mutedText">
                  <span className="text-secondary mr-3 text-sm">▶</span> {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-12 border-border" />

        {/* What's Included */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-text">What's Included</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {service.whatsIncluded.map((section, index) => (
            <FeatureItem
              key={index}
              title={section.sectionTitle}
              features={section.features}
              iconName={section.iconName}
            />
          ))}
        </div>

        <hr className="my-12 border-border" />

        {/* Step-by-Step Process */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-text">
            Step-by-Step Process
          </h2>
        </div>
        <div>
          {service.processSteps.map((step) => (
            <StepProcessItem
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        <hr className="my-12 border-border" />

        {/* Timeline Estimate */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-text">
            Timeline Estimate
          </h2>
          <p className="mt-2 text-mutedText">
            Typical duration and inclusions for each project size
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {service.timelineEstimate.map((timeline, index) => (
            <TimelineCard
              key={index}
              projectType={timeline.projectType}
              duration={timeline.duration}
              inclusions={timeline.inclusions}
              isHighlighted={index === 1} // Highlight 'Medium' project
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
