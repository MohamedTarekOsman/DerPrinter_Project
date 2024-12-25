import React from "react";

const TextAreaField = ({ name, placeholder, value, onChange, error}) => {
  return (
    <div
      className="input-field"
    >
      <textarea
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        rows="6"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      ></textarea>
      {error && <div className="help-block with-errors error">{error}</div>}
    </div>
  );
};

export default TextAreaField;
