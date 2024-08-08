import PropTypes from 'prop-types';
import React from 'react';

interface TextareaProps {
  placeholder: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, label, required = false, value, onChange, error }) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="mb-2 text-sm text-gray-700">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <textarea
        placeholder={placeholder}
        required={required}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
        value={value}
        onChange={onChange}
      ></textarea>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Textarea;