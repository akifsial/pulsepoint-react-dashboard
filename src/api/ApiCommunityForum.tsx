import axios from "axios";

export const ApiReportPost = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/report`;
  // const token = JSON.parse(localStorage.getItem("token"));
  // const token: string | null = JSON.parse(localStorage.getItem("token") || "null");
  // const token = localStorage.getItem("token");
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetPopularCommunities = async (search) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community?title=${search}`;
  const token = JSON.parse(localStorage.getItem("token"));
  // const token: string | null = JSON.parse(localStorage.getItem("token") || "null");

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiCreateCommunity = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community`;
  const token = JSON.parse(localStorage.getItem("token"));
  // const token: string | null = JSON.parse(localStorage.getItem("token") || "null");

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiPostComment = async (data) => {
  console.log("Comment----", data);

  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/comment`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetCommunityPost = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};


export const ApiGetCommunityPostSaved = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/save`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetSingleUser = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/${2}`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiCreatePostCommunity = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;
  const token = JSON.parse(localStorage.getItem("token"));
  // const token: string | null = JSON.parse(localStorage.getItem("token") || "null");

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGellAllCommunity = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiLikePost = async (data) => {
  // console.log("Dataaaaa/",commentId)
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/like`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiPostReports = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/reports`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiParentCommentReply = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}comment`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiLikeComment = async (commentId, data) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }comment/like/${commentId}`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiReplyOnReview = async (data) => {
  // console.log("Dataaaaa/",commentId)
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/reply`;
  // const token = JSON.parse(localStorage.getItem("token"));
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};
