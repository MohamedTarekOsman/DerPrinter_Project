/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product,buttonText, link }) => {
  const navigate = useNavigate();
  const { image, title, name, SalePercent, desc, properties } = product;
  const btnLink = link?(`/${link}/${product._id}`):(`/category/${product._id}`);
  let propsPro = properties!==undefined?properties:[];
  console.log("Product Props:", propsPro)
  return (
    <div className="prod-card bg-white shadow-md rounded-lg overflow-hidden text-center">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {( SalePercent>0) && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
            -{SalePercent}%
          </span>
        )}
      </div>
      <div className="p-4 sm_p-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        {desc && (
          <p className="text-gray-500 text-sm mt-1">
            {desc}
          </p>
        )}
        {/* {propsPro.length!==0 && (
          <p className="text-black text-xl font-bold mt-2">{propsPro[0].price}€</p>
        )} */}
        <button 
        // onClick={()=>{navigate(`${link}/${product._id}`)}}
        onClick={()=>{navigate(btnLink)}}
        className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 txt-small">
          {buttonText?buttonText:"Mehr anzeigen"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
