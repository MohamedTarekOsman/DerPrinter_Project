/* eslint-disable react/prop-types */
import './ReviewCard.css';
import male from '../../../assets/images/male.png';
import female from '../../../assets/images/female.png';

const ReviewCard = ({ review }) => {
    return (
      <div className="card-review relative bg-gray-100 border border-gray-200 rounded-lg p-6 w-100 shadow-md">
        {/* User Avatar */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={review.gender === "male"?male:female} 
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        {/* User Info */}
        <div className="mt-8 text-center">
          <h3 className="text-gray-800 font-medium">{review.name}</h3>
          <div className="flex justify-center items-center mt-2">
            {[...Array(review.stars)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-yellow-500"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.936 1.507 8.358L12 18.902l-7.443 4.698 1.507-8.358-6.064-5.936 8.332-1.151z" />
              </svg>
            ))}
          </div>
          <div className="hr"></div>
          <p className="text-gray-600 text-sm text-left">{review.text}</p>
          {/* <span className="text-gray-400 text-xs float-right">
            {review.date}
          </span> */}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-8 h-8 bg-gray-100 rotate-45 border-r border-b"></div>
      </div>
    );
  };
  
  export default ReviewCard;
  