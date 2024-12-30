import { useEffect, useState } from "react";
import { FiX, FiFolder } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getAllOrders, updateOrder, updateOrderImage } from "../../Redux/actions/OrderAction";
import toast from "react-hot-toast";
import ReviewModal from "../../components/shared/ReviewModal/ReviewModal";

const OrderOverview = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.orders); // API response structure assumed
  const [page, setPage] = useState(1);
  const [limit] = useState(7); // Fixed limit; you can modify this if needed
  const [popupData, setPopupData] = useState(null);
  const [popupData2, setPopupData2] = useState(null);

  // Fetch orders whenever the page or limit changes
  useEffect(() => {
    dispatch(getAllOrders(limit, page));
  }, [dispatch, limit, page]); // Add `page` and `limit` as dependencies

  // Log all orders for debugging
  useEffect(() => {
    ;
  }, [allOrders]);

  // Filter orders for the current user
  const userOrders = allOrders?.data?.filter(
    (order) => order?.userId?._id === user?._id
  ) || [];

  // Extract pagination metadata from API response
  const totalPages = allOrders?.pagination?.totalPages || 1;

  const handleFileChange = async(e, orderId, item) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      await dispatch(updateOrderImage(orderId,item._id,{
        image: file,
        status:"updated"
      }))
      await dispatch(updateOrder(orderId, { status: "pending" }));
      await dispatch(getAllOrders(limit, page));
    }
    toast.success("design updated successfully")
  };


  const openPopup = (order) => {
    setPopupData(order);
  };

  const openPopup2 = (order) => {
    setPopupData2(order);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const closePopup2 = () => {
    setPopupData2(null);
  };

  // Handle page changes
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="w-[100%] mt-28 bg-gray-300 pt-14">
        <div className="p-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Auftragsübersicht</h1>
            <ReviewModal/>
          </div>
          <hr className="border-gray-400 border-t-1 my-10" />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-lg table-auto hidden sm:table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Benutzername</th>
                <th className="px-4 py-2 text-left">Benutzer-E-Mail</th>
                <th className="px-4 py-2 text-left">Benutzer-Telefon</th>
                <th className="px-4 py-2 text-left">bestellenLieferung</th>
                <th className="px-4 py-2 text-left">Zahlungsmöglichkeit</th>
                <th className="px-4 py-2 text-left">Bestellnummer</th>
                <th className="px-4 py-2 text-left">Artikel</th>
                <th className="px-4 py-2 text-left">Offener Betrag</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">entwirft</th>
              </tr>
            </thead>
            <tbody>
              {userOrders?.map((order) => (
                <tr key={order._id} className={`border-b  ${order?.status=="error in design"?'bg-red-200':'bg-white hover:bg-gray-50'}`}>
                  <td className=" px-4 py-5">{order?.chosenAddress?.userName}</td>
                  <td className=" px-4 py-5">{order?.chosenAddress?.userEmail}</td>
                  <td className=" px-4 py-5">{order?.chosenAddress?.userPhone}</td>
                  <td className=" px-4 py-5">{order?.orderDelivery}</td>
                  <td className=" px-4 py-5">{order?.paymentOption}</td>
                  <td className=" px-4 py-5">{order._id}</td>
                  <td 
                  className=" px-4 py-5 cursor-pointer" 
                  onClick={() => openPopup2(order)}>
                    {order.name}
                  </td>
                  <td className=" px-4 py-5">{order.price} €</td>
                  <td className=" px-4 py-5">{order.status}</td>
                  <td
                    className=" px-4 py-5 cursor-pointer"
                    onClick={() => openPopup(order)}
                  >
                    <FiFolder />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="block sm:hidden">
            {userOrders?.map((order) => (
              <div
                key={order._id}
                className="border-b bg-white rounded-lg shadow p-4 mb-4"
              >
                <p><strong>Benutzername:</strong> {order?.chosenAddress?.userName}</p>
                <p><strong>E-Mail:</strong> {order?.chosenAddress?.userEmail}</p>
                <p><strong>Telefon:</strong> {order?.chosenAddress?.userPhone}</p>
                <p><strong>Lieferung:</strong> {order?.orderDelivery}</p>
                <p><strong>Zahlungsmöglichkeit:</strong> {order?.paymentOption}</p>
                <p><strong>Bestellnummer:</strong> {order._id}</p>
                <p onClick={() => openPopup2(order)}><strong>Artikel:</strong> {order.name}</p>
                <p><strong>Offener Betrag:</strong> {order.price} €</p>
                <p><strong>Status:</strong> {order.status}</p>
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => openPopup(order)}
                >
                  Details anzeigen
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center  py-5">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 bg-gray-300 rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Zurück
          </button>
          <p>
            Seite {page} von {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 bg-gray-300 rounded ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Weiter
          </button>
        </div>

        {/* Popup Modal */}
        {popupData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6 relative">
              <h2 className="text-2xl font-bold mb-4">Order images</h2>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={closePopup}
              >
                <FiX />
              </button>
              <div className="space-y-4">
                {popupData?.images?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>{item.status}</span>
                    {item.status === "error in design"?(
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`file-upload-${item.id}`} // Ensure a unique ID for each item
                          onChange={(e) => handleFileChange(e,popupData._id,item)} // Handle file change for upload
                        />
                        <label
                          htmlFor={`file-upload-${item.id}`}
                          className="text-blue-500 hover:underline cursor-pointer"
                        >
                          Upload
                        </label>
                      </>):(
                      <a
                      href={item.image}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download
                    </a>
                    )}
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popup2 Modal */}
        {popupData2 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6 relative">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={closePopup2}
              >
                <FiX />
              </button>
              <div className="space-y-4">
                {popupData2?.selectedItems?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{item.productName}</span>
                    <span>{item.selected.join(" , ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default OrderOverview;
