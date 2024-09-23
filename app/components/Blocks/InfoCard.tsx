import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

import Button from "../Buttons/Button";

interface InfoCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  link?: string;
  className?: string;
  learnMore?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  link,
  className,
  learnMore = false,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row bg-white rounded-lg w-fit shadow-xl shadow-gray-100 ${className}`}
    >
      {imageSrc ? (
        <div className="w-full md:w-1/4 h-full max-h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover w-full h-full rounded-t-lg md:rounded-tl-lg md:rounded-tr-none md:rounded-bl-lg"
          />
        </div>
      ) : null}
      <div
        className={`flex flex-col gap-2 justify-center my-auto ${
          imageSrc ? "md:w-3/4" : ""
        } py-4 px-4 md:px-6`}
      >
        <h1 className="font-semibold text-secondary">{title}</h1>
        {description ? (
          <span className="text-stone-500 text-sm line-clamp-3">{description}</span>
        ) : null}
        {link ? (
          <div className="w-fit flex justify-start py-2">
            {learnMore ? (
              <Button tertiary link={link}>
                <div className="flex gap-1 text-primary hover:text-primary/50 transition">
                  <span>Learn More</span>
                  <ChevronRightIcon className="h-4 w-4 my-auto" />
                </div>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InfoCard;
