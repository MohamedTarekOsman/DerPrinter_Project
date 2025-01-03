import React from "react";
import './Button.css'

const CustomButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
