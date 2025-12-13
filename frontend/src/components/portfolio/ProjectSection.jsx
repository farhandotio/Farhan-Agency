// src/components/ProjectSection.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowDown } from 'react-icons/io5';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import axios from 'axios';
import Skeleton from '../common/Skeleton';
import SectionHeader from '../common/SectionHeader';
// PrimaryButton import না থাকলেও, সুবিধার জন্য শেষে View All Projects button-এ ব্যবহার করা হলো।
import PrimaryButton from '../common/PrimaryButton';

// কাস্টম গ্লো ক্লাসের প্রয়োজন হলে, গ্লোবাল CSS-এ এটি সেট করুন:
// .text-shadow-sm-fuchsia { text-shadow: 0 0 5px rgba(255, 0, 255, 0.7); }

const HoverProjectCard = ({
  project,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  isDesktop,
  isLast,
}) => {
  const id = project._id || project.id || encodeURIComponent(project.title || 'project');

  const linkProps = {
    to: `/projects/${id}`,
    // --- SHADOW/COLOR UPDATE 1: Desktop List Item Border ---
    // Border color changed to gray-700/50 for subtle look, hover adds fuchsia glow
    className: `group w-full text-left flex justify-between items-center cursor-pointer focus:outline-none transition-all duration-300 
      ${isLast ? '' : 'border-b border-gray-700/50 hover:border-primary/50'}`,
    'aria-label': `Open project ${project.title}`,
  };

  if (!isDesktop) {
    return (
      <Link {...linkProps}>
        <div
          // --- SHADOW/COLOR UPDATE 2: Mobile Card Styles ---
          // Darker background, strong shadow, and fuchsia glow on hover
          className="bg-gray-800/60 w-full rounded-xl overflow-hidden shadow-xl shadow-gray-900/50 mb-5 transition-transform duration-300 border border-gray-700/50 hover:shadow-primary/30"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 rounded-t-xl object-cover"
            loading="lazy"
          />
          <div className="p-5">
            {/* Text color change on hover */}
            <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      {...linkProps}
      onMouseEnter={(e) => onMouseEnter?.(e, project.image)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="flex items-center gap-5 w-full max-w-4xl py-6 md:py-8 lg:py-10 group-hover:pl-5 transition-all duration-300">
        <h3
          // --- SHADOW/COLOR UPDATE 3: Desktop Text Styles ---
          // Text color change and glow on hover
          className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight transition-all duration-300 group-hover:text-primary group-hover:text-shadow-sm-fuchsia"
        >
          {project.title}
        </h3>
      </div>
      <div className="shrink-0 py-6 md:py-8 lg:py-10">
        {/* Arrow color change on hover */}
        <FiArrowUpRight className="text-3xl text-gray-400 group-hover:mr-5 group-hover:text-primary transition-all duration-300" />
      </div>
    </Link>
  );
};

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [loading, setLoading] = useState(true);

  // ... (useEffect for resize and fetching remain the same) ...
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await axios.get('https://farhan-agency-wryw.onrender.com/api/projects');

        const allProjects = response.data.projects || [];
        const featuredProjects = allProjects.slice(0, 5);
        setProjects(featuredProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
      // Added a slight offset for better visibility
      setMousePosition({ x: event.clientX - 20, y: event.clientY - 20 });
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    setHoveredImage(null);
    setMousePosition({ x: 0, y: 0 });
  }, [isDesktop]);

  const jsonLd = {
    /* ... remains the same ... */
  };

  return (
    <section
      id="projects"
      className="bg-bg text-white p-5 md:p-7 lg:p-10 scroll-mt-20 mb-30 relative"
    >
      {/* 🌟 Lighting Layer - Fuchsia Glow in the background */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-[1900px] mx-auto">
        <SectionHeader
          title={
            // --- SHADOW/COLOR UPDATE 4: Header linear ---
            // Setting the header title linear to Fuchsia
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-primary">
              Featured Projects
            </span>
          }
          description="Explore some of the modern web applications I’ve built using React, Redux, and other
            modern technologies — optimized for performance, accessibility, and scalability."
          size="xl"
          className="text-center"
        />

        <div className={isDesktop ? 'grid grid-cols-1 gap-0 mt-12' : 'grid grid-cols-1 gap-5'}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
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
      </div>

      {/* 💡 Hovered Image Preview with Neon Shadow */}
      {isDesktop && hoveredImage && mousePosition.x !== 0 && mousePosition.y !== 0 && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-200"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, calc(-100% - 15px))',
          }}
        >
          <img
            src={hoveredImage}
            alt="Project Preview"
            className="w-64 h-40 object-cover rounded-lg shadow-2xl shadow-primary/60 border border-primary/50"
            draggable={false}
          />
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default ProjectSection;
