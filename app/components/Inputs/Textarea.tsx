import React from 'react';
import PropTypes from 'prop-types';

interface TextareaProps {
  placeholder: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, label, required = false, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-2 text-sm text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        required={required}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default Textarea;
