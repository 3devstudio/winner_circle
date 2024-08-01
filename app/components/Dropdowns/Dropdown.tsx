// components/Dropdown.tsx

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  triggerText: string;
  triggerClassName?: string;
  showChevron?: boolean;
  children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ triggerText, triggerClassName, showChevron = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block my-auto" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${triggerClassName}`}
      >
        {triggerText}
        {showChevron && (
          isOpen ? (
            <ChevronUpIcon className="w-5 h-5 ml-2 transition-transform duration-300" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 ml-2 transition-transform duration-300" />
          )
        )}
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
