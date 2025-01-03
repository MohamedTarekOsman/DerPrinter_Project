/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  updateCategory,
} from "../../Redux/actions/categoriesAction";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const EditCategory = ({
  handleEditCategory,
  selectedCategoryId,
  categories,
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);

  console.log("EditCategory", selectedCategoryId);

  // console.log("categories", categories);
  const [title, setTitle] = useState([""]);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [name, setName] = useState("");
  const [prop1, setProp1] = useState("");
  const [prop2, setProp2] = useState("");
  const [prop3, setProp3] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedCategoryId) {
      const selectedCategory = categories.find(
        (cat) => cat._id === selectedCategoryId
      );
      if (selectedCategory) {
        setTitle(selectedCategory.title || "");
        setDescription1(selectedCategory.description1 || "");
        setDescription2(selectedCategory.description2 || "");
        setName(selectedCategory.name || "");
        setProp1(selectedCategory.prop1 || "");
        setProp2(selectedCategory.prop2 || "");
        setProp3(selectedCategory.prop3 || "");
        setHeadLine(selectedCategory.headLine || "");
        setImage(selectedCategory.image || "");
      }
    }
  }, [selectedCategoryId, categories]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    name && formData.append("name", name);
    title && formData.append("title", title);
    description1 && formData.append("description1", description1);
    description2 && formData.append("description2", description2);
    image && formData.append("image", image);
    prop1 && formData.append("prop1", prop1);
    prop2 && formData.append("prop2", prop2);
    prop3 && formData.append("prop3", prop3);
    headLine && formData.append("headLine", headLine);
    dispatch(updateCategory(selectedCategoryId, formData)).then(() => {
      if (!error) {
        toast.success("Category Updated successfully!");
        handleEditCategory();
      } else {
        toast.error("Failed to update category");
      }
    });
    // try {
    //   await dispatch(updateCategory(selectedCategoryId, formData));
    //   toast.success("Category Updated successfully!");
    //   handleEditCategory();
    // } catch (_) {
    //   toast.error("Failed to update category");
    // }
  };

  useEffect(() => {
    const run = async () => {
      await dispatch(getAllCategories());
    };
    run();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl p-6 relative">
        <button
          onClick={handleEditCategory}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-5xl"
        >
          &times;
        </button>
        <h2 className="text-center text-xl font-bold mb-6">
          Kategorie bearbeiten
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between md:flex-row flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                type="text"
                placeholder="Beschreibung"
                className="inputLogin"
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
              />
              <Input
                type="text"
                placeholder="prop1"
                value={prop1}
                onChange={(e) => setProp1(e.target.value)}
              />
              <Input
                type="text"
                placeholder="prop3"
                value={prop3}
                onChange={(e) => setProp3(e.target.value)}
              />
            </div>

            {/* image */}
            <div className="w-full flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Überschrift"
                value={headLine}
                onChange={(e) => setHeadLine(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Beschreibung"
                className="inputLogin"
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
              />
              <Input
                type="text"
                placeholder="prop2"
                value={prop2}
                onChange={(e) => setProp2(e.target.value)}
              />

              {/* <div
                className="w-full"
                style={{
                  height: "calc(2 * 38px)",
                }}
              >
                <Input
                  type="file"
                  placeholder="Image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div> */}

              <div>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Image"
                  onChange={(e) => handleImageChange(e, setImage)}
                />
                {image && (
                  <img
                    src={image}
                    className="h-24 w-24 object-contain"
                    alt="img"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-950"
            >
              Absenden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
