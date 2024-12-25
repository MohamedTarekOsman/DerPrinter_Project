/* eslint-disable react/prop-types */

const UserData = ({ togglePopup, data }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative overflow-y-auto sm:w-4/5 md:w-3/5 lg:w-2/5">
        <button
          onClick={togglePopup}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
          Benutzerdaten
        </h2>

        {data ? (
          <div>
            <div className="space-y-4">
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Name:
                </span>
                <span className="text-lg text-gray-900">{data?.userName}</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Email:
                </span>
                <span className="text-lg text-gray-900">{data?.userEmail}</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Phone:
                </span>
                <span className="text-lg text-gray-900">{data?.userPhone}</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Address:
                </span>
                <span className="text-lg text-gray-900">{data?.address}</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Details:
                </span>
                <span className="text-lg text-gray-900">
                  {data?.addressDetails}
                </span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  City:
                </span>
                <span className="text-lg text-gray-900">{data?.city}</span>
              </div>
              <div className="flex justify-center gap-3">
                <span className="text-lg font-semibold text-gray-700">
                  Postal Code:
                </span>
                <span className="text-lg text-gray-900">
                  {data?.postalCode}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-lg text-red-500 font-bold text-center p-4">
            Es liegen keine Anfragen vor
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
