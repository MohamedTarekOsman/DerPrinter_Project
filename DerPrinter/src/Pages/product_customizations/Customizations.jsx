/* eslint-disable react-hooks/exhaustive-deps */
 
import { useDispatch, useSelector } from "react-redux";
import FormSection from "../../components/product_customizations/FormSection";
import Sidebar from "../../components/product_customizations/Sidebar";
import { useEffect, useState } from "react";
import { getProductById } from "../../Redux/actions/productsAction";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { getUserById } from "../../Redux/actions/usersAction";

const Customizations = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.oneProduct);
  const currentUser=useSelector((state) => state.users.oneUser);
  const {id} =useParams();
  useEffect(() => {
    const run = async () => {
      if (user){
        await dispatch(getUserById(user._id))
      }
      await dispatch(getProductById(id));
    };
    run();
  }, [user,id]);
  const [currentPrice, setCurrentPrice] = useState("Not available");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState({ label: "Standard ", def: "10 Tage", date: "voraussichtlich 14.11.", value: "standard" });


return (
  <div className="min-h-screen bg-white flex flex-col px-4 py-10 lg:px-20 items-center">
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg w-full p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-4 gap-6">
      {/* FormSection for all screen sizes */}
      <div className="lg:col-span-3">
        <FormSection 
          firstProduct={product ? product.data : {}} 
          setCurrentPrice={setCurrentPrice} 
          selectedOptions={selectedOptions} 
          setSelectedOptions={setSelectedOptions}
          setUploadedImage={setUploadedImage} 
          setSelectedDelivery={setSelectedDelivery} 
          currentUser={currentUser}
        />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-auto">
        <Sidebar 
          firstProduct={product ? product.data : {}} 
          currentPrice={currentPrice} 
          selectedOptions={selectedOptions} 
          uploadedImage={uploadedImage} 
          selectedDelivery={selectedDelivery} 
        />
      </div>
    </div>
  </div>
);

};

export default Customizations;
