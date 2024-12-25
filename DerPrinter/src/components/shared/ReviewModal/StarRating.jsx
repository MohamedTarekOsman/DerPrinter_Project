import React, { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleStarClick = (value) => setRating(value);

  return (
    <div className="flex space-x-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          onClick={() => handleStarClick(star)}
          className={`text-2xl ${
            star <= (hoveredStar || rating) ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
