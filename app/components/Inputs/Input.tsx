import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

interface InputProps {
  placeholder: string;
  label?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, label, type, required = false, onChange, value, error }) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      {label ? (
        <label className="mb-1 text-sm text-gray-700">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <input
        placeholder={placeholder}
        type={type || 'text'}
        required={required}
        onChange={onChange}
        value={value}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
      />
      {error && (
        <p
          className={`mt-1 text-xs text-red-500 transition-opacity duration-300 ease-in-out`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default Input;