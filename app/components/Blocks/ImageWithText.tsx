import React from "react";

// Define types for the component props
type ImageWithTextProps = {
  imageUrl: string;
  altText: string;
  text: string;
  description: string;
  isRound?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  alternate?: boolean;
};

const ImageWithText: React.FC<ImageWithTextProps> = ({
  imageUrl,
  altText,
  text,
  description,
  isRound = false,
  size = "md",
  alternate = false,
}) => {
  // Map size to TailwindCSS classes for image sizes
  const imageSizeClasses = {
    sm: "w-full md:w-32 h-32",  // Small size
    md: "w-full md:w-64 h-64",  // Medium size (default)
    lg: "w-full md:w-96 h-96",  // Large size
    xl: "w-full md:w-[36rem] h-[36rem]", // Extra large size
    "2xl": "w-full md:w-[52rem] h-[52rem]", // 2x large
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center ${
        alternate ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <img
        src={imageUrl}
        alt={altText}
        className={`object-cover ${isRound ? "rounded-full" : "rounded"} ${
          imageSizeClasses[size]
        }`}
      />
      {/* Text Section */}
      <div
        className={`mt-4 md:mt-0 ml-0 md:ml-6 ${
          alternate ? "md:mr-6 md:text-right md:items-end" : ""
        } flex flex-col`}
      >
        <h2 className="font-bold text-xl mb-2">{text}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ImageWithText;