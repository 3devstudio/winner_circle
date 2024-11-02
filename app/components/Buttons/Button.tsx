import { Link } from "@remix-run/react";
import React from "react";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  danger?: boolean;
  onClick?: () => void;
  link?: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  text?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  textSize?: string;
  openInNewTab?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  tertiary,
  danger,
  onClick,
  link,
  icon: Icon,
  active,
  text,
  disabled = false,
  className,
  children,
  textSize = "text-xs",
  openInNewTab = false,
}) => {
  const buttonClasses = `transition uppercase ${textSize} text-center rounded-md whitespace-nowrap font-light
    ${
      primary
        ? "bg-primary hover:bg-primary/75 text-white px-4 py-2"
        : "bg-tertiary"
    }
    ${
      secondary
        ? "bg-tertiary hover:bg-tertiary/75 text-stone-700 px-4 py-2"
        : ""
    }
    ${tertiary ? "bg-transparent text-stone-700" : ""}
    ${danger ? "bg-rose-500 text-white px-4 py-2" : ""}
    ${active ? "border-2 border-primary px-4 py-2" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className ? className : ""}
  `;

  const renderContent = () => {
    return (
      <>
        {Icon && (
          <div className="my-auto flex justify-center items-center">
            <Icon className="inline-block mr-2 h-5 w-5 my-auto" />
            <div className="my-auto">
              {text || children}
            </div>
          </div>
        )}
        {!Icon && (text || children)}
      </>
    );
  };

  if (link) {
    return (
      <Link
        to={link}
        className={buttonClasses}
        target={openInNewTab ? "_blank" : "_self"}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {renderContent()}
    </button>
  );
};

export default Button;