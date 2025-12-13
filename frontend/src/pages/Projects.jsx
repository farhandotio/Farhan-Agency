// src/pages/Projects.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import ProjectCard from '../components/projects/ProjectCard';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { getLenis } from '../components/common/SmoothScroll';
import Skeleton from '../components/common/Skeleton';
import SectionHeader from '../components/common/SectionHeader';

/* -------------------------------------------------------------------------- */
/* << KEY INSIGHT / TECH STACK BUTTON COMPONENT (For ProjectCard.jsx) >>     */
/* -------------------------------------------------------------------------- */
/**
 * NOTE: This component should be used INSIDE your actual ProjectCard.jsx file.
 * We are including it here as a guide for the required styling/logic.
 */
const TechStackBadges = ({ stack }) => {
  if (!stack || stack.length === 0) return null;

  // Use a fixed set of neon colors for consistency
  const colors = ['cyan', 'fuchsia', 'lime', 'yellow'];

  // Function to map tech names to consistent colors or icons
  const getColorClass = (tech, index) => {
    const baseColor = colors[index % colors.length];

    switch (
      tech.toLowerCase().split(' ')[0] // Use the first word for simple matching
    ) {
      case 'react':
      case 'redux':
        return 'text-cyan-400 border-cyan-400/50 shadow-cyan-500/30 bg-cyan-900/20';
      case 'node':
      case 'express':
        return 'text-lime-400 border-lime-400/50 shadow-lime-500/30 bg-lime-900/20';
      case 'mongo':
      case 'sql':
        return 'text-green-400 border-green-400/50 shadow-green-500/30 bg-green-900/20';
      case 'tailwind':
      case 'css':
        return 'text-blue-400 border-blue-400/50 shadow-blue-500/30 bg-blue-900/20';
      default:
        return `text-${baseColor}-400 border-${baseColor}-400/50 shadow-${baseColor}-500/30 bg-${baseColor}-900/20`;
    }
  };

  return (
    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700/50 mt-5">
      {stack.map((tech, index) => (
        <span
          key={tech}
          className={`
                        text-xs font-semibold px-3 py-1 rounded-full border 
                        transition duration-300 transform hover:scale-105 
                        ${getColorClass(tech, index)}
                        shadow-md hover:shadow-lg
                    `}
        >
          {tech}
        </span>
      ))}
    </div>
  );
};
/* -------------------------------------------------------------------------- */

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const { id: routeId } = useParams();
  const location = useLocation();

  const refsMap = useRef({});

  // ... (Hooks, fetching, and scrolling logic remain the same) ...
  const setRef = useCallback(
    (key) => (el) => {
      if (el) refsMap.current[key] = el;
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await axios.get('https://farhan-agency-wryw.onrender.com/api/projects');
        if (!cancelled) setProjects(res.data.projects || []);
      } catch (err) {
        if (!cancelled) setError('Failed to load projects. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProject();
    return () => {
      cancelled = true;
    };
  }, []);

  const makeKeyForProject = (p) => p._id || p.id || p.slug || encodeURIComponent(p.title || '');

  const scrollToProject = useCallback((key) => {
    const node = refsMap.current[key];
    if (!node) return;

    const lenis = getLenis();

    const doScroll = () => {
      if (lenis?.scrollTo) {
        lenis.scrollTo(node, { offset: -20, duration: 1.5 });
      } else {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      setHighlightId(key);
      setTimeout(() => setHighlightId(null), 2500);
    };

    const attemptScroll = (retry = 0) => {
      if (retry > 20) return;
      if (!node.offsetParent) {
        requestAnimationFrame(() => attemptScroll(retry + 1));
      } else {
        doScroll();
      }
    };
    attemptScroll();
  }, []);

  useEffect(() => {
    if (loading || !routeId || projects.length === 0) return;

    let match = projects.find((p) =>
      [p._id, p.id, p.slug, encodeURIComponent(p.title)].includes(routeId)
    );
    if (!match) {
      const decoded = decodeURIComponent(routeId);
      match = projects.find((p) => p.title === decoded);
    }
    if (!match) return;

    const key = makeKeyForProject(match);
    scrollToProject(key);
  }, [routeId, loading, projects, scrollToProject]);

  const jsonLd = {
    /* ... */
  };

  return (
    <section
      id="projects"
      className="bg-bg text-white p-5 md:p-7 lg:p-10 mt-20 relative overflow-hidden"
    >
      {/* 🌟 Background Lighting Layer (Subtle Cyan Glow) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

      <div className="max-w-[1900px] mx-auto relative z-10">
        <Helmet>
          <title>Projects — MD Farhan Sadik</title>
          <meta
            name="description"
            content="Projects by MD Farhan Sadik — a selection of web applications and UI projects built with React, Redux, Node.js and modern web technologies."
          />
          <link rel="canonical" href="https://farhansadik.vercel.app/projects" />
        </Helmet>

        <SectionHeader
          title={
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-400">
              Projects I’ve Built
            </span>
          }
          description="A curated selection of modern, high-performing web applications and UI
            projects — built with React, Redux, Node.js, and other modern
            technologies. Each project focuses on performance, accessibility, and
            real-world user needs."
          size="xl"
          className="text-center"
        />

        {loading && (
          <div className="min-h-[300px] flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl p-4 bg-gray-800/60 shadow-xl shadow-gray-900/50">
                <Skeleton width="100%" height="180px" rounded />
                <Skeleton width="80%" height="20px" className="mt-4 bg-gray-700/50" />
                <Skeleton width="60%" height="20px" className="mt-2 bg-gray-700/50" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <>
            {projects.length > 0 ? (
              projects.map((project) => {
                const key = makeKeyForProject(project);
                return (
                  <div
                    key={key}
                    ref={setRef(key)}
                    className={`transition-all duration-300 mb-8 p-0.5 rounded-2xl 
                        border border-gray-700/50 shadow-2xl shadow-gray-900/70
                        ${
                          highlightId === key
                            ? 'border-cyan-400/80 shadow-cyan-500/50 transform scale-[1.01]'
                            : 'hover:border-cyan-400/50 hover:shadow-cyan-500/20'
                        }
                    `}
                  >
                    {/* 🚨 IMPORTANT: You must integrate the TechStackBadges logic 
                        inside your ProjectCard component using project.techStack
                    */}
                    <ProjectCard project={project} />
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center mt-10">
                No projects available at the moment.
              </p>
            )}
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
};

export default Projects;
