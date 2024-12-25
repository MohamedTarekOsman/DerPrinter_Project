/* eslint-disable react/prop-types */

import { useState } from "react";

const MultiSelect = ({ options, label }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelection = (option) => {
    setSelectedValues((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div>
      <label>{label}</label>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        {options.map((option) => (
          <div key={option} style={{ margin: "5px 0" }}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleSelection(option)}
            />
            <span style={{ marginLeft: "8px" }}>{option}</span>
          </div>
        ))}
      </div>
      <div>
        <strong>Selected:</strong> {selectedValues.join(", ")}
      </div>
    </div>
  );
};

export default MultiSelect;
