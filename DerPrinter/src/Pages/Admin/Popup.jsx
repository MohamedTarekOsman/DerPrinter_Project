/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTrash, FaArrowDown, FaArrowRight, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../../Redux/actions/productsAction";
import AddProductModal from "./AddProductModal";
import toast from "react-hot-toast";


const Popup = ({ togglePopup, selectedCategoryId, selectedCategoryName }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [grid, setGrid] = useState([[]]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [salePercent, setSalePercent] = useState("");

  useEffect(() => {
    const run = async () => {
      await dispatch(getAllProducts());
    };
    run();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setSalePercent(selectedProduct.SalePercent || "");
      const optionsRow = selectedProduct.options.map((option) => option);
      const propertiesRows = selectedProduct.properties.map((prop) =>
        selectedProduct.options.map((opt) => {
          if (opt === "price") {
            return prop.price;
          } else {
            const optionIndex = selectedProduct.options.indexOf(opt);
            return prop.value[optionIndex] || "";
          }
        })
      );

      setGrid([optionsRow, ...propertiesRows]);
    } else {
      setGrid([]);
      setSalePercent("");
    }
  }, [selectedProduct]);

  const toggleBestSeller = async (product) => {
    try {
      // Toggle the current bestSeller state
      const updatedProduct = { bestSeller: !product.bestSeller };

      // Dispatch the update action
      await dispatch(updateProduct(product._id, updatedProduct));
  
      // Refresh the product list to fetch updated state
      await dispatch(getAllProducts());
  
      toast.success(
        `Product ${updatedProduct.bestSeller ? "marked as" : "removed from"} Best Seller!`
      );
    } catch (err) {
      toast.error("Error updating Best Seller status");
    }
  };
  

  const handleSalePercentChange = async () => {
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct, SalePercent: salePercent };
      try {
        await dispatch(updateProduct(selectedProduct._id, updatedProduct));
        await dispatch(getAllProducts());
        toast.success("Sale percent updated successfully!");
      } catch (err) {
        toast.error("Error updating Sale Percent");
      }
    }
  };

  const addRow = () => {
    const newRow = Array(grid[0].length).fill("");
    setGrid([...grid, newRow]);
  };

  const addColumn = () => {
    setGrid(grid.map((row) => ["", ...row]));
  };

  const removeRow = (rowIndex) => {
    setGrid(grid.filter((_, index) => index !== rowIndex));
  };

  const removeColumn = (columnIndex) => {
    setGrid(grid.map((row) => row.filter((_, index) => index !== columnIndex)));
  };

  const updateCell = (rowIndex, columnIndex, value) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][columnIndex] = value;
    setGrid(updatedGrid);
  };

  const handleSubmit = async () => {
    if (grid.length > 1) {
      const options = grid[0];

      // Extract properties from subsequent rows
      const properties = grid.slice(1).map((row) => {
        const price = row[row.length - 1]; // The last input in the row
        const values = row.slice(0, -1); // All inputs except the last one
        return {
          price,
          value: values,
        };
      });

      // Prepare the final data structure
      const updatedProduct = {
        options,
        properties,
      };

      try {
        await dispatch(updateProduct(selectedProduct._id, updatedProduct));
        await dispatch(getAllProducts());
        toast.success("Options added successfully");
      } catch (err) {
        toast.error("Error");
      }
    } else {
      toast.error("No data to submit");
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await dispatch(deleteProduct(product._id));
      await dispatch(getAllProducts());
      toast.success("Product deleted successfully!");
    } catch (e) {
      toast.error("Error");
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      setLoading(true);
      await dispatch(createProduct(formData));
      await dispatch(getAllProducts());
      setLoading(false);
      setModalOpen(false);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl p-6 relative">
        <button
          onClick={togglePopup}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-5xl"
        >
          &times;
        </button>

        <h2 className="text-center text-xl font-bold mb-6">{selectedCategoryName} Produkte</h2>

        {/* Row of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          <div
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-gray-500 w-full h-40"
          >
            <span className="text-4xl font-bold text-gray-400">+</span>
            <p className="mt-2 text-gray-500">Add Product</p>
          </div>
          {allProducts &&
            allProducts.data
              ?.filter((product) => product.categoryId === selectedCategoryId)
              .map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start rounded-md w-full cursor-pointer relative"
                >
                  <img
                    onClick={() => setSelectedProduct(product)}
                    src={product.image}
                    alt="Product"
                    className="w-full h-40 rounded-md mb-2"
                  />
                  <FaStar
                      size={16}
                      onClick={() => toggleBestSeller(product)}
                      className={`cursor-pointer absolute top-2 right-2 ${
                        product.bestSeller ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  <p className="text-xs text-gray-600 text-center flex gap-5">
                    {product.name}
                    <FaTrash size={16} onClick={() => handleDeleteProduct(product)} />
                  </p>
                </div>
              ))}
        </div>

        <hr className="border-5 border-gray-400 my-5" />

        {selectedProduct && (
          <div className="mb-4 ml-[44%]">
          <label htmlFor="salePercent" className="block text-sm font-medium text-gray-700 mb-1">
            Sale Percent
          </label>
          <input
            id="salePercent"
            type="number"
            value={salePercent}
            min={0}
            max={100}
            onChange={(e) => setSalePercent(e.target.value)}
            onBlur={handleSalePercentChange}
            className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., 10%"
          />
        </div>
        
        )}

        <h2 className="text-center text-lg font-semibold mb-6">BERECHNEN</h2>

 {/* Table */}
 <div className="overflow-x-auto">
          <div className="grid gap-y-4">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex}>
                <div className="flex items-center gap-x-4">
                  {rowIndex === 0 && (
                    <div className="flex items-center gap-x-2">
                      <div
                        className="flex items-center justify-center p-2 bg-gray-300 rounded-full cursor-pointer"
                        onClick={addRow}
                      >
                        <FaArrowDown size={16} />
                      </div>
                      <div
                        className="flex items-center justify-center p-2 bg-gray-300 rounded-full cursor-pointer"
                        onClick={addColumn}
                      >
                        <FaArrowRight size={16} />
                      </div>
                    </div>
                  )}

                  {rowIndex > 0 && (
                    <div className="flex items-center gap-x-2">
                      <div className="p-2 ml-2"></div>
                      <div
                        className="flex items-center justify-center rounded-full p-2 ml-2 cursor-pointer"
                        onClick={() => removeRow(rowIndex)}
                      >
                        <FaTrash size={16} />
                      </div>
                    </div>
                  )}

                  {row.map((cell, columnIndex) => (
                    <div key={columnIndex} className="flex items-center relative">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, columnIndex, e.target.value)
                        }
                        className="p-2 border rounded-md w-24"
                      />
                      {(rowIndex === 0 && columnIndex < row.length) ? (
                        <div
                          className="flex items-center justify-center rounded-full p-2 ml-2 cursor-pointer"
                          onClick={() => removeColumn(columnIndex)}
                        >
                          <FaTrash size={16} />
                        </div>
                      ):(
                        <div className="p-2 ml-2 text-white">
                          <FaTrash size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {rowIndex === 0 && grid.length > 1 && (
                  <hr className="border-gray-300 my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
          onClick={handleSubmit}
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-950">
            Absenden
          </button>
        </div>
      </div>
      <AddProductModal
        selectedCategoryId={selectedCategoryId}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddProduct}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Popup;
