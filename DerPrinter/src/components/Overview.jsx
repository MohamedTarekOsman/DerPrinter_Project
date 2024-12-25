/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import recycle from "../assets/svg/recycle-bin.svg";
import Popup from "../Pages/Admin/Popup";
import OrdersDashboard from "../Pages/Admin/OrdersDashboard";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../Redux/actions/categoriesAction";
import toast from "react-hot-toast";
import AddCategory from "../Pages/Admin/AddCategory";

const Overview = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const categories = useSelector((state) => state.categories.allCategories);

  const togglePopup = (category) => {
    setSelectedCategoryId(category._id);
    setSelectedCategoryName(category.name);
    setShowPopup(!showPopup);
  };

  const handleCategory = () => {
    setShowCategory(!showCategory);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    speed: 10,
    slidesToScroll: 1,
    dragFree: true,
  });

  useEffect(() => {
    const run = async () => {
      await dispatch(getAllCategories());
    };
    run();
  }, []);

  const handleDelete = async (id) => {
    try {
      dispatch(deleteCategory(id));
      toast.success("Category deleted successfully!");
    } catch (_) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      <div className="mt-7 w-full">
        <h2 className="text-[30px] font-bold">Überblick</h2>
        <div className="px-10 mt-5">
          <h4 className="text-[30px] font-bold text-black/70">
            Verwalten Sie Ihre Produkte
          </h4>
          <p className="text-[18px] text-black/70">
            Sie können Ihre neuen Produkte hinzufügen
          </p>

          <div className="mt-10">
            <div className="relative">
              {/* Embla Carousel */}
              <div ref={emblaRef} className="embla">
                <div className="embla__container flex gap-4 items-start justify-start rounded-md w-full h-full">
                  <button
                    onClick={handleCategory}
                    className="relative min-w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-500"
                  >
                    <span className="text-4xl font-bold text-gray-400 absolute">
                      +
                    </span>
                    <p className="text-gray-500 text-sm absolute bottom-8">
                      Add Category
                    </p>
                  </button>
                  {categories && categories.length > 0 ? (
                    categories?.map((category) => (
                      <div key={category._id}>
                        <div
                          onClick={() => togglePopup(category)}
                          className="relative w-40 h-40 rounded-md cursor-pointer"
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-lg font-bold px-4 py-2">
                              {category.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                          <button onClick={() => handleDelete(category._id)}>
                            <img src={recycle} alt="delete" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className=" my-auto font-bold text-red-400">
                      keine Kategorien hier
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="block h-[2px] w-full bg-gray-300 my-8" />
        <OrdersDashboard />
      </div>

      {/* Popup */}
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          selectedCategoryId={selectedCategoryId}
          selectedCategoryName={selectedCategoryName}
        />
      )}

      {showCategory && (
        <AddCategory categories={categories} handleCategory={handleCategory} />
      )}
    </>
  );
};

export default Overview;
