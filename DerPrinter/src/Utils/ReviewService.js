/* eslint-disable no-unused-vars */
import axios from "axios";
import baseUrl from "../Api/baseUrl";

export const submitReview = async ({ userId, rating, reviewText }) => {
  const requestBody = {
    ratingStars: rating,
    ratingText: reviewText,
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/api/v1/user/rating/${userId}`,
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
