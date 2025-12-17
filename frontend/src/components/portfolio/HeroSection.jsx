import React, { useEffect, useRef } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import { gsap } from 'gsap';
// ScrollTrigger ar lagbe na, tai import remove kora holo
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger); // Plugin registration removed

const HeroSection = () => {
  const heroRef = useRef(null);
  const h1TextRef = useRef(null);
  const pTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Only context is used to scope the GSAP animations
    const ctx = gsap.context(() => {
      // Shob <span> elements-gulo neya holo <h1>-er modhye theke
      const h1Spans = Array.from(h1TextRef.current.querySelectorAll('span'));
      const pText = pTextRef.current;
      const button = buttonRef.current;

      /* ---------------- INITIAL STATE (GSAP.SET) ---------------- */
      // Text, paragraph, ar button-er initial hidden state
      gsap.set(h1Spans, {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -80 : 80), // Left/right offset for staggered entry
      });

      gsap.set([pText, button], {
        opacity: 0,
        y: 30, // Bottom offset for slide-up entry
      });

      /* ---------------- APPEAR ANIMATION (GSAP TIMELINE) ---------------- */
      // Ei timeline-ti Hero section load howar shathe shathe chole
      const appearTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });

      appearTl
        .to(h1Spans, {
          opacity: 1,
          x: 0, // Slide back to original position
          stagger: 0.15,
        })
        .to(
          [pText, button],
          {
            opacity: 1,
            y: 0, // Slide up to original position
            stagger: 0.15,
          },
          '-=0.6' // 0.6 seconds before the previous animation ends
        );

      /* ---------------- SCROLL ANIMATION REMOVED ---------------- */
      // ScrollTrigger logic shompurno remove kora holo.
    }, heroRef);

    return () => ctx.revert();
  }, []); // Dependency array is empty, so it runs once on mount

  return (
    <section
      ref={heroRef}
      className="relative min-h-[650px] pt-15 flex items-center"
      aria-label="MD Farhan Sadik Portfolio"
      role="region"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 p-5 sm:p-7 lg:p-10 flex flex-col items-center w-full">
        <div className="mb-12 lg:mb-0 justify-center text-center  mx-auto">
          <h1
            ref={h1TextRef}
            className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span className="inline-block will-change-transform text-white text-shadow-lg-white">
              MD Farhan <br className="md:hidden" /> Sadik
            </span>
            <br />
            <span className="block pt-2 text-primary will-change-transform text-shadow-lg-cyan">
              — <br className="md:hidden" /> Full Stack,
            </span>
            <span className="max-lg:block text-secondary inline-block will-change-transform text-shadow-lg-fuchsia">
              Frontend <br className="md:hidden" /> &{' '}
            </span>
            <span className="max-lg:block inline-block will-change-transform text-white text-shadow-lg-white">
              {' '}
              Backend Developer
            </span>
          </h1>

          <p
            ref={pTextRef}
            className="mt-6 text-xl md:text-2xl leading-relaxed text-mutedText will-change-transform"
          >
            I build fast, modern & scalable web apps for startups & businesses.
          </p>

          <div
            ref={buttonRef}
            className="md:mt-8 mt-5 inline-flex max-md:flex max-md:flex-col gap-5 will-change-transform"
          >
            <PrimaryButton
              text="View My Work"
              href="#projects"
              size="xl"
              className="rounded-full shadow-lg shadow-primary/50"
            />
            <PrimaryButton
              text="Download Resume"
              href="/resume/Resume.pdf"
              size="xl"
              bgColor={'bg-secondary'}
              className="rounded-full shadow-lg shadow-primary/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
