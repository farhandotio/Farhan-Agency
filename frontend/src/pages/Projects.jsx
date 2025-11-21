// src/pages/Projects.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import ProjectCard from "../components/projects/ProjectCard";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { getLenis } from "../components/common/SmoothScroll";
import Skeleton from "../components/common/Skeleton";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const { id: routeId } = useParams();
  const location = useLocation();

  const refsMap = useRef({});

  const setRef = useCallback(
    (key) => (el) => {
      if (el) refsMap.current[key] = el;
    },
    []
  );

  // Fetch projects
  useEffect(() => {
    let cancelled = false;
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://farhan-agency-wryw.onrender.com/api/projects"
        );
        if (!cancelled) setProjects(res.data.projects || []);
      } catch (err) {
        if (!cancelled) setError("Failed to load projects. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProject();
    return () => {
      cancelled = true;
    };
  }, []);

  const makeKeyForProject = (p) =>
    p._id || p.id || p.slug || encodeURIComponent(p.title || "");

  const scrollToProject = useCallback((key) => {
    const node = refsMap.current[key];
    if (!node) return;

    const lenis = getLenis();

    const doScroll = () => {
      if (lenis?.scrollTo) {
        lenis.scrollTo(node, { offset: 0, duration: 2.0 });
      } else {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      setHighlightId(key);
      setTimeout(() => setHighlightId(null), 2000);
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

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by MD Farhan Sadik",
    description:
      "Explore web development projects by MD Farhan Sadik, including modern e-commerce, dashboards, and web apps built with React, Redux and modern web technologies.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description || p.shortDescription || "",
        url:
          p.liveUrl ||
          (p.slug ? `https://farhansadik.vercel.app/projects/${p.slug}` : ""),
        image: p.image || p.previewImage || "",
      },
    })),
  };

  return (
    <section id="projects" className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      <Helmet>
        <title>Projects — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Projects by MD Farhan Sadik — a selection of web applications and UI projects built with React, Redux, Node.js and modern web technologies."
        />
        <link rel="canonical" href="https://farhansadik.vercel.app/projects" />
      </Helmet>

      <header className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
          Projects I’ve Built
        </h2>
        <p className="text-mutedText max-w-4xl text-lg">
          A curated selection of modern, high-performing web applications and UI
          projects — built with React, Redux, Node.js, and other modern
          technologies. Each project focuses on performance, accessibility, and
          real-world user needs.
        </p>
      </header>

      {loading && (
        <div className="min-h-[300px] flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg">
              <Skeleton width="100%" height="180px" rounded />
              <Skeleton width="80%" height="20px" className="mt-4" />
              <Skeleton width="60%" height="20px" className="mt-2" />
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
                  className={`transition-shadow duration-300 ${
                    highlightId === key
                      ? "ring-4 ring-primary/40 rounded-xl"
                      : ""
                  } mb-6`}
                >
                  <ProjectCard project={project} />
                </div>
              );
            })
          ) : (
            <p className="text-mutedText">
              No projects available at the moment.
            </p>
          )}
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default Projects;
