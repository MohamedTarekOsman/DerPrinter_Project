import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, updateBlog } from "../../../Redux/actions/BlogAction";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/Input";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
// import { uploadImg } from "../../../lib/utils";

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { loading, error, allBlogs } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  // const [link, setLink] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const blog = allBlogs.find((blog) => blog._id === _id);

    if (blog) {
      setName(blog.name);
      setTitle(blog.title);
      setDescription1(blog.description1);
      setDescription2(blog.description2);
      setDescription3(blog.description3);
      // setLink(blog.link);
      setCategory(blog.category);
      setImage1(blog.image1);
      setImage2(blog.image2);
    }
  }, [_id, allBlogs]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // const displayImage = (image) => {
  //   if (image && image instanceof File) {
  //     return URL.createObjectURL(image);
  //   }
  //   return "";
  // };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  ;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    name && formData.append("name", name);
    title && formData.append("title", title);
    description1 && formData.append("description1", description1);
    description2 && formData.append("description2", description2);
    description3 && formData.append("description3", description3);
    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    // link && formData.append("link", link);
    category && formData.append("category", category);
    // formData.append("put");

    dispatch(updateBlog(_id, formData)).then(() => {
      if (!error) {
        toast.success("Blog updated successfully!");
        window.location.href = "/dashboard/blog";
      } else {
        toast.error("Error updated Blog.");
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-7 w-full">
      <h2 className="text-[30px] font-bold">Blog aktualisieren</h2>
      <form onSubmit={handleSubmit} className="px-10 mt-5">
        <div className="mb-6 border-b pb-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImage1)}
              />
              {image1 && (
                <img
                  src={image1}
                  className="h-24 w-24 object-contain"
                  alt="img1"
                />
              )}
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImage2)}
              />
              {image2 && (
                <img
                  src={image2}
                  className="h-24 w-24 object-contain"
                  alt="img2"
                />
              )}
            </div>

            {/* <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage1(e.target.files[0])}
                className="inputLogin"
              />
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage2(e.target.files[0])}
                className="inputLogin"
              />
            </div> */}
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

export default UpdateBlog;
