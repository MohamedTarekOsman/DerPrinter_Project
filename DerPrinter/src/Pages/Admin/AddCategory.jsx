/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../Redux/actions/categoriesAction";
import { getAllProducts } from "../../Redux/actions/productsAction";
import Loader from "../../components/Loader";

const AddCategory = ({ handleCategory }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.categories.allCategories);

  const [title, setTitle] = useState([""]);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [name, setName] = useState("");
  const [prop1, setProp1] = useState("");
  const [prop2, setProp2] = useState("");
  const [prop3, setProp3] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [image, setimage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("prop1", prop1);
    formData.append("prop2", prop2);
    formData.append("prop3", prop3);
    formData.append("headLine", headLine);

    await dispatch(createCategory(formData, handleCategory));
  };

  useEffect(() => {
    const run = async () => {
      await dispatch(getAllProducts());
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
          onClick={handleCategory}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-5xl"
        >
          &times;
        </button>
        <h2 className="text-center text-xl font-bold mb-6">
          Neues Produkt hinzufügen
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
                className=" inputLogin"
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
              <div
                className="w-full"
                style={{
                  height: "calc(2 * 38px)",
                }}
              >
                <Input
                  type="file"
                  placeholder="Image"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </div>

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

export default AddCategory;
