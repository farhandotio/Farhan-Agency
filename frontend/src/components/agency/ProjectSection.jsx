import React from "react";
import ProjectCard from "../common/ProjectCard";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "DigitalHat - E-commerce Platform",
    description: `Royalty Team Gear provides a comprehensive platform for creating customized merchandise for 
    sports teams, allowing fans to express their support with unique apparel and accessories. The 
    intuitive interface empowers users to select from a diverse catalog of products, including t-shirts, 
    hoodies, and jackets, all of which can be personalized with team logos, colors, and custom text. 
    With features designed to streamline the process, Royalty Team Gear ensures that creating a team store 
    is accessible and enjoyable for all users, ultimately fostering a deeper connection between fans and 
    their teams.`,
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/Projects/digitalhat.png?updatedAt=1761828932572",
    liveUrl: "https://digitalhat.vercel.app/",
    keyInsights: [
      {
        id: 1,
        insight:
          "The customization process is simplified by an intuitive interface, allowing users to easily select products and personalize them without feeling overwhelmed.",
      },
      {
        id: 2,
        insight:
          "A responsive design ensures that the platform is accessible across devices, catering to users who may access the site on mobile devices or tablets.",
      },
      {
        id: 3,
        insight:
          "A well-organized catalog of products, clearly displaying prices and options for customization, simplifies the shopping experience. This clarity helps users make informed decisions, improving overall conversion rates.",
      },
    ],
  },
];

const ProjectSection = () => {
  if (!projects || projects.length === 0) return null;

  // JSON-LD structured data for the list (kept in section-level file to avoid repeating)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.liveUrl,
        image: p.image,
        sameAs: p.githubUrl ? [p.githubUrl] : [],
      },
    })),
  };

  return (
    <div className="bg-bg text-text p-5 md:p-7 lg:p-10">
      <h1 className="sr-only">Projects — Portfolio</h1>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default ProjectSection;
