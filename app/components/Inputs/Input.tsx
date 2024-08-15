import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  type,
  required = false,
  onChange,
  value,
  error,
  name,
  disabled,
}) => {
  const [formattedValue, setFormattedValue] = useState(value || "");

  useEffect(() => {
    setFormattedValue(value || "");
  }, [value]);

  // Function to format the phone number
  const formatPhoneNumber = (phone: string) => {
    const cleaned = ("" + phone).replace(/\D/g, ""); // Remove all non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  // Function to format the money value
  const formatMoney = (money: string) => {
    // Remove all non-numeric and non-period characters
    const cleaned = money.replace(/[^\d.]/g, "");
    // Add commas for thousands
    const [integerPart, decimalPart] = cleaned.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (type === "tel") {
      inputValue = formatPhoneNumber(inputValue); // Format the phone number
    }

    if (type === "money") {
      inputValue = formatMoney(inputValue); // Format the money
    }

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
      <div className="relative">
        {type === "money" && (
          <span className="absolute left-2 top-1.5 text-gray-500">$</span>
        )}
        <input
          placeholder={placeholder}
          type={type}
          required={required}
          onChange={handleChange}
          value={formattedValue}
          name={name}
          className={`py-2 pr-2 ${type === 'money' ? 'pl-5' : 'pl-2'} border border-gray-300 rounded-md transition w-full text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error ? "ring-2 ring-rose-500 border-rose-500" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={disabled}
        />
      </div>
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
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;