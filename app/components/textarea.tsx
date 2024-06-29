import PropTypes from 'prop-types';

const Textarea = ({ placeholder, label, required = false }) => {
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
        className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-700"
        rows="4"
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
