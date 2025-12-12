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
    <header className={`mb-16 md:mb-24 text-center lg:text-left ${className}`}>
      <h2
        className={`${titleSizes[size]} md:${titleSizes[size]} font-extrabold text-text mb-8 leading-tight tracking-tight`}
      >
        {title}
      </h2>

      {description && (
        <p className={`${descSizes[size]} text-mutedText max-w-4xl mx-auto lg:mx-0`}>
          {description}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
