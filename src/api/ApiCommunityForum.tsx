import axios from "axios";

export const ApiReportPost = async (data) => {

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/community/post/report`;
    // const token = JSON.parse(localStorage.getItem("token"));
    const token: string | null = JSON.parse(localStorage.getItem("token") || "null");


    const response = await axios.post(BASE_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
};

export const ApiGetPopularCommunities = async () => {

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/community`;
    // const token = JSON.parse(localStorage.getItem("token"));
    const token: string | null = JSON.parse(localStorage.getItem("token") || "null");


    const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
};


export const ApiCreateCommunity = async (data) => {

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/community`;
    // const token = JSON.parse(localStorage.getItem("token"));
    const token: string | null = JSON.parse(localStorage.getItem("token") || "null");


    const response = await axios.post(BASE_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
};
