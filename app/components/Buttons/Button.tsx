import { Link } from "@remix-run/react";
import React from "react";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: () => void;
  link?: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  text?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  tertiary,
  onClick,
  link,
  icon: Icon,
  active,
  text,
  disabled = false,
  className,
  children,
}) => {
  const buttonClasses = `transition text-center w-full rounded-md whitespace-nowrap
    ${primary ? "px-4 py-2 min-w-[7rem] bg-primary hover:bg-primary/75 text-white" : "bg-tertiary"}
    ${secondary ? "px-4 py-2 min-w-[7rem] bg-tertiary hover:bg-tertiary/75 text-stone-700" : ""}
    ${tertiary ? "bg-transparent text-stone-700" : ""}
    ${active ? "border-2 border-primary" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className ? className : ""}
  `;

  const renderContent = () => {
    return (
      <>
        {Icon && <Icon className="inline-block mr-2 h-5 w-5" />}
        {text || children}
      </>
    );
  };

  if (link) {
    return (
      <Link to={link} className={buttonClasses}>
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