import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSlider } from "../../../Redux/actions/SliderAction";
import Input from "../../../components/ui/Input";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import { getAllCategories } from "../../../Redux/actions/categoriesAction";

const UpdateSlider = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSliders, loading, error } = useSelector((state) => state.sliders);

  const product = useSelector((state) => state.categories.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(()=>{
    ;
  },[product])

  const [slidersData, setSlidersData] = useState([]);

  const [aboutSection, setAboutSection] = useState({
    title: "",
    subTitle: "",
    description1: "",
    description2: "",
    image: null,
  });

  const [hintSection, setHintSection] = useState({
    title: "",
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (allSliders.length > 0) {
      const slider = allSliders.find((item) => item._id === _id);
      if (slider) {
        // ;
        const sliderEntries = Object.entries(slider).filter(([key]) =>
          key.startsWith("slider")
        );
        const sliders = sliderEntries.map(([, value]) => ({
          title: value?.title || "",
          description: value?.description || "",
          paragraph: value?.paragraph || "",
          link: value?.link || "",
          image: value?.image || "",
        }));
        setSlidersData(sliders);

        if (slider.AboutSection) {
          setAboutSection(slider.AboutSection);
        }
        if (slider.HintSection) {
          setHintSection(slider.HintSection);
        }
      } else {
        console.error("Slider not found for _id:", _id);
      }
    } else {
      console.warn("No sliders available in allSliders");
    }
  }, [_id, allSliders]);

  const handleSliderChange = (index, field, value) => {
    const updatedSliders = [...slidersData];
    updatedSliders[index][field] = value;
    ;
    setSlidersData(updatedSliders);
  };

  const handleAboutChange = (field, value) => {
    setAboutSection({
      ...aboutSection,
      [field]: value,
    });
  };

  const handleHintSection = (field, value) => {
    setHintSection({
      ...hintSection,
      [field]: value,
    });
  };

  const handleImageChange = (index, file) => {
    const updatedSliders = [...slidersData];
    updatedSliders[index].image = file || "";
    setSlidersData(updatedSliders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {};

    slidersData.forEach((slider, index) => {
      const sliderIndex = `slider${index + 1}`;
      Object.entries(slider).forEach(([key, value]) => {
        dataToSend[`${sliderIndex}.${key}`] = value;
      });
    });

    Object.entries(aboutSection).forEach(([key, value]) => {
      dataToSend[`AboutSection.${key}`] = value;
    });

    Object.entries(hintSection).forEach(([key, value]) => {
      dataToSend[`HintSection.${key}`] = value;
    });

    await dispatch(updateSlider(_id, dataToSend)).then(() => {
      if (!error) {
        toast.success("Slider updated successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Error updating slider.");
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  // ;

  return (
    <div className="mt-7 w-full">
      <h2 className="text-[30px] font-bold">Update Slider</h2>
      <form onSubmit={handleSubmit} className="px-10 mt-5">
        {slidersData.map((slider, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h3 className="font-bold mb-2">Slider {index + 1}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input
                type="text"
                placeholder="Title"
                value={slider.title}
                onChange={(e) =>
                  handleSliderChange(index, "title", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Description"
                value={slider.description}
                onChange={(e) =>
                  handleSliderChange(index, "description", e.target.value)
                }
              />
              <textarea
                placeholder="Paragraph"
                className="inputLogin"
                value={slider.paragraph}
                onChange={(e) =>
                  handleSliderChange(index, "paragraph", e.target.value)
                }
              />
              <div>
                <select
                  value={slider.link}
                  onChange={(e) =>
                    handleSliderChange(index, "link", e.target.value)
                  }
                  className="inputLogin"
                >
                  <option value="" className="bg-blue-400">
                    {slider.link
                      ? `${product?.find(product => product._id === slider.link)?.name}`
                      : "Link : Select a Product"}
                  </option>
                  {product
                    ?.filter((item) => item._id !== slider.link)
                    .map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                        className="text-black"
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="inputLogin"
                />
                {slider.image && (
                  <img
                    src={
                      typeof slider.image === "string"
                        ? slider.image
                        : URL.createObjectURL(slider.image)
                    }
                    alt={`Slider ${index + 1} Preview`}
                    className="mt-2  h-40 w-40 object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-10">
          <p className="md:text-2xl sm:text-xl text-lg font-bold md:mb-4 mb-3">
            About Section
          </p>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={aboutSection.title}
              onChange={(e) => handleAboutChange("title", e.target.value)}
            />
            <Input
              type="text"
              placeholder="SubTitle"
              value={aboutSection.subTitle}
              onChange={(e) => handleAboutChange("subTitle", e.target.value)}
            />
            <textarea
              placeholder="Description1"
              className="inputLogin"
              value={aboutSection.description1}
              onChange={(e) =>
                handleAboutChange("description1", e.target.value)
              }
            />
            <textarea
              placeholder="Description2"
              className="inputLogin"
              value={aboutSection.description2}
              onChange={(e) =>
                handleAboutChange("description2", e.target.value)
              }
            />
            <div>
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleAboutChange("image", e.target.files[0])}
                className="inputLogin"
              />
              {aboutSection.image && (
                <img
                  src={
                    typeof aboutSection.image === "string"
                      ? aboutSection.image
                      : URL.createObjectURL(aboutSection.image)
                  }
                  alt="About Section Preview"
                  className="mt-2 h-40 w-40 object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="md:text-2xl sm:text-xl text-lg font-bold md:mb-4 mb-3">
            Hint Section
          </p>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={hintSection.title}
              onChange={(e) => handleHintSection("title", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Name"
              value={hintSection.name}
              onChange={(e) => handleHintSection("name", e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="inputLogin"
              value={hintSection.description}
              onChange={(e) => handleHintSection("description", e.target.value)}
            />
            <div>
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleHintSection("image", e.target.files[0])}
                className="inputLogin"
              />
              {hintSection.image && (
                <img
                  src={
                    typeof hintSection.image === "string"
                      ? hintSection.image
                      : URL.createObjectURL(hintSection.image)
                  }
                  alt="About Section Preview"
                  className="mt-2 h-40 w-40 object-cover"
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSlider;
