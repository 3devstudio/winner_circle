import PropTypes from "prop-types";

const Input = ({ placeholder, label, required = false }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 text-sm text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        required={required}
        className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
      />
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;