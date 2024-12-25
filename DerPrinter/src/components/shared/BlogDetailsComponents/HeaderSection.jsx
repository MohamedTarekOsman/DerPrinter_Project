import React from "react";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div
      className="relative bg-gray-100 text-center flex flex-col items-center justify-center"
      style={{ minHeight: "50vh" }}
      data-aos="fade-up"
    >
      {/* Rotating Diamonds */}
      <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded transform rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded transform rotate-45 animate-spin-slow"></div>

      {/* Content */}
      <h1 className="text-4xl font-bold mb-2">Blogs</h1>
      <p className="text-gray-500">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/blogs" className="text-blue-500 hover:underline">
          Blogs
        </Link>{" "}
        / Blog Details
      </p>
    </div>
  );
};

export default HeaderSection;
