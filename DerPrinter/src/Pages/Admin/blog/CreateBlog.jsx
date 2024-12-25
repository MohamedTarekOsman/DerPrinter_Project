import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { createBlog } from "../../../Redux/actions/BlogAction";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input";

const CreateBlog = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  // const [link, setLink] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("description3", description3);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("category", category);
    // formData.append("link", link);

    dispatch(createBlog(formData)).then(() => {
      if (!error) {
        toast.success("Blog created successfully!");
        window.location.href = "/dashboard/blog";
      } else {
        toast.error("Error Creating Blog.");
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-7 w-full">
      <h2 className="text-[30px] font-bold">Der Blog</h2>
      <div className="px-10 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 border-b pb-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                error={error?.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Description1"
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Description2"
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Description3"
                value={description3}
                onChange={(e) => setDescription3(e.target.value)}
              />
              <Input
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {/* <Input
                type="text"
                placeholder="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              /> */}

              <Input
                type="file"
                placeholder="Image1"
                onChange={(e) => setImage1(e.target.files[0])}
              />
              <Input
                type="file"
                placeholder="Image2"
                onChange={(e) => setImage2(e.target.files[0])}
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

export default CreateBlog;
