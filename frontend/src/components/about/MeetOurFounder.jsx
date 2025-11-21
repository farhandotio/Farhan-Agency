import React from "react";
import { Helmet } from "react-helmet";
import { FaLinkedin, FaGithub, FaRocket, FaFacebook } from "react-icons/fa";

const MeetOurFounder = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MD Farhan Sadik",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/8c72e0b481-6e5102fb0a8d68c863aa.png",
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: "Farhan Sadik Digital Agency",
      url: "https://farhansadik.vercel.app",
    },
    sameAs: [
      "https://www.linkedin.com/in/mdsadikdev/",
      "https://github.com/farhandotio",
      "https://www.facebook.com/farhansadik.io",
    ],
    description:
      "MD Farhan Sadik is a digital innovator with expertise in full-stack development, UI/UX design, and digital strategy, delivering high-impact projects for startups and enterprises.",
  };

  return (
    <>
      <Helmet>
        <title>Meet Our Founder — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Learn about MD Farhan Sadik, founder of Farhan Sadik Digital Agency, with expertise in full-stack development, UI/UX design, and digital strategy."
        />
        <meta
          name="keywords"
          content="Farhan Sadik, MD Farhan Sadik, Founder, CEO, Digital Agency, Web Development, UI/UX Design, Fullstack Developer"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-30 bg-bg" aria-labelledby="founder-heading">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          <div className="lg:w-3/4 w-full space-y-6">
            <h1
              id="founder-heading"
              className="text-3xl font-extrabold text-text mb-5"
            >
              Meet Our Founder
            </h1>

            <h2 className="text-2xl font-semibold text-primary">
              MD Farhan Sadik
            </h2>

            <p className="text-xl leading-relaxed text-mutedText">
              With over 8 years of experience in digital innovation, Farhan
              founded the agency with a vision to bridge the gap between
              technology and business success. His expertise spans full-stack
              development, UI/UX design, and digital strategy.
            </p>

            <p className="text-xl leading-relaxed text-mutedText">
              Farhan's passion for emerging technologies and user-centric design
              has led to the successful delivery of numerous high-impact
              projects for startups and Fortune 500 companies alike.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mdsadikdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-mutedText hover:text-primary transition duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/farhansadik.io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="text-mutedText hover:text-primary transition duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>

              {/* GitHub */}
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

          {/* Founder Image */}
          <div className="lg:w-1/4 w-full relative">
            <div className="relative w-full aspect-square bg-cardBg rounded-3xl overflow-hidden shadow-2xl border-4 border-border">
              <img
                src="https://ik.imagekit.io/iura/ppp.png?updatedAt=1761334141016"
                alt="Farhan Ahmed, Founder of Farhan Sadik"
                className="w-full brightness-105 contrast-110 h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://ik.imagekit.io/farhansadik/Agency/ppp.png?updatedAt=1761999834854";
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
