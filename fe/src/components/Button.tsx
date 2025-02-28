import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded"
  >
    {label}
  </button>
);

export default Button;
