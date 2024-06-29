import React from 'react';
import { Link } from "@remix-run/react";

type ButtonProps = {
    primary?: boolean;
    secondary?: boolean;
    onClick?: () => void;
    link?: string;
};

const Button: React.FC<ButtonProps> = ({ primary, secondary, onClick, link, children }) => {
    const buttonClasses = `px-4 py-2 text-stone-700 transition min-w-[7rem] text-center ${primary ? 'bg-primary hover:bg-primary/75' : 'bg-tertiary'} ${secondary ? 'bg-tertiary hover:bg-tertiary/75' : ''}`;

    if (link) {
        return (
            <Link to={link} className={buttonClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
