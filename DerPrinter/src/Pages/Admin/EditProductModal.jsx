/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const UpdateProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  selectedProduct,
}) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
        console.log(selectedProduct)
      setName(selectedProduct.name || "");
      setFile(null); // Reset file selection
    }
  }, [selectedProduct]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile); // Store the file for upload
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = () => {
    if (name) {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("image", file); // Attach the new file
      }

      onSubmit(selectedProduct._id,formData);
    } else {
      alert("Please provide a product name.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Produkt bearbeiten</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bild
          </label>
          <div
                {...getRootProps()}
                className={`border-dashed border-2 p-6 rounded-md flex items-center justify-center cursor-pointer w-full ${
                    isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
                }`}
                >
                <div className="flex flex-col items-center justify-center w-full overflow-hidden">
                    <input {...getInputProps()} />
                    {file ? (
                    <p className="text-sm text-gray-600 truncate">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                    ) : selectedProduct?.image ? (
                    <p className="text-sm text-gray-600 truncate">
                        Aktuelles Bild vorhanden: {selectedProduct.image}
                    </p>
                    ) : (
                    <p className="text-sm text-gray-500 truncate">
                        {isDragActive
                        ? "Drop the image here"
                        : "Drag & drop an image, or click to select"}
                    </p>
                    )}
                </div>
                </div>

        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Produktname
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter product name"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={isLoading}
          >
            Abbrechen
          </button>
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-md ${
              isLoading
                ? "bg-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Aktualisieren..." : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
