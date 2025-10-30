import React from "react";
import { IoArrowDown } from "react-icons/io5";

const ProjectCard = ({ project }) => {
  const headingId = `project-heading-${project.title}`;

  return (
    <section aria-labelledby={headingId} className="mb-30">
      <div className="w-full">
        <div className="flex justify-between">
          <h2 id={headingId} className="text-4xl md:text-5xl font-bold mb-8">
            {project.title}
          </h2>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live demo of ${project.title} in a new tab`}
            className="flex justify-center items-center h-fit w-fit md:transition-all duration-200 md:hover:bg-primary max-md:bg-primary rounded-full p-2 md:p-4"
          >
            <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
          </a>
        </div>

        <p className="text-lg md:text-xl max-w-4xl mb-12 text-mutedText">
          {project.description}
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row border-t border-border">
        {/* Left Column: Key Insights */}
        <div className="w-full md:w-2/3 pt-8 pr-4">
          <h3 className="text-lg font-bold mb-6 text-mutedText">
            Key insights into design solution:
          </h3>

          <div className="space-y-6">
            {project.keyInsights?.map((item) => (
              <div key={item.id} className="flex items-start">
                <span className="shrink-0 w-8 h-8 mr-4 rounded-full bg-circleBg text-bg font-bold flex items-center justify-center text-sm">
                  #{item.id}
                </span>

                <p className="text-base text-gray-300">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="w-full md:w-1/3 pt-8 md:pl-4 flex flex-col justify-end items-end relative min-h-[200px] md:min-h-0">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-contain rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
