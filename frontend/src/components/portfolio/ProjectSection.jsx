import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../common/Skeleton';
import SectionHeader from '../common/SectionHeader';

const MAX_PROJECTS = 3;

/* ======================
   Project Card
====================== */
const ProjectCard = ({ project }) => {
  const id = project._id || project.id || encodeURIComponent(project.title);

  return (
    <Link
      to={`/projects/${id}`}
      aria-label={`View case study for ${project.title}`}
      className="group relative block rounded-2xl overflow-hidden 
      border border-border bg-cardBg transition-all duration-500 
      hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 
          group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-t 
        from-black/60 via-black/20 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{project.title}</h3>

        <p className="text-sm text-mutedText leading-relaxed line-clamp-2">
          {project.shortDescription ??
            'A modern web experience focused on performance, clarity, and scalability.'}
        </p>

        {/* CTA */}
        <span
          className="inline-block mt-4 text-sm font-medium text-primary 
          opacity-0 translate-y-1 group-hover:opacity-100 
          group-hover:translate-y-0 transition-all duration-300"
        >
          View case study →
        </span>
      </div>
    </Link>
  );
};

/* ======================
   Project Section
====================== */
const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://farhan-agency-eg4k.onrender.com/api/projects');

        const list = res.data?.projects || [];
        setProjects(list.slice(0, MAX_PROJECTS));
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-24 lg:py-32 scroll-mt-20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute top-1/3 right-1/4 w-[420px] h-[420px] 
          bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto px-5 sm:px-7 lg:px-10">
        <SectionHeader
          title="Some of My Selected Projects & Case Studies"
          description="A focused selection of projects where thoughtful design, clean architecture, 
          and performance were treated as non-negotiable."
          size="xl"
          className="text-center"
        />

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: MAX_PROJECTS }).map((_, i) => (
              <div key={i}>
                <Skeleton width="100%" height="208px" rounded />
                <Skeleton width="70%" height="18px" className="mt-4" />
                <Skeleton width="90%" height="14px" className="mt-2" />
              </div>
            ))}

          {!loading && projects.length === 0 && (
            <p className="col-span-full text-center text-mutedText">
              Projects will be added here soon.
            </p>
          )}

          {!loading &&
            projects.map((project) => (
              <ProjectCard key={project._id || project.title} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
