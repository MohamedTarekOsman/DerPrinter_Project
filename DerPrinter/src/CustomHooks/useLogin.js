import baseUrl from "../Api/baseUrl";

export const useLogin = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await baseUrl.post(url, params, config);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
