/* eslint-disable react/prop-types */

import { useState } from "react";
import Input from "../../../components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { createSlider } from "../../../Redux/actions/SliderAction";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";

const AdminSlider = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.sliders);

  const [slidersData, setSlidersData] = useState([
    {
      title: "",
      paragraph: "",
      description: "",
      link: "",
      image: null,
    },
  ]);

  const [aboutSection, setAboutSection] = useState({
    headTitle: "",
    subTitle: "",
    description1: "",
    description2: "",
    image: null,
  });

  const handleSliderChange = (index, field, value) => {
    const updatedSliders = [...slidersData];
    updatedSliders[index][field] = value;
    setSlidersData(updatedSliders);
  };

  const addNewSlider = () => {
    setSlidersData([
      ...slidersData,
      { title: "", paragraph: "", description: "", link: "", image: null },
    ]);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const formData = new FormData();

    slidersData.forEach((slider, index) => {
      const sliderIndex = `slider${index + 1}`;
      Object.entries(slider).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append(`${sliderIndex}.${key}`, value);
        } else {
          formData.append(`${sliderIndex}.${key}`, value); 
        }
      });
    });

    Object.entries(aboutSection).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append(`AboutSection.${key}`, value);
      } else {
        formData.append(`AboutSection.${key}`, value);
      }
    });

    await dispatch(createSlider(formData)).then((response) => {
      if (!error) {
        toast.success("Sliders created successfully!");
         window.location.href = "/dashboard/slider";
      } else {
        toast.error("Error Creating Sliders.");
      }
    });
  };

  // console.log(aboutSection, "AboutSection");

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-7 w-full">
      <h2 className="text-[30px] font-bold">Schieberegler</h2>
      <div className="px-10 mt-5">
        <form onSubmit={handleSubmit}>
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
                <Input
                  type="text"
                  placeholder="Link"
                  value={slider.link}
                  onChange={(e) =>
                    handleSliderChange(index, "link", e.target.value)
                  }
                />
                <Input
                  type="file"
                  placeholder="Image"
                  onChange={(e) =>
                    handleSliderChange(index, "image", e.target.files[0])
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewSlider}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-600"
          >
            Add New Slider
          </button>

          <div className="mt-10">
            <p className="md:text-2xl sm:text-xl text-lg font-bold md:mb-4 mb-3">
              AboutSection
            </p>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input
                type="text"
                placeholder="Überschrift"
                value={aboutSection.headTitle}
                onChange={(e) =>
                  setAboutSection({
                    ...aboutSection,
                    headTitle: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="Description1"
                value={aboutSection.description1}
                onChange={(e) =>
                  setAboutSection({
                    ...aboutSection,
                    description1: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="Beschreibung"
                value={aboutSection.description2}
                onChange={(e) =>
                  setAboutSection({
                    ...aboutSection,
                    description2: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="SubTitle"
                value={aboutSection.subTitle}
                onChange={(e) =>
                  setAboutSection({ ...aboutSection, subTitle: e.target.value })
                }
              />
              <Input
                type="file"
                placeholder="Image"
                onChange={(e) =>
                  setAboutSection({ ...aboutSection, image: e.target.files[0] })
                }
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

export default AdminSlider;
