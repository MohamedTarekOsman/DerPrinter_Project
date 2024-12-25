import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, getAllBlogs } from "../../../Redux/actions/BlogAction";

const Index = () => {
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  console.log(allBlogs, "all");
  return (
    <div className="mt-7 w-full">
      <h2 className="text-[30px] font-bold">Der Blog</h2>
      <div className="px-10 mt-5">
        <div className="py-12">
          <div className="md:ml-20 max-w-7xl sm:px-6 lg:px-8">
            <Link
              to="/dashboard/blog/create"
              className="bg-green-700 text-white px-8 py-4 text-lg rounded shadow transition-all hover:bg-light-green-600"
            >
              Add new
            </Link>
            <div className="overflow-hidden bg-white sm:rounded-lg mt-12 shadow-2xl">
              <div className="p-6 text-gray-900 dark:text-gray-200">
                <div className="overflow-auto">
                  <table className="w-full mt-4 text-sm text-left rtl:text-right text-blue-gray-600 dark:text-black">
                    <thead className="text-[0.813rem] font-semibold capitalize bg-white text-black border-y border-gray-300">
                      <tr className="text-nowrap">
                        <th className="px-3 py-3">No</th>
                        <th className="px-3 py-3">Name</th>
                        <th className="px-3 py-3">title</th>
                        <th className="px-3 py-3">description1</th>
                        <th className="px-3 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBlogs?.map((blog, index) => (
                        <tr key={index} className="mt-4">
                          <td className="text-lg font-bold py-3 cursor-pointer">
                            {blog._id}
                          </td>
                          <td className="text-lg font-bold py-3 cursor-pointer">
                            {blog.name}
                          </td>
                          <td className="text-lg font-bold py-3 cursor-pointer">
                            {blog.title}
                          </td>
                          <td className="text-lg font-bold py-3 cursor-pointer">
                            {blog.description1}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              to={`/dashboard/blog/${blog._id}`}
                              className="mx-2 font-medium text-lg text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="mx-2 font-medium text-lg text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <Pagination links={courses.meta.links} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
