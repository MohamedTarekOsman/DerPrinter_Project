/* eslint-disable react/prop-types */

import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getAllOrders, updateImageStatus } from "../../Redux/actions/OrderAction";

const statuses = [
  { 
    value:"success",
    Text:"Erfolg"
  },
  { 
    value:"error in design",
    Text:"Fehler im Design"
  },
  { 
    value:"updated",
    Text:"aktualisiert"
  },
];

const PopupDesign = ({ closePopup, selectedImage }) => {
  const dispatch = useDispatch();
  const [imgStatus, setImgStatus] = useState(selectedImage.status);

  const handleStatusChange = async (newStatus) => {
    ;
    if (newStatus !== imgStatus) {
      ;
      try {
        ;
        await dispatch(updateImageStatus(selectedImage.orderId, selectedImage._id, newStatus));
        await dispatch(getAllOrders(10000, 1));
        ;
        toast.success("Status updated successfully!");

        setImgStatus(newStatus);
      } catch (error) {
        toast.error("Failed to update status");
        console.error("Error updating status:", error);
      }
    }
  };
  ;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closePopup}
    >
      <div
        className="bg-white p-4 rounded shadow-lg sm:w-4/5 md:w-3/5 lg:w-2/5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          className="text-red-500 hover:text-gray-900 text-3xl focus:outline-none"
        >
          &times;
        </button>

        {/* عرض الصورة */}
        {selectedImage && (
            selectedImage?.image?.match(/\.(png|jpg|jpeg|gif)$/i) ? (
                <img
                    src={selectedImage?.image}
                    alt="Selected"
                    className="max-w-[500px] max-h-[500px] mb-4 mx-auto w-full"
                />
            ) : (
                <a
                    href={selectedImage?.image}
                    download
                    className="text-blue-500 m-5"
                >
                    Datei herunterladen
                </a>
            )
        )}

        <div className="flex justify-between items-center mt-3">
          <p>
            ID: <span className="font-bold">{selectedImage?._id}</span>
          </p>
          <div className="p-2 md:p-3">
            {/* اختيار الحالة من القائمة المنسدلة */}
            <select
              value={imgStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Choose
              </option>
              {statuses.map((status, idx) => (
                <option key={idx} value={status.value}>
                  {status.Text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDesign;
