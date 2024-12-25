import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { clearCartAndResetUser, getUserById, updateCartOptions } from "../../Redux/actions/usersAction";
import toast from "react-hot-toast";
import { createOrder } from "../../Redux/actions/OrderAction";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(""); // Track the selected method
  const cookies = new Cookies();
  const user = cookies.get("user");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const userRes = useSelector(state => state.users.oneUser);
  useEffect(() => {
    const run = async () => {
      await dispatch(getUserById(user._id));
    };
    run();
  }, [dispatch, user]);


  const handleSelect = async(method) => {
    setSelectedMethod(method);
    await dispatch(updateCartOptions(user._id,{
      paymentOption:method
    }))
    // toast.success(`payment method : ${method}`)
    console.log(userRes)
  };

  const handleSelectedMethod = async () => {
    if (userRes.data) {
      console.log(userRes.data)
      const productNames = userRes.data.cart
        .map(item => item.product.name)
        .join(', ');

        const selectedItems = userRes.data.cart.map(item => ({
          productName: item.product.name,
          selected: item.selectedItems,
      }));
      


      // const productImages = userRes.data.cart.map(item => item.product.image);
      const productImages = userRes.data.cart.map(item => ({
        image: item.image,
        status: "pending",
    }));
    

      const totalPrice = userRes.data.cart
      .reduce((sum, item) => sum + item.price, 0);
  
      try{
        await dispatch(createOrder({
          name: productNames,
          paymentOption: selectedMethod,
          orderDelivery:userRes?.data?.cart[0]?.orderDelivery,
          userId: user._id,
          price: totalPrice+(totalPrice*19/100),
          status:"pending",
          chosenAddress:userRes?.data?.addresses[userRes.data.chosenAddress],
          images:productImages,
          selectedItems:selectedItems
        }));
        await dispatch(clearCartAndResetUser(user._id));
        toast.success("Order created successfully");
  
        navigate('/OrderOverview');
      }catch(e){
        console.log(e);
        toast.error("Error in creating Order");
      }
 // Navigate to a confirmation page, for example
    }
  };
  


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Choose Payment Method</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Cash Option */}
        <div
          onClick={() => handleSelect("Cash")}
          className={`border ${
            selectedMethod === "Cash" ? "border-blue-500" : "border-gray-300"
          } rounded-lg p-4 cursor-pointer text-center hover:shadow-lg`}
        >
          <p className="text-lg font-bold">Cash</p>
          {selectedMethod === "Cash" && <FiCheck className="text-blue-500 text-2xl mt-2" />}
        </div>

        {/* Visa Option */}
        <div
          onClick={() => handleSelect("Visa")}
          className={`border ${
            selectedMethod === "Visa" ? "border-blue-500" : "border-gray-300"
          } rounded-lg p-4 cursor-pointer text-center hover:shadow-lg`}
        >
          <p className="text-lg font-bold">Visa</p>
          {selectedMethod === "Visa" && <FiCheck className="text-blue-500 text-2xl mt-2" />}
        </div>
      </div>

      {/* Continue Button */}
      
      <button
        onClick={handleSelectedMethod}
        disabled={!selectedMethod} // Disable button if no method is selected
        className={`px-6 py-3 rounded-lg font-bold text-white ${
          selectedMethod
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
      
    </div>
  );
};

export default PaymentMethod;
