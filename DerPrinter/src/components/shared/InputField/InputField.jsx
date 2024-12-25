import React from "react";
import './InputField.css'

const InputField = ({ name, type, placeholder, value, onChange, error, className}) => {
  return (
    <div
      className={`input-field ${className}`}
    >
      <input
        type={type}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {error && <div className="help-block with-errors error">{error}</div>}
    </div>
  );
};

export default InputField;