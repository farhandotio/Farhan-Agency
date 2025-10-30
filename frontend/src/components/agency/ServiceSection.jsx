import React from "react";

const services = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive interfaces built with React, Vue, and cutting-edge technologies for optimal user experience.",
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/backend.png?updatedAt=1761820474466",
    altText:
      "Frontend development icon showing layered UI elements symbolizing modern responsive design.",
  },
  {
    title: "Backend Development",
    description:
      "Scalable server architectures, APIs, and database solutions that power your applications reliably.",
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/b.jpg?updatedAt=1761820473781",
    altText:
      "Backend development icon showing database and server stacks representing robust architecture.",
  },
  {
    title: "Fullstack Solutions",
    description:
      "End-to-end development from concept to deployment, handling every aspect of your digital product.",
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/fullstack.png?updatedAt=1761751361946",
    altText:
      "Fullstack solutions icon illustrating complete web app workflow from frontend to backend.",
  },
  {
    title: "UI/UX Design & Prototyping",
    description:
      "Pixel-perfect UI/UX designs and interactive prototypes built with Figma and Framer to deliver seamless user experiences.",
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/an.png?updatedAt=1761820473987",
    altText:
      "UI/UX design icon showing wireframe and color palette representing creative design process.",
  },
  {
    title: "Animation & Interaction Development",
    description:
      "Engaging motion graphics, GSAP animations, and 3D interactions using Three.js and Framer Motion for next-level web experiences.",
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/fr.jpg?updatedAt=1761820473771",
    altText:
      "Animation development icon showing fluid motion elements representing GSAP and interactive web design.",
  },
];

const ServiceSection = () => {
  return (
    <section
      className="py-16 md:py-24 bg-bg"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="mx-auto px-5 sm:px-7 lg:px-10">
        {/* === Header Section === */}
        <header className="mb-12 md:mb-16">
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-extrabold text-text tracking-tight"
          >
            Our Services
          </h2>
          <p
            className="mt-4 text-xl max-w-4xl text-mutedText"
            itemProp="description"
          >
            Comprehensive fullstack development solutions tailored to elevate
            your business in the digital landscape.
          </p>
        </header>

        {/* === Service Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5" role="list">
          {services.map((service, index) => (
            <article
              key={index}
              className={`bg-cardBg p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-border hover:bg-hoverCardBg ${
                index === 0 && "grid md:col-span-2"
              } ${index === 1 && "grid md:col-span-2"} ${
                index === 2 && "grid md:col-span-3"
              } ${index === 3 && "grid md:col-span-3"} ${
                index === 4 && "grid md:col-span-4"
              }`}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="hasOfferCatalog"
              role="listitem"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-indigo-50 text-3xl">
                <img
                  src={service.image}
                  alt={service.altText}
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                  itemProp="image"
                  className="rounded-sm h-full w-full object-cover"
                />
              </div>

              <h3
                className="text-2xl font-semibold text-text mb-3"
                itemProp="name"
              >
                {service.title}
              </h3>

              <p
                className="text-mutedText leading-relaxed"
                itemProp="description"
              >
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Hidden meta-style SEO enhancement */}
      <meta
        name="description"
        content="Farhan Agency offers expert Frontend, Backend, and Fullstack Development Services — building scalable, high-performance digital products for businesses worldwide."
      />
    </section>
  );
};

export default React.memo(ServiceSection);
