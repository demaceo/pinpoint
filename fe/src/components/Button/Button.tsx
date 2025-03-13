import React from "react";
import "./Button.css";
import { ButtonProps } from "../../assets/types";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = "button",
}) => (
  <button onClick={onClick} className={className} disabled={disabled}>
    {label}
  </button>
);

export default Button;
