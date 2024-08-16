import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

interface SelectProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  value?: string;
  error?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
  label,
  required = false,
  value,
  error,
  disabled,
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };

  return (
    <div className="flex flex-col relative w-full">
      {label ? (
        <label className="mb-1 text-sm text-gray-700">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <select
        value={value || ""}
        onChange={handleSelect}
        required={required}
        className={`p-2 border border-gray-300 rounded-md transition w-full text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? "ring-2 ring-rose-500 border-rose-500" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} // Apply opacity and cursor styles when disabled
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="mt-1 text-xs text-red-500 transition-opacity duration-300 ease-in-out">
          {error}
        </span>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Select;