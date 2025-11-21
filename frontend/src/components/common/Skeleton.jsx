import React from "react";
import clsx from "clsx";

const Skeleton = ({ width = "100%", height = "1rem", className = "", rounded = true, count = 1 }) => {
  const skeletonClass = clsx(
    "bg-hoverCardBg animate-pulse",
    rounded && "rounded-md",
    className
  );

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width, height }} className={`${skeletonClass} mb-2 last:mb-0`} />
      ))}
    </>
  );
};

export default Skeleton;
