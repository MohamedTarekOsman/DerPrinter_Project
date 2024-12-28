/* eslint-disable no-unused-vars */
import axios from "axios";


export const submitReview = async ({ userId, rating, reviewText }) => {
  const requestBody = {
    ratingStars: rating,
    ratingText: reviewText,
  };

  try {
    const response = await axios.patch(
      `https://api.derprinter.softforte.site/api/v1/user/rating/${userId}`,
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error submitting review");
  }
};
