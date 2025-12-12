import React from 'react';
import { FaCode, FaServer, FaPalette, FaChartBar } from 'react-icons/fa';

const TeamCard = ({ icon, title, description, colorStart, colorEnd }) => (
  <div
    className="
      bg-cardBg rounded-3xl p-6 shadow-xl 
      transform hover:shadow-2xl hover:bg-hoverCardBg transition duration-300 ease-in-out
      flex flex-col items-center text-center h-full border border-border
    "
  >
    <div
      className={`
        w-20 h-20 sm:w-24 sm:h-24 rounded-full 
        flex items-center justify-center mb-6 
        bg-linear-to-br ${colorStart} ${colorEnd}
        shadow-lg
      `}
    >
      {React.cloneElement(icon, { className: 'w-10 h-10 text-white' })}
    </div>

    <h3 className="text-xl sm:text-2xl font-bold text-text mb-2">{title}</h3>

    <p className="text-md text-mutedText leading-relaxed">{description}</p>
  </div>
);

const ExpertTeam = () => {
  const teamData = [
    {
      title: 'Frontend Developers',
      description:
        'I collaborate with talented React, Vue, and Angular specialists to create responsive and intuitive interfaces.',
      colorStart: 'from-teal-500',
      colorEnd: 'to-green-400',
      icon: <FaCode />,
    },
    {
      title: 'Backend Engineers',
      description:
        'I work alongside Node.js, Python, and cloud experts to build reliable and scalable backend systems.',
      colorStart: 'from-orange-500',
      colorEnd: 'to-amber-400',
      icon: <FaServer />,
    },
    {
      title: 'UI/UX Designers',
      description:
        'I coordinate with user-centered design experts to craft engaging and seamless experiences.',
      colorStart: 'from-green-400',
      colorEnd: 'to-teal-500',
      icon: <FaPalette />,
    },
    {
      title: 'Project Managers',
      description:
        'I align with agile methodology leaders to ensure smooth project delivery and effective collaboration.',
      colorStart: 'from-amber-500',
      colorEnd: 'to-orange-500',
      icon: <FaChartBar />,
    },
  ];

  return (
    <section className="py-20 bg-bg" aria-labelledby="team-heading">
      <div className="mx-auto text-center">
        <header className="mb-16 md:mb-24">
          <h2
            id="team-heading"
            className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight tracking-tight"
            title="My expert team working together"
          >
            My Expert Team
          </h2>
          <p className="text-xl mx-auto text-mutedText max-w-4xl">
            I work with a diverse group of skilled professionals, each contributing their expertise
            to deliver high-quality results for every project.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((team) => (
            <TeamCard
              key={team.title}
              title={team.title}
              description={team.description}
              icon={team.icon}
              colorStart={team.colorStart}
              colorEnd={team.colorEnd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertTeam;
