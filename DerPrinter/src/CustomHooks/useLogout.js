import baseUrl from "../Api/baseUrl";

export const useLogout = async (url) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseUrl.post(url, {}, config);
  localStorage.removeItem("token");
  return res.data;
};
