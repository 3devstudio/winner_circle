import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef } from 'react';

interface SelectProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ options, onSelect, placeholder, label, required = false, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="flex flex-col relative w-full">
      {label ? (
        <label className="mb-1 text-sm text-gray-700">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={selectedOption || ''}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholder}
          required={required}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700 cursor-pointer"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
      {isOpen ? (
        <ul className="absolute top-16 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[20rem] overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              onKeyPress={(e) => e.key === 'Enter' && handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition text-stone-600"
              role="button"
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Select;