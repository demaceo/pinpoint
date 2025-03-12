import React from "react";
import './Button.css'
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="button"
  >
    {label}
  </button>
);

export default Button;
