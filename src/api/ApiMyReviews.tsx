import axios from "axios";

export const ApiMyReviews = async (
  search: string,
  rating: number,
  filterValue,
  page: number,
  sort:number

) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback?search=${search}&limit=3&page=${1}`;

  if (rating) {
    BASE_URL += `&rating=${rating}`;
  }
  if (filterValue) {
    BASE_URL += `&is_flagged=${filterValue}`;
  }
    if(sort){
    BASE_URL += `&sort:created_at=${sort}`;
    
  }

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data?.payload;
};

export const apiDeleteMyReviews = async (id: number) => {
  const userInfoString = JSON.parse(localStorage.getItem("userInfo")); // ← returns string

  // if (userInfoString) {
  //   const userInfo = JSON.parse(userInfoString); // ← convert string to object
  //   const care_id = userInfo.id;
  //   console.log("IDDDDD", care_id);

  // }

  const care_provider_id = { care_provider_id: userInfoString?.id };
  //   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}v1/user/customers?page=${page}&limit=${5}`;
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/${id}`;

  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: care_provider_id,
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
