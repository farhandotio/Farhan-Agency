import React from "react";
import { FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import SectionHeader from "../common/SectionHeader";

const ProcessHero = () => {
  return (
    <section className="bg-bg text-text pb-30">
      <SectionHeader
        title="Our Work Process"
        description="A transparent, collaborative journey from concept to delivery. Every
          step designed for quality, clarity, and client satisfaction."
        size="xl"
      />

      <div className="">
        <div className="flex items-center space-x-6 md:space-x-10 flex-wrap">
          {/* 1. 4-8 Week Timeline */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiClock className="size-5 md:size-6 text-primary mr-2" />
            <span>1-4 Week Timeline</span>
          </div>

          {/* 2. Collaborative Approach */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiUsers className="size-5 md:size-6 text-primary mr-2" />
            <span>Collaborative Approach</span>
          </div>

          {/* 3. Quality Guaranteed */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiCheckCircle className="size-5 md:size-6 text-primary mr-2" />
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessHero;
