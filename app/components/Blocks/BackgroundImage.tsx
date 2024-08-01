import React from "react";

interface BackgroundImageProps {
  image: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image, size = "md", children }) => {
  const heightClasses = {
    sm: "h-[30vh]",
    md: "h-[40vh]",
    lg: "h-[50vh]",
  };

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className={`relative w-full ${heightClasses[size]} bg-no-repeat bg-cover bg-center flex justify-center items-center`}
    >
      {children && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;