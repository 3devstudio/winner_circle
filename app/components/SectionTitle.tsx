import React from 'react';

interface SectionTitleProps {
    title: string;
    description?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => {
    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto justify-start items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl flex justify-start text-secondary font-semibold uppercase">
            {title}
          </h1>
          <div className="w-full h-1 bg-primary" />
        </div>
        <span className="text-center text-stone-700">
            {description}
        </span>
      </div>
    );
};

export default SectionTitle;