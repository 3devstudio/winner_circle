// path: src/components/Input.tsx

import React from 'react';
import PropTypes from 'prop-types';

interface InputProps {
  placeholder: string;
  label?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, label, type, required = false, onChange, value }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type || 'text'}
        required={required}
        onChange={onChange}
        value={value}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
      />
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
};

export default Input;