/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import cubeImage from "../../assets/images/cube.png";
import uploadPlaceHolder from "../../assets/images/upload.png";

const FormSection = ({
  firstProduct,
  setCurrentPrice,
  selectedOptions,
  setSelectedOptions,
  setUploadedImage, // Function passed from parent to handle uploaded image
  setSelectedDelivery, // Function passed from parent to handle selected delivery option
  currentUser
}) => {
  const [activeDelivery, setActiveDelivery] = useState("standard"); // Local state for active delivery selection
  const [uploadedFilePreview, setUploadedFilePreview] = useState(null); // Local state for preview

  const onDrop = (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
      setUploadedImage(imageFile);
      setUploadedFilePreview(URL.createObjectURL(imageFile))
  };


  useEffect(() => {
    if (firstProduct?.properties?.length) {
      const matchingProperty = firstProduct.properties.find((property) =>
        property.value.every((value, index) => value === selectedOptions[index])
      );
      setCurrentPrice(matchingProperty ? matchingProperty.price : "Not available");
    }
  }, [selectedOptions, firstProduct]);

  const handleOptionChange = (index, value) => {
    setSelectedOptions((prev) => ({ ...prev, [index]: value }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const deliveryOptions = [
    { label: "Standard ", def: "10 Tage", date: "voraussichtlich 14.11.", value: "standard" },
    { label: "Standard+ " , def:"8 Tage + 20 Euro", date: "am 13.11.", value: "standardPlus" },
    { label: "Overnight",def:"5 Tage + 43 Euro", date: "am 12.11. bis 12 Uhr", value: "overnight" },
  ];

  const handleDeliverySelection = (option) => {
    setActiveDelivery(option.value); // Update local active state
    setSelectedDelivery(option); // Pass selected delivery option to parent
  };

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold">Visitenkarten</h2>
      <p className="text-sm mb-4">BERECHNEN UND DRUCKEN</p>
      <div className="bg-gray-200 p-4 pt-20 rounded-xl">
        <div className="grid grid-cols-1 gap-4">
          {firstProduct &&
            firstProduct.options?.map((field, index) => (
              <div key={index} className="flex items-center gap-4 px-4 md:px-10">
                {field !== "price" && (
                  <>
                    <label className="text-lg font-medium w-1/4">{field}</label>
                    <select
                      className="w-3/4 p-2 border rounded-md"
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    >
                      <option value="">Select {field}</option>
                      {Array.from(
                        new Set(
                          firstProduct.properties.map((value) => value.value[index])
                        )
                      ).map((uniqueValue, optionIndex) => (
                        <option key={optionIndex} value={uniqueValue}>
                          {uniqueValue}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            ))}
        </div>


        {
          currentUser.data&&currentUser?.data?.cart?.length == 0?
        (<div>
          <h3 className="mt-6 mb-2 font-semibold text-lg px-4 md:px-10">Lieferung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deliveryOptions.map((option) => (
  <div
    key={option.value}
    className={`relative bg-white cursor-pointer hover:border-gray-700 p-4 border rounded-lg flex flex-col items-center text-center ${
      activeDelivery === option.value ? "border-4 border-green-500" : "border-2 border-gray-300"
    }`}
    onClick={() => handleDeliverySelection(option)}
  >
    {/* Green dot for the selected box */}
    {activeDelivery === option.value && (
      <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
    )}
    <img src={cubeImage} alt={option.label} />
    <span>{option.label}</span>
    <p className="text-gray-500 text-xs">{option.def}</p>
    {/* <p className="text-gray-500 text-xs">{option.date}</p> */}
  </div>
))}

        </div>
        </div>):null
        }
          <br/>
          <br/>
        <div
          {...getRootProps()}
          className={`bg-gray-50 w-full p-4 rounded-xl flex justify-between items-center cursor-pointer border-2 ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div>
            <h2 className="text-sm font-semibold">Eigenes Design</h2>
            <p className="text-xs text-gray-400">
              {isDragActive
                ? "Lassen Sie die Dateien hier fallen..."
                : "Jetzt hochladen und bearbeiten"}
            </p>
          </div>
          {uploadedFilePreview ? (
            <img
              src={uploadedFilePreview}
              alt="Preview"
              className="w-10 h-8 rounded-md object-cover"
            />
          ) : (
            <img src={uploadPlaceHolder} className="w-10 h-8" alt="Upload Placeholder" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSection;
