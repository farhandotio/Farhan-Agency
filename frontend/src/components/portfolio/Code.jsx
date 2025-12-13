import React from 'react';
import SectionHeader from '../common/SectionHeader';

const CodeShowcase = () => {
  return (
    <section className="relative min-h-[750px] py-20 px-5 sm:px-10 overflow-hidden text-text">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {/* Cyan Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse overflow-hidden"></div>
        {/* Fuchsia Glow */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-xl font-medium text-primary uppercase tracking-widest mb-3">
            Under the Hood
          </p>

          <SectionHeader
            title={
              <span className="bg-clip-text text-transparent bg-linear-to-r from-text to-primary">
                Code in Action
              </span>
            }
            description="I turn complex challenges into elegant, scalable solutions. Here is the stack that powers my work."
            size="xl"
            className="text-center lg:text-center"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="relative w-full lg:w-1/2 p-4 rounded-2xl border-5 border-border transition-all duration-300 hover:shadow-primary/50 hover:shadow-2xl overflow-hidden">
            <div
              className="absolute inset-0 rounded-2xl border-4 border-transparent pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                transition: 'box-shadow 0.5s ease-in-out',
              }}
            ></div>

            <img
              className="w-full aspect-video rounded-xl"
              src="https://ik.imagekit.io/iura/Screenshot%20from%202025-12-13%2023-47-37.png"
              alt="Frontend Code Screenshot"
            />
            <p className="absolute bottom-0 left-0 bg-cyan-700 text-text text-xs px-2 py-1 rounded-tr-lg">
              Frontend: React/UI
            </p>
          </div>

          <div className="relative w-full lg:w-1/2 p-4 rounded-2xl border-5 border-border transition-all duration-300 hover:shadow-fuchsia-400/50 hover:shadow-2xl overflow-hidden">
            <div
              className="absolute inset-0 rounded-2xl border-4 border-transparent pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
                transition: 'box-shadow 0.5s ease-in-out',
              }}
            ></div>
            <img
              className="w-full aspect-video rounded-xl"
              src="https://ik.imagekit.io/iura/Screenshot%20from%202025-12-13%2023-45-07.png"
              alt="Backend Code Screenshot"
            />
            <p className="absolute bottom-0 left-0 bg-fuchsia-700 text-text text-xs px-2 py-1 rounded-tr-lg">
              Backend/API Structure
            </p>
          </div>
        </div>

        {/* <div className="text-center mt-16">
          <a
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-text bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/50 transition duration-300 transform hover:scale-105"
          >
            View Detailed Case Studies &rarr;
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default CodeShowcase;
