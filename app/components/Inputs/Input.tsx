import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  whiteLabel?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  type,
  required = false,
  onChange,
  onBlur,
  onClick,
  onFocus,
  value,
  error,
  name,
  disabled,
  checked,
  whiteLabel = false,
}) => {
  const [formattedValue, setFormattedValue] = useState(value || "");

  useEffect(() => {
    setFormattedValue(value || "");
  }, [value]);

  const formatPhoneNumber = (phone: string) => {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const formatMoney = (money: string) => {
    const cleaned = money.replace(/[^\d.]/g, "");
    const [integerPart, decimalPart] = cleaned.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (type === "tel") {
      inputValue = formatPhoneNumber(inputValue);
    }

    if (type === "money") {
      inputValue = formatMoney(inputValue);
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
        <label
          className={`mb-1 text-sm font-light ${
            whiteLabel ? "text-gray-100" : "text-gray-700"
          }`}
        >
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
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          value={formattedValue}
          name={name}
          className={`transition text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${
              type !== "checkbox"
                ? "py-2 pr-2 border border-gray-300 rounded-md w-full text-stone-700"
                : "h-5 w-5 border-gray-300 rounded-md text-primary"
            }
            ${type === "money" ? "pl-5" : "pl-2"}
            ${error ? "ring-2 ring-rose-500 border-rose-500" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${type === "checkbox" && checked ? "bg-primary" : ""}
          `}
          disabled={disabled}
          checked={checked}
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
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  whiteLabel: PropTypes.bool,
};

export default Input;
