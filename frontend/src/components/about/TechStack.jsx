import React from 'react';
import { Helmet } from 'react-helmet';
import {
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiGit,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiSocketdotio,
  SiOpenai,
  SiAmazon,
  SiDocker,
} from 'react-icons/si';

const TechIcon = ({ Icon, color, name }) => (
  <div
    className={`w-12 h-12 flex items-center justify-center rounded-lg bg-opacity-10 ${color} shadow-md`}
    aria-label={name}
    role="img"
  >
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

const OurTechnologyStack = () => {
  const technologyData = [
    { name: 'React', Icon: SiReact, color: 'text-blue-500' },
    { name: 'Redux', Icon: SiRedux, color: 'text-violet-600' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-sky-500' },
    { name: 'Git', Icon: SiGit, color: 'text-red-500' },
    { name: 'Node.js', Icon: SiNodedotjs, color: 'text-green-600' },
    { name: 'Express.js', Icon: SiExpress, color: 'text-gray-700' },
    { name: 'MongoDB', Icon: SiMongodb, color: 'text-green-700' },
    { name: 'JWT Auth', Icon: SiJsonwebtokens, color: 'text-yellow-600' },
    { name: 'Socket.IO', Icon: SiSocketdotio, color: 'text-indigo-600' },
    { name: 'AI / OpenAI', Icon: SiOpenai, color: 'text-white' },
    { name: 'AWS', Icon: SiAmazon, color: 'text-orange-500' },
    { name: 'Docker', Icon: SiDocker, color: 'text-blue-600' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'My Technology Stack',
    description:
      'I leverage modern, performance-driven tools to build scalable and robust applications — from frontend UI to backend APIs and cloud infrastructure.',
    mentions: technologyData.map((tech) => ({
      '@type': 'DefinedTerm',
      name: tech.name,
    })),
  };

  return (
    <>
      <Helmet>
        <title>My Technology Stack — Farhan Sadik Digital Agency</title>
        <meta
          name="description"
          content="Explore the technology stack I use, including React, Redux, Tailwind CSS, Node.js, Express, MongoDB, and more, to build modern web applications."
        />
        <meta
          name="keywords"
          content="React, Redux, Tailwind CSS, Node.js, Express.js, MongoDB, JWT, Socket.IO, OpenAI, AWS, Docker, Web Development"
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-20 bg-bg font-inter" aria-labelledby="tech-heading">
        <div className="mx-auto text-center">
          <header className="mb-16 md:mb-24">
            <h2
              id="tech-heading"
              className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight tracking-tight"
              title="My complete technology stack for modern web applications"
            >
              My Technology Stack
            </h2>
            <p className="text-xl mx-auto text-mutedText max-w-4xl">
              I use modern, performance-driven tools to build scalable and robust applications —
              from crafting intuitive frontend UI to building backend APIs and managing cloud
              infrastructure.
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologyData.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-6 bg-cardBg rounded-2xl shadow-lg border border-border transform transition duration-300 hover:shadow-xl"
              >
                <TechIcon Icon={tech.Icon} color={tech.color} name={tech.name} />
                <h3 className="mt-4 text-lg font-semibold text-text">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTechnologyStack;
