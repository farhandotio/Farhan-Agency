import React, { useEffect, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProject() {
      const data = await axios.get("http://localhost:3000/api/projects");

      setProjects(data.data.projects);
    }

    fetchProject();
  }, []);

  // ✅ JSON-LD for SEO (Structured Data)
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
    <section id="projects" className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      <header className="mb-16 md:mb-24">
        <h2
          id="testimonials-heading"
          className="text-4xl md:text-5xl font-extrabold w-full  mb-8"
        >
          Our all Projects
        </h2>
        <p className="text-mutedText max-w-4xl text-lg">
          A showcase of modern, high-performing web applications built with
          React, Redux, and cutting-edge frontend technologies — designed for
          performance, accessibility, and scalability.
        </p>
      </header>

      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}

      {/* ✅ SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default Projects;
