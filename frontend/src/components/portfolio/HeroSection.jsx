import React from 'react';
import PrimaryButton from '../common/PrimaryButton';

const HeroSection = () => {
  return (
    <section
      className="bg-bg overflow-hidden min-h-[650px] pt-15 flex items-center"
      aria-label="MD Farhan Sadik Portfolio"
      itemScope
      itemType="https://schema.org/WebPage"
      role="region"
    >
      <div className="p-5 sm:p-7 lg:p-10 flex flex-col items-center">
        <div className="mb-12 lg:mb-0 text-center lg:text-left">
          <h1
            className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-text"
            itemProp="headline"
          >
            <span>
              MD Farhan <br className="md:hidden" /> Sadik
            </span>{' '}
            <br />
            <span className="block pt-2 text-primary">
              {' '}
              — <br className="md:hidden" /> Full Stack,{' '}
            </span>
            <span className="max-lg:block text-secondary">
              {' '}
              Frontend <br className="md:hidden" /> &{' '}
            </span>
            <span className="max-lg:block"> Backend Developer </span>
          </h1>

          <p
            className="mt-6 text-xl md:text-2xl leading-relaxed max-w-4xl text-mutedText"
            itemProp="description"
          >
            I build modern, scalable web applications. From responsive interfaces to robust backend
            systems, I turn digital ideas into reality.
          </p>

          <div className="md:mt-8 mt-5 inline-block">
            <PrimaryButton text="View My Work" href={'#projects'} size="xl" className='rounded-lg' />
          </div>
        </div>
      </div>

      <meta
        name="description"
        content="MD Farhan Sadik — Fullstack, Frontend, and Backend Developer. I build modern, responsive web applications with scalable code and clean design."
      />
      <meta
        name="keywords"
        content="MD Farhan Sadik, fullstack developer, frontend developer, backend developer, personal portfolio, web development, responsive web apps"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'MD Farhan Sadik',
          url: 'https://farhan.dev.vercel.app',
          sameAs: ['https://github.com/farhandotio', 'https://www.linkedin.com/in/mdsadikdev'],
          jobTitle: 'Fullstack Developer',
          description:
            'I build modern, scalable web applications. From responsive interfaces to robust backend systems, I turn digital ideas into reality.',
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'MD Farhan Sadik — Fullstack, Frontend & Backend Developer',
          description:
            'I build modern, scalable web applications. From responsive interfaces to robust backend systems, I turn digital ideas into reality.',
          url: 'https://farhan.dev.vercel.app',
        })}
      </script>
    </section>
  );
};

export default React.memo(HeroSection);
