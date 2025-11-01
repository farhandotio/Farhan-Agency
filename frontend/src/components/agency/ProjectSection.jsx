import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import axios from "axios";

const HoverProjectCard = ({
  project,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  isDesktop,
  isLast,
}) => {
  if (!isDesktop) {
    return (
      <div className="bg-cardBg rounded-xl overflow-hidden shadow-lg mb-4 cursor-pointer transition-transform hover:scale-[1.02] duration-300 border border-border p-5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 rounded-xl object-cover"
        />
        <div className="flex justify-between items-center">
          <h3 className="text-2xl pt-5 font-bold text-text tracking-wide">
            {project.title}
          </h3>
        </div>
      </div>
    );
  }

  const borderClass = isLast ? "" : "border-b border-border";

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      className={`group w-full text-left flex justify-between items-center cursor-pointer hover:bg-hoverCardBg focus:outline-none transition-all duration-300 ${borderClass}`}
      onMouseEnter={(e) => onMouseEnter(e, project.image)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.title}`}
    >
      <div className="flex items-center gap-5 w-full max-w-4xl py-6 md:py-8 lg:py-10 group-hover:pl-5 transition-all duration-300">
        {/* Title */}
        <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight transition-all duration-300">
          {project.title}
        </h3>
      </div>

      <div className="shrink-0 py-6 md:py-8 lg:py-10">
        <FiArrowUpRight className="text-3xl text-mutedText group-hover:mr-5 transition-all duration-300" />
      </div>
    </a>
  );
};

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Data fetching and project limit logic
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");

        // --- Logic to show maximum 5 projects ---
        const allProjects = response.data.projects || [];
        // Maximum 5 projects show হবে
        const featuredProjects = allProjects.slice(0, 5);
        setProjects(featuredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProject();
  }, []);

  // Mouse handlers — only run on desktop
  const handleMouseEnter = useCallback(
    (event, imageUrl) => {
      if (!isDesktop) return;
      setHoveredImage(imageUrl);
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [isDesktop]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDesktop) return;
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    setHoveredImage(null);
    setMousePosition({ x: 0, y: 0 });
  }, [isDesktop]);

  // JSON-LD (unchanged)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Web Development Projects",
    description:
      "Explore web development projects by MD Farhan Sadik, including DigitalHat — a modern e-commerce platform built with React and Redux for smooth user experiences.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.liveUrl,
        image: p.image,
      },
    })),
  };

  return (
    <section
      id="projects"
      className="bg-bg text-text p-5 md:p-7 lg:p-10 scroll-mt-20 mb-30 relative"
    >
      <header className="mb-16 md:mb-24">
        <div className="flex justify-between w-full gap-2">
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight tracking-tight w-full"
          >
            Our featured Projects
          </h2>
          <Link
            to={"/projects"}
            className="flex whitespace-nowrap h-fit max-md:hidden w-fit mx-auto gap-2 bg-cardBg hover:bg-primary text-text font-semibold px-6 py-3 rounded-full transition-all"
            aria-label="All Projects"
          >
            <span> All Projects </span>
            <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
          </Link>
        </div>
        <p className="text-mutedText max-w-4xl text-lg">
          A showcase of modern, high-performing web applications built with
          React, Redux, and cutting-edge frontend technologies — designed for
          performance, accessibility, and scalability.
        </p>
      </header>

      {/* Project List (Conditional rendering for desktop vs. mobile list style) */}
      <div
        className={
          isDesktop
            ? "grid grid-cols-1 gap-0"
            : "grid grid-cols-1 gap-4"
        }
      >
        {projects.map((project, index) => (
          <HoverProjectCard
            key={project._id || project.title}
            project={project}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            isDesktop={isDesktop}
            isLast={index === projects.length - 1}
          />
        ))}
      </div>

      {/* Floating Image Preview — rendered only on desktop */}
      {isDesktop &&
        hoveredImage &&
        mousePosition.x !== 0 &&
        mousePosition.y !== 0 && (
          <div
            className="pointer-events-none fixed z-50 transition-opacity duration-200"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, calc(-100% - 10px))",
            }}
          >
            <img
              src={hoveredImage}
              alt="Project Preview"
              className="w-64 h-40 object-cover rounded-lg shadow-xl"
            />
          </div>
        )}

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default ProjectSection;
