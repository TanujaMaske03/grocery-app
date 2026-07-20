import PropTypes from "prop-types";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  error = "",
  required = false,
  disabled = false,
  fullWidth = true,
  className = "",
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label className="label">
          <span className="label-text font-semibold">
            {label}
            {required && <span className="text-error"> *</span>}
          </span>
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          input
          input-bordered
          w-full
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          transition-all
          duration-300
          ${error ? "input-error" : ""}
          ${className}
        `}
      />

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;