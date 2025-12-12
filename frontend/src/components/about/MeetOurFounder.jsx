import React from 'react';
import { Helmet } from 'react-helmet';
import { FaLinkedin, FaGithub, FaRocket, FaFacebook } from 'react-icons/fa';

const MeetOurFounder = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD Farhan Sadik',
    image:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/8c72e0b481-6e5102fb0a8d68c863aa.png',
    jobTitle: 'Founder & CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'Farhan Sadik Digital Agency',
      url: 'https://farhansadik.vercel.app',
    },
    sameAs: [
      'https://www.linkedin.com/in/mdsadikdev/',
      'https://github.com/farhandotio',
      'https://www.facebook.com/farhansadik.io',
    ],
    description:
      'I am a digital innovator with expertise in full-stack development, UI/UX design, and digital strategy, delivering high-impact products for diverse industries.',
  };

  return (
    <>
      <Helmet>
        <title>Meet Me — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Learn about me, MD Farhan Sadik, founder of Farhan Sadik Digital Agency, specializing in full-stack development, UI/UX design, and digital strategy."
        />
        <meta
          name="keywords"
          content="Farhan Sadik, MD Farhan Sadik, Founder, CEO, Digital Agency, Web Development, UI/UX Design, Fullstack Developer"
        />
        <meta name="author" content="MD Farhan Sadik" />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-30 bg-bg" aria-labelledby="founder-heading">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          <div className="lg:w-3/4 w-full space-y-6">
            <h1 id="founder-heading" className="text-3xl font-extrabold text-text mb-5">
              Meet Me
            </h1>

            <h2 className="text-2xl font-semibold text-primary">MD Farhan Sadik</h2>

            <p className="text-xl leading-relaxed text-mutedText">
              I started this agency with a clear vision: to build meaningful, high-performance
              digital products that help brands grow with confidence. My work spans full-stack
              development, UI/UX design, and digital strategy, allowing me to handle both the
              creative and technical side of a project with precision.
            </p>

            <p className="text-xl leading-relaxed text-mutedText">
              My passion for user experience and emerging technologies guides every product I build.
              I focus on creating solutions that feel intuitive, perform flawlessly, and deliver
              measurable impact for businesses of all sizes.
            </p>

            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.linkedin.com/in/mdsadikdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-mutedText hover:text-primary transition duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>

              <a
                href="https://www.facebook.com/farhansadik.io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="text-mutedText hover:text-primary transition duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>

              <a
                href="https://github.com/farhandotio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github Profile"
                className="text-mutedText hover:text-primary transition duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="lg:w-1/4 w-full relative">
            <div className="relative w-full aspect-square bg-cardBg rounded-3xl overflow-hidden shadow-2xl border-4 border-border">
              <img
                src="https://ik.imagekit.io/iura/ppp.png?updatedAt=1761334141016"
                alt="MD Farhan Sadik"
                className="w-full brightness-105 contrast-110 h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://ik.imagekit.io/farhansadik/Agency/ppp.png?updatedAt=1761999834854';
                }}
              />

              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-linear-to-br from-secondary to-hoverSecondary shadow-lg flex items-center justify-center transform hover:scale-110 transition duration-300">
                <FaRocket className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetOurFounder;
