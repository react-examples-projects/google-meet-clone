import { BiErrorCircle } from "react-icons/bi";
import PropTypes from "prop-types";
import cls from "classnames";
function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  children,
  ...props
}) {
  return isVisible ? (
    <div
      {...props}
      className={cls(props?.className, "fadeIn")}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        ...props.style,
      }}
    >
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <span
        className="d-flex align-items-center"
        style={{ color: "#ff005c", marginLeft: "5px", fontSize: "0.8rem" }}
      >
        {text || children}
      </span>
    </div>
  ) : null;
}

ErrorText.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default ErrorText;
