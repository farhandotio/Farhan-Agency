import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/contact/Header";
import ContactForm from "../components/contact/ContactForm";
import ContactInfoSidebar from "../components/contact/ContactInfoSidebar";

const Contact = () => {
  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>Contact MD Farhan Sadik — Fullstack Developer</title>
        <meta
          name="description"
          content="Get in touch with MD Farhan Sadik, Fullstack Developer. Discuss your project ideas, collaboration opportunities, or just say hello."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, contact, fullstack developer, web development, hire developer, collaboration, portfolio"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* Open Graph / Social Sharing */}
        <meta
          property="og:title"
          content="Contact MD Farhan Sadik — Fullstack Developer"
        />
        <meta
          property="og:description"
          content="Reach out to MD Farhan Sadik for web development projects, collaborations, or inquiries about Fullstack development."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://farhansadik.vercel.app/contact"
        />
        <meta
          property="og:image"
          content="https://farhansadik.vercel.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact MD Farhan Sadik — Fullstack Developer"
        />
        <meta
          name="twitter:description"
          content="Reach out to MD Farhan Sadik for web development projects, collaborations, or inquiries about Fullstack development."
        />
        <meta
          name="twitter:image"
          content="https://farhansadik.vercel.app/og-image.png"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "MD Farhan Sadik",
            url: "https://farhansadik.vercel.app",
            email: "mailto:your-email@example.com",
            jobTitle: "Fullstack Developer",
            sameAs: [
              "https://github.com/farhandotio",
              "https://www.linkedin.com/in/mdsadikdev",
            ],
          })}
        </script>
      </Helmet>

      {/* Page Content */}
      <div className="min-h-screen bg-bg font-sans px-5 sm:px-7 lg:px-10 py-30">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-10">
          <ContactForm />
          <ContactInfoSidebar />
        </main>
      </div>
    </>
  );
};

export default Contact;
