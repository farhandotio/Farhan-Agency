import React from 'react';
import SectionHeader from '../common/SectionHeader';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'Redux',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'GSAP',
      'UI/UX Design',
      'Responsive Design',
    ],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Figma', 'AWS', 'Docker', 'Vercel', 'Netlify', 'Postman'],
  },
];

const WhoAmI = () => {
  return (
    <section className="py-24 lg:py-32 bg-bg px-5 sm:px-7 lg:px-10 " id="whoami">
      <SectionHeader
        title="Who I Am and What I Do as a Full-Stack Web Developer"
        description="I’m MD Farhan Sadik, a full-stack web developer focused on building scalable, high-performance, and user-centric web applications using modern JavaScript technologies."
        size="xl"
        className=""
      />
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        {/* Text Section */}

        {/* Image Section */}
        <div className="max-md:flex-1 w-fit flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl transition-transform duration-700 hover:scale-105">
            <img
              src="https://ik.imagekit.io/farhansadik/Agency/ppp.png?updatedAt=1761999834854"
              alt="MD Farhan Sadik"
              className="w-full h-full object-cover"
            />
            {/* Glow overlay */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary/10 to-secondary/10 pointer-events-none"></div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <p className="text-mutedText leading-relaxed text-xl">
            I started my journey as a frontend developer and expanded into fullstack, mastering
            technologies for both client-side and server-side development. My focus is on building
            applications that are performant, maintainable, and visually appealing.
          </p>

          <p className="text-mutedText leading-relaxed text-xl">
            I enjoy solving complex problems, crafting smooth user experiences, and continuously
            learning new tools and frameworks to stay ahead in the fast-moving world of web
            development.
          </p>

          {/* Skills Section */}
          <div className="mt-6 space-y-4">
            {skillCategories.map((cat, idx) => (
              <div key={idx}>
                <h4 className="text-2xl text-text font-semibold mb-2 flex-wrap gap-3 inline-flex">
                  {cat.category}:
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-primary rounded-full font-medium transition inline"
                    >
                      {skill},
                    </span>
                  ))}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
