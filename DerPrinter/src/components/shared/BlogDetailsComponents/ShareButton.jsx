import React from "react";
import { FaShareAlt } from "react-icons/fa";

const ShareButton = () => {
  const handleShare = () => {
    const shareData = {
      title: "The Evolution of Technology in Our Lives",
      text: "Check out this amazing article!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) =>
        console.error("Error sharing:", error)
      );
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
    >
      <FaShareAlt /> Share Article
    </button>
  );
};

export default ShareButton;
