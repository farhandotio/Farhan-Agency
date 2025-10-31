// ServiceCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="bg-cardBg p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-border hover:bg-hoverCardBg"
      itemScope
      itemType="https://schema.org/Service"
      itemProp="hasOfferCatalog"
      role="listitem"
    >
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-indigo-50 text-3xl">
        <img
          src={service.heroImageUrl}
          alt={service.title}
          loading="lazy"
          decoding="async"
          width="64"
          height="64"
          itemProp="image"
          className="rounded-sm h-full w-full object-cover"
        />
      </div>

      <h3 className="text-2xl font-semibold text-text mb-3" itemProp="name">
        {service.title}
      </h3>

      <p className="text-mutedText leading-relaxed" itemProp="description">
        {service.heroDescription}
      </p>
    </Link>
  );
};

export default ServiceCard;
