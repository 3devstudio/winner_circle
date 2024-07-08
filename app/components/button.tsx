import React from 'react';
import { Link } from "@remix-run/react";

type ButtonProps = {
    primary?: boolean;
    secondary?: boolean;
    onClick?: () => void;
    link?: string;
};

const Button: React.FC<ButtonProps> = ({ primary, secondary, onClick, link, children }) => {
    const buttonClasses = `px-4 py-2 transition min-w-[7rem] text-center w-full rounded-md whitespace-nowrap ${primary ? 'bg-primary hover:bg-primary/75 text-white' : 'bg-tertiary'} ${secondary ? 'bg-tertiary hover:bg-tertiary/75 text-stone-700' : ''}`;

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
