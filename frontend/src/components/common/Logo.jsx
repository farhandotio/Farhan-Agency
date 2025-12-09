import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <Link
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      to="/"
      aria-label="Farhan Sadik home"
      className={className}
    >
      <h1
        className={`${sizeClasses[size]} whitespace-nowrap uppercase font-bold tracking-widest`}
      >
        Farhan <span className="text-primary">Dev</span>
        <span className="text-primary">.</span>
      </h1>
    </Link>
  );
};

export default Logo;
