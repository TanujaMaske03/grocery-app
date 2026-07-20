import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    info: "btn-info",
    ghost: "btn-ghost",
    outline: "btn-outline",
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        btn
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${loading ? "loading" : ""}
        normal-case
        font-semibold
        transition-all
        duration-300
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;