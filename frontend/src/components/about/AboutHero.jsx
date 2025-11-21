import React from "react";
import { Helmet } from "react-helmet";

const AboutHero = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MD Farhan Sadik",
    url: "https://farhansadik.vercel.app",
    jobTitle: "Frontend & Fullstack Web Developer",
    description:
      "MD Farhan Sadik is a passionate web developer transforming ideas into exceptional digital experiences that drive business growth and user engagement.",
    sameAs: [
      "https://www.linkedin.com/in/mdfarhansadik",
      "https://github.com/master-farhan",
      "https://www.twitter.com/yourhandle",
    ],
  };

  return (
    <>
      <Helmet>
        <title>About Farhan Sadik — Frontend & Fullstack Developer</title>
        <meta
          name="description"
          content="Learn about MD Farhan Sadik, a passionate frontend and fullstack web developer dedicated to transforming ideas into exceptional digital experiences."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, web developer, frontend developer, fullstack developer, digital experiences, portfolio"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Farhan Sadik — Web Developer"
        />
        <meta
          property="og:description"
          content="Discover the journey and expertise of MD Farhan Sadik, a frontend and fullstack developer building high-performance digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://farhansadik.vercel.app/about"
        />
        <meta
          property="og:image"
          content="https://farhansadik.vercel.app/og-about.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Farhan Sadik — Web Developer"
        />
        <meta
          name="twitter:description"
          content="MD Farhan Sadik is a passionate frontend and fullstack developer creating high-performance digital experiences."
        />
        <meta
          name="twitter:image"
          content="https://farhansadik.vercel.app/og-about.png"
        />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section id="about" className="">
        <header className="mb-16 md:mb-24">
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl font-extrabold w-full mb-8"
          >
            About Farhan Sadik
          </h2>
          <p className="text-mutedText max-w-4xl text-lg">
            MD Farhan Sadik is a passionate web developer dedicated to
            transforming ideas into exceptional digital experiences that drive
            business growth and user engagement.
          </p>
        </header>
      </section>
    </>
  );
};

export default AboutHero;
