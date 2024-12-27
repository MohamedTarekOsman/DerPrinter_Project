/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import paint from "../../assets/images/paint.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../Redux/actions/usersAction";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

const Sidebar = ({ firstProduct, currentPrice, selectedOptions, uploadedImage, selectedDelivery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = new Cookies();
  const user = cookies.get("user");

  const handleSubmit = async () => {
    if (typeof currentPrice === "number") {
      const userId = user._id;
      const formData = {
        productId: id,
        selectedItems: Object.values(selectedOptions),
        price: firstProduct.SalePercent>0?((currentPrice-((firstProduct?.SalePercent / 100) * currentPrice))+((19 / 100) * (currentPrice-((firstProduct?.SalePercent / 100) * currentPrice)))).toFixed(2):((19 / 100) * currentPrice + currentPrice).toFixed(2),
        image: uploadedImage,
        orderDelivery: selectedDelivery.label,
      };

      // Show loading toast
      const toastId = toast.loading("Processing...");

      try {
        await dispatch(addToCart(userId, formData));
        
        // Update the toast to success
        toast.success("Added to cart successfully!", { id: toastId });

        navigate("/cart");
      } catch (error) {
        // Update the toast to error
        toast.error("Something went wrong!", { id: toastId });
      }
    } else {
      // Show an error if currentPrice is not valid
      toast.error("Please choose properties first");
    }
  };



  return (
    <div className="bg-gray-200 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Pricing Section */}
      <div className="bg-white rounded-lg shadow-sm text-center pt-3">
        <h2 className="text-md md:text-lg font-bold mb-3">Unser Angebot für Sie</h2>
        <div className="bg-black rounded-b-xl text-white p-4 overflow-x-auto">
          <div className="text-lg text-start w-[100%] whitespace-nowrap">
            <div className="flex justify-between gap-3">
              <span>Ihr Nettopreis</span>
              <span className="font-bold">€{currentPrice}</span>
            </div>

            {
            firstProduct && firstProduct.SalePercent>0?(
            <div className="flex justify-between gap-3 text-xs text-gray-300">
                <span>Rabatt</span>
                <span className="font-bold">
                  {typeof currentPrice === "number" ? `€-${((firstProduct.SalePercent / 100) * currentPrice).toFixed(2)}` : ""}
                </span>
            </div>
              ):null
            }
            

            <div className="flex justify-between gap-3 text-xs text-gray-300">
              <span>MwSt. (19 %)</span>
              <span className="font-bold">
                {typeof currentPrice === "number" ? `€${((19 / 100) * (currentPrice-((firstProduct.SalePercent / 100) * currentPrice))).toFixed(2)}` : ""}
              </span>
            </div>

            {
            firstProduct && firstProduct.SalePercent>0?(
            <div className="flex justify-between gap-3 font-bold mt-2">
              <span>Ihr Bruttopreis</span>
              <span>
                {typeof currentPrice === "number"
                  ? `€${((currentPrice-((firstProduct.SalePercent / 100) * currentPrice))+((19 / 100) * (currentPrice-((firstProduct.SalePercent / 100) * currentPrice)))).toFixed(2)}`
                  : ""}
              </span>
            </div>
             ):<div className="flex justify-between gap-3 font-bold mt-2">
             <span>Ihr Bruttopreis</span>
             <span>
               {typeof currentPrice === "number"
                 ? `€${((19 / 100) * currentPrice + currentPrice).toFixed(2)}`
                 : ""}
             </span>
           </div>
            }
            <p className="text-[8px] md:text-[10px] text-gray-300 leading-tight mt-1">
              inkl. Druck, Weiterverarbeitung, Versand und <br /> gesetzliche MwSt.
            </p>
          </div>

          <div className="min-w-[200px] whitespace-nowrap flex flex-col">
            {/* Direct link to checkout */}
            <Link to="/" className="w-full">
              <button className="w-full bg-white text-black font-bold text-sm py-1 rounded-lg mt-2">
                Direkt zur Kasse
              </button>
            </Link>

            {/* Add to cart button */}
            <button
              onClick={handleSubmit}
              className="w-full border bg-white text-black font-bold text-sm py-1 rounded-lg mt-2"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>

      {/* No File Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm text-center overflow-x-auto">
        <div className="flex justify-center items-center mb-2 whitespace-nowrap min-w-[200px]">
          <img src={paint} className="w-8 h-6 md:w-12 md:h-8 mr-2" />
          <h3 className="font-semibold text-xs md:text-sm">
            SIE HABEN KEINE EIGENE<br /> DRUCKDATEI?
          </h3>
        </div>
        <a href="https://www.canva.com" target="_blank" rel="noreferrer">
          <button className="bg-black text-xs md:text-sm w-full text-white py-2 px-4 rounded-lg whitespace-nowrap min-w-[200px]">
            Gehen Sie zu Canva
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;


// import React from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Cookies from "universal-cookie";
// import toast from "react-hot-toast";

// import paint from "../../assets/images/paint.png";
// import { addToCart } from "../../Redux/actions/usersAction";

// const Sidebar = ({ currentPrice, selectedOptions, uploadedImage, selectedDelivery }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const cookies = new Cookies();
//   const user = cookies.get("user");

//   // Calculate selected price based on delivery option
//   const calculateSelectedPrice = () => {
//     if (selectedDelivery?.value === "standard") return currentPrice;
//     if (selectedDelivery?.value === "standardPlus") return currentPrice + 20;
//     if (selectedDelivery?.value === "overnight") return currentPrice + 40;
//     return null;
//   };
//   const selectedPrice = calculateSelectedPrice();

//   // Handle submit logic
//   const handleAddToCart = async () => {
//     if (typeof currentPrice !== "number") {
//       toast.error("Please choose properties first");
//       return;
//     }

//     const userId = user?._id;
//     const formData = {
//       productId: id,
//       selectedItems: Object.values(selectedOptions),
//       price: selectedPrice,
//       image: uploadedImage,
//       orderDelivery: selectedDelivery?.label,
//     };

//     const toastId = toast.loading("Processing...");

//     try {
//       await dispatch(addToCart(userId, formData));
//       toast.success("Added to cart successfully!", { id: toastId });
//       navigate("/cart");
//     } catch (error) {
//       toast.error("Something went wrong!", { id: toastId });
//     }
//   };

//   // Calculate tax and gross price
//   const calculateTax = (price) => (price * 0.19).toFixed(2);
//   const calculateGrossPrice = (price) => (price * 1.19).toFixed(2);

//   return (
//     <div className="bg-gray-200 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
//       {/* Pricing Section */}
//       <div className="bg-white rounded-lg shadow-sm text-center pt-3">
//         <h2 className="text-md md:text-lg font-bold mb-3">Unser Angebot für Sie</h2>
//         <div className="bg-black rounded-b-xl text-white p-4 overflow-x-auto">
//           <div className="text-lg text-start w-full whitespace-nowrap">
//             <div className="flex justify-between gap-3">
//               <span>Ihr Nettopreis</span>
//               <span className="font-bold">€{selectedPrice}</span>
//             </div>
//             <div className="flex justify-between gap-3 text-xs text-gray-300">
//               <span>MwSt. (19 %)</span>
//               <span className="font-bold">
//                 {selectedPrice ? `€${calculateTax(selectedPrice)}` : ""}
//               </span>
//             </div>
//             <div className="flex justify-between gap-3 font-bold mt-2">
//               <span>Ihr Bruttopreis</span>
//               <span>
//                 {selectedPrice ? `€${calculateGrossPrice(selectedPrice)}` : ""}
//               </span>
//             </div>
//             <p className="text-[8px] md:text-[10px] text-gray-300 leading-tight mt-1">
//               inkl. Druck, Weiterverarbeitung, Versand und <br /> gesetzliche MwSt.
//             </p>
//           </div>
//           <div className="min-w-[200px] flex flex-col">
//             <Link to="/" className="w-full">
//               <button className="w-full bg-white text-black font-bold text-sm py-1 rounded-lg mt-2">
//                 Direkt zur Kasse
//               </button>
//             </Link>
//             <button
//               onClick={handleAddToCart}
//               className="w-full border bg-white text-black font-bold text-sm py-1 rounded-lg mt-2"
//             >
//               In den Warenkorb
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* No File Section */}
//       <div className="bg-white p-4 rounded-lg shadow-sm text-center overflow-x-auto">
//         <div className="flex justify-center items-center mb-2 whitespace-nowrap min-w-[200px]">
//           <img src={paint} className="w-8 h-6 md:w-12 md:h-8 mr-2" alt="Paint" />
//           <h3 className="font-semibold text-xs md:text-sm">
//             SIE HABEN KEINE EIGENE<br /> DRUCKDATEI?
//           </h3>
//         </div>
//         <a href="https://www.canva.com" target="_blank" rel="noreferrer">
//           <button className="bg-black text-xs md:text-sm w-full text-white py-2 px-4 rounded-lg">
//             Gehen Sie zu Canva
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;