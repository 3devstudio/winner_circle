import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

import Button from '../Buttons/Button';

interface InfoCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  link?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, imageAlt, title, description, link, className }) => {
  return (
    <div className={`flex flex-col md:flex-row bg-white rounded-lg w-full ${className}`}>
      {imageSrc ? (
        <div className="w-full md:w-2/5 h-full max-h-[20rem]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover w-full h-full rounded-t-lg md:rounded-tl-lg md:rounded-tr-none md:rounded-bl-lg"
          />
        </div>
      ) : null}
      <div className={`flex flex-col gap-2 justify-center my-auto w-full ${imageSrc ? 'md:w-3/5' : ''} p-4`}>
        <h1 className="font-semibold text-secondary">{title}</h1>
        {description ? <span className="text-stone-500 text-sm">{description}</span> : null}
        {link ? (
          <div className="w-fit flex justify-start">
            <Button tertiary link={link}>
              <div className="flex gap-1 text-primary hover:text-primary/50 transition">
                <span>Learn More</span>
                <ChevronRightIcon className="h-4 w-4 my-auto" />
              </div>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InfoCard;
