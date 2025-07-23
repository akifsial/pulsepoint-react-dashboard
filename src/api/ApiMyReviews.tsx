import axios from "axios";

export const ApiMyReviews = async (
  search: string,
  rating: number,
  filterValue
) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback?organization_name=${search}`;

  if (rating) {
    BASE_URL += `&rating=${rating}`;
  }
  if (filterValue) {
    BASE_URL += `&is_flagged=${filterValue}`;
  }

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload?.records;
};

export const apiDeleteMyReviews = async (id: number) => {
  //   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}v1/user/customers?page=${page}&limit=${5}`;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/${id}`;

  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    // params: queryParams,
  });

  return response.data.payload;
};

export const ApiMySingleReviews = async (id: number) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/${id}`;

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};

export const ApiUpdateReview = async (data, id: number) => {
  try {
    let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback`;

    const token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response?.data?.payload;
  } catch (error) {
    throw error;
  }
};

export const ApiFlagReview = async (feedbackId) => {
  console.log("feedbackIdfeedbackIdfeedbackId", feedbackId);
  try {
    let BASE_URL = `${
      import.meta.env.VITE_APP_API_URL
    }feedback/flag/${feedbackId}`;

    const token = JSON.parse(localStorage.getItem("token"));

    // const response = await axios.post(BASE_URL, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    const response = await axios.post(BASE_URL, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.payload;
  } catch (error) {
    throw error;
  }
};
