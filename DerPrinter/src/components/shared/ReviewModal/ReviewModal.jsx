import { useState } from "react";
import StarRating from "./StarRating";
import { submitReview } from "../../../Utils/ReviewService";
import Cookies from "universal-cookie";

function ReviewModal() {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const [isOpen, setIsOpen] = useState(false);
  const [productRating, setProductRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = async () => {
    try {
      await submitReview({
        userId: user._id,
        rating: productRating,
        reviewText,
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={openModal}
      >
        Bewertung hinzufügen
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Wie war Ihre Bestellung?
            </h2>
            <div className="space-y-4">
              {/* تقييم المنتج */}
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Ihre Bewertung des Produkts
                </h3>
                <StarRating
                  rating={productRating}
                  setRating={setProductRating}
                />
              </div>
              {/* النص */}
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                placeholder="Schreiben Sie Ihre Meinung"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              {/* زر الإرسال */}
              <button
                onClick={handleSubmit}
                className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800"
              >
                senden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewModal;
