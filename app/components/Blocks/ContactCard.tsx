// path: ~/components/ContactCard.tsx

import React from "react";

interface ContactCardProps {
  imageUrl: string;
  name: string;
  phone: string;
  nameWidthClass: string;
  namePaddingClass: string;
  hoverText?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ imageUrl, name, phone, nameWidthClass, namePaddingClass, hoverText }) => {
  return (
    <div className="relative w-full h-[50rem] group">
      <div
        style={{ backgroundImage: `url('${imageUrl}')` }}
        className="relative w-full h-full bg-center bg-norepeat bg-cover"
      >
        {hoverText && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out flex justify-center items-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
              {hoverText}
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-0 inset-x-0 h-14 w-full">
        <div className="relative flex w-full h-full bg-secondary">
          <div className={`absolute left-0 inset-y-0 ${nameWidthClass} bg-primary text-stone-900 font-semibold clip-angle-r-sm flex justify-center items-center text-base sm:text-lg md:text-2xl lg:text-3xl pr-4`}>
            {name}
          </div>
          <div className={`${namePaddingClass} text-white my-auto text-sm sm:text-base md:text-xl`}>
            <a
              href={`tel:${phone.replace(/[^0-9]/g, "")}`}
              className="hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;