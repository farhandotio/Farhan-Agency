import React from "react";
import HeroSection from "../components/agency/HeroSection";
import ServiceSection from "../components/agency/ServiceSection";
import HowToWork from "../components/agency/HowToWork";
import ProjectSection from "../components/agency/ProjectSection";
import Testimonials from "../components/agency/Testimonials";

const Agency = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <HowToWork />
      <ProjectSection />
      <Testimonials />
    </>
  );
};

export default Agency;
