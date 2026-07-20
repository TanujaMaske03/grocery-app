import PropTypes from "prop-types";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Toast = ({
  type = "success",
  message,
}) => {
  const toastStyles = {
    success: {
      bg: "alert-success",
      icon: <FaCheckCircle className="text-xl" />,
    },
    error: {
      bg: "alert-error",
      icon: <FaExclamationCircle className="text-xl" />,
    },
    info: {
      bg: "alert-info",
      icon: <FaInfoCircle className="text-xl" />,
    },
    warning: {
      bg: "alert-warning",
      icon: <FaExclamationCircle className="text-xl" />,
    },
  };

  const current = toastStyles[type] || toastStyles.success;

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${current.bg} shadow-lg`}>
        {current.icon}
        <span>{message}</span>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf([
    "success",
    "error",
    "warning",
    "info",
  ]),
  message: PropTypes.string.isRequired,
};

export default Toast;