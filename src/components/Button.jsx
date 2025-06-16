import PropTypes from "prop-types";
import { COLORS } from "../utils/colors";

function Button({ variant = "primary", children, style, className, ...props }) {
  const variants = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.textDark },
    secondary: { backgroundColor: COLORS.secondary, color: COLORS.textDark },
    success: { backgroundColor: COLORS.success, color: COLORS.textDark },
    danger: { backgroundColor: COLORS.danger, color: COLORS.textDark },
  };

  return (
    <button
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        ...variants[variant],
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Button;