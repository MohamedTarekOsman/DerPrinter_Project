import baseUrl from "../Api/baseUrl";

const useDeleteCartItem = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data, // Include the body in the request configuration
  };
  const res = await baseUrl.delete(url, config); // Pass config as the second parameter
  return res.data;
};

export default useDeleteCartItem;
