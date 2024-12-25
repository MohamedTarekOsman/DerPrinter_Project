/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const ProductHighlightCard = ({ image, category, title, description, id }) => {
  const navigate = useNavigate();
  return (
    <div className=" blog-card rounded-3xl shadow-md overflow-hidden border border-gray-200">
      {/* صورة الكارد */}
      <div className="blog-img">
        <img
          src={image}
          alt="Product Highlight"
          className="w-full h-full object-cover "
        />
      </div>
      {/* النصوص */}
      <div className="p-4">
        {/* الفئة */}
        <p className="text-sm text-red-500 font-medium mb-2">{category}</p>
        {/* العنوان */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 hovered-blog" 
            onClick={()=>navigate(`/blogDetails/${id}`)}
        >
          {title}
        </h3>
        {/* الوصف */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductHighlightCard;
