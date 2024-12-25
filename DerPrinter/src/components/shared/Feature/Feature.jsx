import React from "react";

const Feature = ({ feature={},key }) => {
  return (
    <div key={key} className="flex items-start gap-3">
      <img src={feature.icon} className="text-black text-xl" />
      <div>
        <h3 className="text-lg font-bold text-black">{feature.title}</h3>
        <p className="text-sm text-gray-500">{feature.description}</p>
      </div>
    </div>
  );
};

export default Feature;
