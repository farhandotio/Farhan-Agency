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
    <section className="py-24 lg:py-32 bg-bg" id="whoami">
      <div className="px-5 sm:px-7 lg:px-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="flex-1 space-y-6">
          <SectionHeader
            title="Who I Am"
            description="I’m MD Farhan Sadik, a Fullstack Developer passionate about building modern, scalable, and beautiful web applications."
            size="xl"
            className="md:text-left md:ml-0"
          />

          <p className="text-mutedText leading-relaxed text-lg">
            I started my journey as a frontend developer and expanded into fullstack, mastering
            technologies for both client-side and server-side development. My focus is on building
            applications that are performant, maintainable, and visually appealing.
          </p>

          <p className="text-mutedText leading-relaxed text-lg">
            I enjoy solving complex problems, crafting smooth user experiences, and continuously
            learning new tools and frameworks to stay ahead in the fast-moving world of web
            development.
          </p>

          {/* Skills Section */}
          <div className="mt-6 space-y-4">
            {skillCategories.map((cat, idx) => (
              <div key={idx}>
                <h4 className="text-lg text-text font-semibold mb-2 inline">{cat.category}: </h4>
                <div className="flex-wrap gap-3 inline-flex">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-primary rounded-full font-medium transition inline"
                    >
                      {skill},
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default WhoAmI;
