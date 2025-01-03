/* eslint-disable no-unused-vars */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, getUserById } from '../../Redux/actions/usersAction';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
const Cart = () => {
  const [delivaryPrice,setDelevaryPrice]=useState(0)
  const cookies = new Cookies();
  const user = cookies.get("user");
  const dispatch = useDispatch();
  const userRes = useSelector(state => state.users.oneUser);

  useEffect(() => {
    const run = async () => {
      await dispatch(getUserById(user._id));
    };
    run();
  }, [dispatch, user]);

  const cartItems = userRes?.data?.cart || []; 
  useEffect(() => {
    if(userRes?.data?.cart &&userRes?.data?.cart?.length>0 && userRes?.data?.cart[0].orderDelivery=="Standard+ "){
      setDelevaryPrice(20)
    }else if(userRes?.data?.cart &&userRes?.data?.cart?.length>0 && userRes?.data?.cart[0].orderDelivery=="Overnight"){
      setDelevaryPrice(43)
    }else{  
      setDelevaryPrice(0)
    }
  }, [userRes]);


  const handleDeleteItem = async (item) => {
    try {
      
      ;
      toast.success("prdouct deleted successfully")
      await dispatch(deleteFromCart(user._id, {productId: item?.product?._id}));
      await dispatch(getUserById(user._id));
    } catch (error) {
      console.error("Error while deleting item:", error);
      toast.error("Error")
    }
  };
  
  return (
    <div>
      <div className='w-[90%] m-auto'>
        <h2 className='font-bold text-3xl my-10'>Warenkorb</h2>
        <hr className='h-8 font-bold'/>
        {/* <p className='text-gray-700'>
          Überprüfen und bearbeiten Sie hier die Eigenschaften der Artikel in Ihrem Warenkorb. Vergeben Sie einen Projektnamen um Ihren Artikel später leicht nachverfolgen zu können.
        </p> */}
        {/* <hr className='h-8 font-bold'/> */}

        {/* Add Product Button */}
        <div className='w-full md:w-80 p-2 text-white bg-black rounded-lg flex justify-between items-center my-5 cursor-pointer'>
          <Link to="/" className='flex'>
          <MdKeyboardArrowLeft size={30} />
          <p className='text-xl'>Weitere Produkte hinzufügen</p>
          </Link>
        </div>
        

        {/* Product Details */}
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={item._id}>
              <div className='flex justify-between items-end'>
                <div className='flex flex-col md:flex-row mb-5'>
                  <div className="border-solid border-2 w-full md:w-[40%]">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-auto" />
                  </div>
                  <div className='ml-0 md:ml-5 mt-5 md:mt-0 flex flex-col items-start justify-center'>
                    <h2 className='font-bold text-2xl'>{item.product.name}</h2>
                    <p className='text-gray-600'>Bestellung: {item.orderDelivery}</p>
                    <p className='text-gray-600'>Ausgewählte Artikel: {item.selectedItems.join(", ")}</p>
                    <p className='text-gray-600'>Preis: {item.price}€</p>
                  </div>
                </div>
                <div className='w-[30%] text-right pb-3 mr-5'>
                <p className='font-bold text-lg cursor-pointer text-red-500 whitespace-nowrap' onClick={()=>{handleDeleteItem(item)}}>
                    Artikel löschen
                </p>
                </div>

              </div>
              <hr />

              {/* Action Buttons */}
              <div className='flex flex-col md:flex-row my-10 justify-between'>
                <div className='flex justify-between items-center md:gap-5'>
                  <p className='font-bold text-xl'>Nettopreis</p>
                  <p className='font-bold text-xl'>{item.price} €</p>
                </div>
              </div>
              <hr/>
            </div>
          ))
        ) : (
          <p className='text-gray-700 text-center my-10'>Derzeit liegen keine Produkte in Ihrem Warenkorb.</p>
        )}

        {/* Pricing Summary */}
        <div className='flex py-5 justify-between md:justify-end'>
          <div className='mr-24 md:mr-48 text-xl font-semibold'>
            <p className='mb-10'>Nettopreis</p>
            <p className='mb-10'>MwSt. (19 %)</p>
            <p className='mb-10'>Lieferung</p>
            <p className='mb-10'>Gesamtpreis</p>
          </div>
          <div className='text-xl font-bold flex flex-col items-end'>
            <p className='mb-10'>
              {(cartItems.reduce((total, item) => total + item.price, 0)-(cartItems.reduce((total, item) => total + item.price, 0)*.19)).toFixed(2)} €
            </p>
            <p className='mb-10'>
            {(cartItems.reduce((total, item) => total + item.price, 0)*.19).toFixed(2)} €
              {/* {(cartItems.reduce((total, item) => total + item.product.SalePercent>0 ?(item.price-((item.product.SalePercent/100)*item.price)):item.price, 0) * 0.19).toFixed(2)}€ */}
            </p>
            <p className='mb-10'>
              {delivaryPrice} €
              {/* {(cartItems.reduce((total, item) => total + item.product.SalePercent>0 ?(item.price-((item.product.SalePercent/100)*item.price)):item.price, 0) * 0.19).toFixed(2)}€ */}
            </p>
            <p className='mb-10'>
            {(cartItems.reduce((total, item) => total + item.price, 0)+delivaryPrice).toFixed(2)} €

            </p>
          </div>
        </div>
        <hr/>

        {/* Footer Buttons */}
        <div className='flex flex-col md:flex-row justify-between mb-20 mt-5 gap-5'>
          <Link to="/">
          <div className='w-full md:w-80 p-2 text-white bg-black rounded-lg flex justify-between items-center cursor-pointer'>
            <MdKeyboardArrowLeft size={30} />
            <p className='text-xl'>Weitere Produkte hinzufügen</p>
          </div>
          </Link>
          {cartItems.length > 0 ?<Link to="/AddressBook">
          <div className='w-full md:w-80 p-2 text-white bg-black rounded-lg flex justify-between items-center cursor-pointer'>
            <p className='text-xl'>Zur Kasse gehen</p>
            <MdKeyboardArrowRight size={30} />
          </div>
          </Link>:null}
          
        </div>
        <p className='text-center text-xl mb-10'>Bei Zahlungsart Rechnung erhalten Sie mit Fertigstellung Ihres Auftrages eine Rechnung per E-Mail.</p>
      </div>
    </div>
  );
};

export default Cart;
