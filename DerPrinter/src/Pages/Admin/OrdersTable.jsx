/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaUser } from "react-icons/fa";
import menu from "../../assets/svg/menu-burger 1.svg";
import calendar from "../../assets/svg/calendar (1).svg";
import box from "../../assets/svg/box-open-full 1.svg";
import brand from "../../assets/svg/brand 1.svg";
import stats from "../../assets/svg/stats 1.svg";
import graphic from "../../assets/svg/graphic-design 1.svg";
import orderDelivery from "../../assets/images/delivery-car.png";
import wallet from "../../assets/images/wallet.png";
import { useState } from "react";
import UserData from "./UserData";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "../../Redux/actions/OrderAction";
import toast from "react-hot-toast";
import PopupDesign from "./PopupDesign";
import { FiX } from "react-icons/fi";

const statuses = [
  { value:"pending",
    Text:"Ausstehend"
  },
  { value:"error in design",
    Text:"Mangelhafte Druckdaten"
  },
  { value:"delivering",
    Text:"versendet"
  },
  { value:"completed",
    Text:"In Deuck"
  },
  { value:"processing",
    Text:"In Bearbeitung"
  },
];

const OrdersTable = ({ statusFilteredOrders, allOrders }) => {
  const dispatch = useDispatch();
  const [orderStatuses, setOrderStatuses] = useState({});
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [popupData2, setPopupData2] = useState(null);

  const closePopup = async () => {
    setSelectedImage(null);
    setShowPopup(false);
    // window.location.reload(false);
  };

  const openPopup2 = (order) => {
    setPopupData2(order);
  };

  const closePopup2 = () => {
    setPopupData2(null);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupOpen = (orderId) => {
    const orderData = allOrders.find((order) => order._id === orderId);
    setSelectedUserData(orderData);
    setShowPopup(true);
  };

  const handleUpdated = async (id, status) => {
    if (status !== orderStatuses[id]) {
      try {
        await dispatch(updateOrder(id, { status }));
        toast.success("Status updated successfully!");
      } catch (_) {
        toast.error("Failed to update Status");
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (newStatus !== orderStatuses[orderId]) {
      setOrderStatuses((prevStatuses) => ({
        ...prevStatuses,
        [orderId]: newStatus,
      }));

      try {
        await dispatch(updateOrder(orderId, { status: newStatus }));
        await dispatch(getAllOrders(10000, 1));
        toast.success("Status updated successfully!");
      } catch (_) {
        toast.error("Failed to update Status");
      }
    }
  };

  const handleImageSelect = (imageObj, orderId) => {
    const orderData = allOrders.find((order) => order._id === orderId);
    if (orderData) {
      setSelectedImage({
        ...imageObj,
        orderId: orderId,
        orderData,
      });
    } else {
      console.error("Order not found");
    }
  };

  return (
    <>
      <div className="min-w-[300px] w-full">
        <table className="w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 px-2">
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <FaUser />
                  Benutzerdaten
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                  <img
                    src={menu}
                    alt="menu"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Bestellnummer
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center  gap-2 text-sm md:text-base">
                  <img
                    src={calendar}
                    alt="calendar"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Bestelldatum
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <img src={box} alt="box" className="w-3 h-3 md:w-4 md:h-4" />
                  Produktname
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <img
                    src={brand}
                    alt="brand"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Produktpreis
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                  <img
                    src={wallet}
                    alt="wallet"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Zahlungsoption
                </div>
              </th>

              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center justify-center gap-1 text-sm md:text-base ">
                  <img
                    src={orderDelivery}
                    alt="orderDelivery"
                    className="w-3 h-3 md:w-5 md:h-5"
                  />
                  Lieferung
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                  <img
                    src={stats}
                    alt="stats"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Status
                </div>
              </th>
              <th className="p-2 md:p-3 border-b font-medium">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                  <img
                    src={graphic}
                    alt="graphic"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  Design
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {statusFilteredOrders.length > 0 ? (
              statusFilteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className={` ${
                    order?.status == "error in design"
                      ? "bg-red-200"
                      : order?.images?.some(
                          (image) => image.status === "updated"
                        )
                      ? "bg-green-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td
                    className="p-2 md:p-3 border-b border-gray-200 cursor-pointer"
                    onClick={() => handlePopupOpen(order?._id)}
                  >
                    {order?.chosenAddress?.userName}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {order?.id}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {new Date(order?.createdAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className="p-2 md:p-3 border-b border-gray-200"
                    onClick={() => openPopup2(order)}
                  >
                    {order?.name}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {order?.price.toFixed(2)}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {order?.paymentOption}
                  </td>

                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {order?.orderDelivery}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    <select
                      value={orderStatuses[order?._id] || order.status}
                      onChange={(e) => {
                        handleUpdated(
                          order?._id,
                          orderStatuses[order?._id] || order.status
                        );
                        handleStatusChange(order?._id, e.target.value);
                      }}
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Wählen
                      </option>
                      {statuses.map((status, idx) => (
                        <option key={idx} value={status.value}>
                          {status.Text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    <select
                      className="p-2 border rounded text-blue-500 cursor-pointer"
                      onChange={(e) => {
                        const selectedIndex = e.target.selectedIndex;
                        const selectedImageObj =
                          order?.images[selectedIndex - 1];
                        if (selectedImageObj) {
                          handleImageSelect(selectedImageObj, order?._id);
                        }
                      }}
                    >
                      {order?.images?.length > 0 ? (
                        <>
                          <option value="">Wählen</option>
                          {order?.images?.map((imageObj, index) => (
                            <option key={index} value={imageObj.image}>
                              {/* Image {index + 1} */}
                              {order.name.trim().split(",")[index]}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="null">Keine Bilder verfügbar</option>
                      )}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-lg text-red-400 font-bold text-center p-4"
                >
                  Es liegen keine Anfragen vor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && selectedUserData && (
        <UserData
          togglePopup={togglePopup}
          data={selectedUserData}
        />
      )}

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

      {selectedImage && (
        <PopupDesign
          closePopup={closePopup}
          selectedImage={selectedImage}
          // order={selectedImage.orderData}
        />
      )}
    </>
  );
};

export default OrdersTable;
