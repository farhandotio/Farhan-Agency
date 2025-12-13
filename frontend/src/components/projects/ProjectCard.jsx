import React from 'react';
import { IoArchiveOutline, IoArrowBackSharp, IoArrowForward, IoArrowRedoCircle, IoArrowUpOutline } from 'react-icons/io5';
import PrimaryButton from '../common/PrimaryButton';

const ProjectCard = ({ project }) => {
  const headingId = `project-heading-${project.title.replace(/\s+/g, '-')}`;

  return (
    <section aria-labelledby={headingId} className="p-5 md:p-10 last:border-none">
      {/* Header section */}

      {/* Main Layout: Image Left + Content Right */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* LEFT — Image */}
        {/* --- LIGHTING UPDATE 3: Image Frame Glow --- */}
        <div className="w-full md:w-[35%] rounded-xl overflow-hidden bg-cardBg border border-border shadow-md shadow-primary/50 transition-shadow duration-300 hover:shadow-fuchsia-500/30">
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            loading="lazy"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>

        {/* RIGHT — Description + Tech Stack */}
        <div className="w-full md:w-[65%]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-5 mb-12">
            {/* --- LIGHTING UPDATE 1: Header Gradient --- */}
            <h2
              id={headingId}
              className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-text to-cyan-400"
            >
              {project.title}
            </h2>
            <div className="w-fit">
              <PrimaryButton
                text={'Live Link'}
                icon={IoArrowRedoCircle}
                size="md"
                href={project.liveUrl}
                aria-label={`Open ${project.title} live site`}
                className="rounded-full shadow-md shadow-primary"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-text to-secondary my-5">
            Tech Stacks:
          </h3>
          <div className="space-y-6 space-x-3">
            {project.keyInsights?.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center p-3 rounded-lg border border-fuchsia-700/50 transition-all duration-300 hover:border-secondary/80 hover:shadow-md hover:shadow-fuchsia-500/20 bg-cardBg/30 backdrop-blur-2xl"
              >
                <p className="text-sm font-medium text-gray-300 leading-none max-w-xs">
                  {item.insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg md:text-xl leading-relaxed text-mutedText mt-10">
        <b> Summary: </b>
        {project.description}
      </p>
    </section>
  );
};

export default ProjectCard;
