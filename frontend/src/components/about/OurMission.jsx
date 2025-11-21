import React from "react";
import { Helmet } from "react-helmet";

const OurMission = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Farhan Sadik",
    url: "https://farhansadik.vercel.app",
    logo: "https://farhansadik.vercel.app/logo.png",
    description:
      "Farhan Sadik delivers cutting-edge digital solutions, combining strategic thinking, creative design, and technical expertise to create products that users love and businesses thrive on.",
    sameAs: [
      "https://www.linkedin.com/in/mdfarhansadik",
      "https://github.com/master-farhan",
      "https://www.twitter.com/yourhandle",
    ],
  };

  return (
    <>
      <Helmet>
        <title>Our Mission — Farhan Sadik Digital Solutions</title>
        <meta
          name="description"
          content="At Farhan Sadik, we believe in technology transforming businesses. Our mission is to deliver innovative digital solutions that drive growth and engagement."
        />
        <meta
          name="keywords"
          content="Farhan Sadik, digital solutions, web development, frontend development, fullstack developer, business growth, technology solutions"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="bg-bg" aria-labelledby="mission-heading">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="lg:w-2/3 w-full">
            <h1
              id="mission-heading"
              className="text-3xl font-extrabold text-text mb-5 text-left font-inter"
            >
              Our Mission
            </h1>
            <p className="text-xl leading-relaxed mb-6 text-mutedText">
              At Farhan Sadik, I believe in the power of technology to transform
              businesses and create meaningful connections. Our mission is to
              deliver cutting-edge digital solutions that not only meet our
              clients' immediate needs but also position them for future
              success.
            </p>
            <p className="text-xl leading-relaxed text-mutedText">
              I combine strategic thinking, creative design, and technical
              expertise to build digital products that users love and businesses
              thrive on.
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
                <p className="text-base text-mutedText uppercase font-medium">
                  Projects Delivered
                </p>
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
                <p className="text-base text-mutedText uppercase font-medium">
                  Years Experience
                </p>
              </div>

              <div className="text-left">
                <h2
                  className="text-5xl font-bold text-secondary mb-1 tracking-tight"
                  aria-label="24 7 support"
                >
                  24/7
                </h2>
                <p className="text-base text-mutedText uppercase font-medium">
                  Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
