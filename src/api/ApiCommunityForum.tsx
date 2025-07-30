import axios from "axios";

export const ApiReportPost = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/report`;

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

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiCreateCommunity = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiPostComment = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/comment`;
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

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGellAllCommunity = async (search) => {
  let BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community?user_communities=yes`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  // if(search){
  //   BASE_URL+=`&${}`
  // }

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiLikePost = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/like`;
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
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiReplyOnReview = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}feedback/reply`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApieSaveCreatePost = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/save`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiJoinCommunity = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/join`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiChatPost = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}chat`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetChatBot = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}chat`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetAllConversation = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}chat/conversations`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetConversationChatSpecific = async (
  selectedConversationId
) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }chat/conversations/${selectedConversationId}/messages`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiDeleteChat = async (selectedConversationId) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }chat/conversations/${selectedConversationId}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiEditChatName = async (selectedConversationId) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }chat/conversations/${selectedConversationId}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetCommunityTopics = async () => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/topics`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiCreatePayment = async (data) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}payment`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetSpecificCommunity = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/${id}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

// export const ApiLikeComment = async (data, id) => {
//   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}comment/like/${id}`;
//   const token: string | null = JSON.parse(
//     localStorage.getItem("token") || "null"
//   );

//   const response = await axios.post(BASE_URL, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data.payload;
// };
