import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

interface TextareaProps {
  placeholder?: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  label,
  required = false,
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  error,
}) => {
  const [formattedValue, setFormattedValue] = useState(value || "");

  useEffect(() => {
    setFormattedValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;

    setFormattedValue(inputValue);
    if (onChange) {
      e.target.value = inputValue;
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col">
      {label ? (
        <label className="mb-1 text-sm text-gray-700 font-light">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <textarea
        placeholder={placeholder}
        required={required}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
        value={formattedValue}
        onChange={handleChange}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
      ></textarea>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
};

export default Textarea;
