import React from 'react';
import { Helmet } from 'react-helmet';

const OurMission = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Farhan Sadik',
    url: 'https://farhansadik.vercel.app',
    logo: 'https://farhansadik.vercel.app/logo.png',
    description:
      'I deliver cutting-edge digital solutions by combining strategic thinking, creative design, and technical expertise to build products that users love and businesses thrive on.',
    sameAs: [
      'https://www.linkedin.com/in/mdfarhansadik',
      'https://github.com/master-farhan',
      'https://www.twitter.com/yourhandle',
    ],
  };

  return (
    <>
      <Helmet>
        <title>My Mission — Farhan Sadik Digital Solutions</title>
        <meta
          name="description"
          content="I believe in technology's ability to transform businesses. My mission is to deliver innovative digital solutions that drive measurable growth and meaningful user engagement."
        />
        <meta
          name="keywords"
          content="Farhan Sadik, digital solutions, web development, frontend development, fullstack developer, business growth, technology solutions"
        />
        <meta name="author" content="MD Farhan Sadik" />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="bg-bg" aria-labelledby="mission-heading">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="lg:w-2/3 w-full">
            <h1
              id="mission-heading"
              className="text-3xl font-extrabold text-text mb-5 text-left font-inter"
            >
              My Mission
            </h1>

            <p className="text-xl leading-relaxed mb-6 text-mutedText">
              I believe deeply in the power of technology to transform businesses, elevate
              experiences, and create meaningful connections. My mission is to build digital
              solutions that not only solve today's problems but also prepare brands for tomorrow’s
              opportunities.
            </p>

            <p className="text-xl leading-relaxed text-mutedText">
              I bring together strategic thinking, creative UI engineering, and strong technical
              execution to craft products that users enjoy and businesses rely on for growth.
            </p>
          </div>

          <div
            className="
              lg:w-1/3 w-full 
              p-8 rounded-2xl 
              bg-cardBg border border-border hover:bg-hoverCardBg transition-all duration-300
            "
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="text-left">
                <h2
                  className="text-5xl font-bold text-primary mb-1 tracking-tight"
                  aria-label="Over 50 projects delivered"
                >
                  50+
                </h2>
                <p className="text-base text-mutedText uppercase font-medium">Projects Delivered</p>
              </div>

              <div className="text-left">
                <h2
                  className="text-5xl font-bold text-secondary mb-1 tracking-tight"
                  aria-label="98 percent client satisfaction"
                >
                  98%
                </h2>
                <p className="text-base text-mutedText uppercase font-medium">
                  Client Satisfaction
                </p>
              </div>

              <div className="text-left">
                <h2
                  className="text-5xl font-bold text-primary mb-1 tracking-tight"
                  aria-label="More than 2 years of experience"
                >
                  2+
                </h2>
                <p className="text-base text-mutedText uppercase font-medium">Years Experience</p>
              </div>

              <div className="text-left">
                <h2
                  className="text-5xl font-bold text-secondary mb-1 tracking-tight"
                  aria-label="24 7 support"
                >
                  24/7
                </h2>
                <p className="text-base text-mutedText uppercase font-medium">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
