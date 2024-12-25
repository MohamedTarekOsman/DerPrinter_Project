/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const AddProductModal = ({ isOpen, onClose, onSubmit, isLoading, selectedCategoryId }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

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
    if (file && name) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file); // Attach file as "image"
      formData.append("categoryId",selectedCategoryId) 
      console.log(file);
      onSubmit(formData);
    } else {
      alert("Please provide both an image and a name.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Neues Produkt hinzufügen</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bild</label>
          <div
            {...getRootProps()}
            className={`border-dashed border-2 p-6 rounded-md flex items-center justify-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image, or click to select"}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Produktname</label>
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
              isLoading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Fügend..." : "Senden"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddProductModal