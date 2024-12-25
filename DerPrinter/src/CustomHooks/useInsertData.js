import baseUrl from "../Api/baseUrl";

export const useInsertDataWithImage = async (url, params) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
        },
    };

    try {
        const res = await baseUrl.post(url, params, config);
        return res.data;
    } catch (error) {
        console.error("Error uploading data with image:", error.response || error.message);
        throw error; 
    }
};

export const useInsertData = async (url, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.post(url, params, config);
    return res.data;
}

