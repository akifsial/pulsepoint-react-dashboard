import axios from "axios";
import {
  AIBOT_SEND_MESSAGE_TYPE,
  COMMENT_LIKE_TYPE,
  JOIN_COMMUNITY_TYPE,
  LIKE_POST_TYPE,
  PARENT_COMMENT_REPLY_TYPE,
  POST_COMMENT_TYPE,
  SAVE_POST_TYPE,
} from "@types/apiTypes";
import toast from "react-hot-toast";

// export const ApiReportPost = async (data: FormData): Promise<any> => {
//   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/report`;

//   const token = JSON.parse(localStorage.getItem("token"));

//   const response = await axios.post(BASE_URL, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data.payload;
// };

export const ApiReportPost = async (data: FormData): Promise<any> => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/report`;

  try {
    const token = JSON.parse(localStorage.getItem("token") || "");

    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.payload;
  } catch (error) {
    console.error("xxxxxxxxxxxxxxxxxxxxxxxxx:", error);
    toast.error(error?.response?.data?.errors[0]?.message)
    throw error; // rethrow it so caller can handle it
  }
};

export const ApiGetPopularCommunities = async (search: string) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community?title=${search}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiCreateCommunity = async (data: FormData) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiPostComment = async (data: POST_COMMENT_TYPE) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/comment`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetCommunityPost = async (page: number = 1) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("🔵 Page", page, "→ Data:", response.data.payload.records);

  // return response.data.payload;
  return {
    records: response.data.payload.records,
    hasMore: response.data.payload.records.length > 0, // or use actual flag from API
  };
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

export const ApiCreatePostCommunity = async (data: FormData) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGellAllCommunity = async (search: string) => {
  let URL = `${import.meta.env.VITE_APP_API_URL}community?user_communities=yes`;

  if (search) {
    URL += `&search=${search}`;
  }

  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  // if(search){
  //   BASE_URL+=`&${}`
  // }

  const response = await axios.get(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiLikePost = async (data: LIKE_POST_TYPE) => {
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

export const ApiParentCommentReply = async (
  data: PARENT_COMMENT_REPLY_TYPE
) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}comment`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiLikeComment = async (
  commentId: number,
  data: COMMENT_LIKE_TYPE
) => {
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

export const ApieSaveCreatePost = async (data: SAVE_POST_TYPE) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/save`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiJoinCommunity = async (data: JOIN_COMMUNITY_TYPE) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/join`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiChatPost = async (data: AIBOT_SEND_MESSAGE_TYPE) => {
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
  selectedConversationId: number
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

export const ApiDeleteChat = async (selectedConversationId: number) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }chat/conversations/${selectedConversationId}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiEditChatName = async (
  selectedConversationId: number,
  name: string
) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }chat/conversations/${selectedConversationId}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.put(BASE_URL, name, {
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

export const ApiGetSpecificCommunity = async (id: number) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/${id}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiGetNotifications = async (page = 1, limit = 5) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}user/notifications`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit }, // pass page and limit as query params
  });

  return response.data.payload;
};

export const ApiDeleteComment = async (
  commentId: number,
  post_id: number | string
) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}comment/${commentId}`;
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: post_id,
  });

  return response.data.payload;
};
