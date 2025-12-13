import React from 'react';

const SectionHeader = ({ title, description, size = 'lg', className = '' }) => {
  const titleSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  const descSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <header
      className={`mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-linear-to-r from-text to-primary ${className}`}
    >
      <h2
        className={`${titleSizes[size]} md:${titleSizes[size]} font-extrabold mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-linear-to-r from-text to-primary`}
      >
        {title}
      </h2>

      <div className="w-full">
        {description && (
          <p className={`${descSizes[size]} text-mutedText mx-auto max-w-4xl`}>{description}</p>
        )}
      </div>
    </header>
  );
};

export default SectionHeader;
