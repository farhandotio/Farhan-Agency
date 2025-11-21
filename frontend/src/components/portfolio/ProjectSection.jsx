// src/components/ProjectSection.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import axios from "axios";
import Skeleton from "../common/Skeleton";

const HoverProjectCard = ({
  project,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  isDesktop,
  isLast,
}) => {
  const id =
    project._id || project.id || encodeURIComponent(project.title || "project");

  const linkProps = {
    to: `/projects/${id}`,
    className: `group w-full text-left flex justify-between items-center cursor-pointer hover:bg-hoverCardBg focus:outline-none transition-all duration-300 ${
      isLast ? "" : "border-b border-border"
    }`,
    "aria-label": `Open project ${project.title}`,
  };

  if (!isDesktop) {
    return (
      <Link {...linkProps}>
        <div className="bg-cardBg rounded-xl overflow-hidden shadow-lg mb-4 transition-transform hover:scale-[1.02] duration-300 border border-border p-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 rounded-t-xl object-cover"
            loading="lazy"
          />
          <div className="p-5">
            <h3 className="text-2xl font-bold text-text tracking-wide">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link {...linkProps} onMouseEnter={(e) => onMouseEnter?.(e, project.image)} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
      <div className="flex items-center gap-5 w-full max-w-4xl py-6 md:py-8 lg:py-10 group-hover:pl-5 transition-all duration-300">
        <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight transition-all duration-300">
          {project.title}
        </h3>
      </div>
      <div className="shrink-0 py-6 md:py-8 lg:py-10">
        <FiArrowUpRight className="text-3xl text-mutedText group-hover:mr-5 transition-all duration-300" />
      </div>
    </Link>
  );
};

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://farhan-agency-wryw.onrender.com/api/projects"
        );

        const allProjects = response.data.projects || [];
        const featuredProjects = allProjects.slice(0, 5);
        setProjects(featuredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MD Farhan Sadik — Featured Projects",
    description:
      "A selection of web development projects built by MD Farhan Sadik, showcasing responsive interfaces, modern frontend and backend solutions, and scalable code.",
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
    <section id="projects" className="bg-bg text-text p-5 md:p-7 lg:p-10 scroll-mt-20 mb-30 relative">
      <header className="mb-16 md:mb-24 text-center lg:text-left">
        <div className="flex justify-between w-full gap-2">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight tracking-tight w-full">
            Featured Projects
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
          Explore some of the modern web applications I’ve built using React,
          Redux, and other modern technologies — optimized for performance,
          accessibility, and scalability.
        </p>
      </header>

      <div className={isDesktop ? "grid grid-cols-1 gap-0" : "grid grid-cols-1 gap-4"}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg mb-6">
                <Skeleton width="100%" height="180px" rounded />
                <Skeleton width="80%" height="20px" className="mt-4" />
                <Skeleton width="60%" height="20px" className="mt-2" />
              </div>
            ))
          : projects.map((project, index) => (
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

      {isDesktop && hoveredImage && mousePosition.x !== 0 && mousePosition.y !== 0 && (
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
            draggable={false}
          />
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
};

export default ProjectSection;
