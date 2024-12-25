import React from "react";
import ShareButton from "./ShareButton";
import { FaCalendarAlt } from "react-icons/fa";

const DetailsSection = ({
  title,
  date,
  name,
  image1,
  image2,
  description1,
  description2,
  description3,
  categories,
}) => {
  // Format date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <>
      {/* Title and Date */}
      <div className="text-center blog-name-head mb-8">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <FaCalendarAlt /> Published on: {formattedDate}
        </p>
      </div>

      {/* Main Image */}
      <div
        className="mb-8 blog-details-img-container overflow-hidden rounded-lg"
        data-aos="fade-up"
      >
        <img
          src={image1}
          alt={title}
          className="w-full h-full object-cover animated-img"
        />
      </div>
      <p className="text-gray-700 leading-relaxed">{description1}</p>

      <p className="text-gray-700 leading-relaxed">{description2}</p>
      <div
        className="mb-8 blog-details-img-container full-width overflow-hidden rounded-lg"
        data-aos="fade-up"
      >
        <img
          src={image2}
          alt={"Paragraph Image"}
          className="w-full h-full object-cover animated-img"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      <p className="text-gray-700 leading-relaxed">{description3}</p>

      {/* Share and Categories Section */}
      <div className="flex justify-between items-center mt-8">
        {/* Categories */}
        <div className="flex gap-2">
          {categories?.map((category, index) => (
            <span
              key={index}
              className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Share Button */}
        <ShareButton />
      </div>
    </>
  );
};

export default DetailsSection;
