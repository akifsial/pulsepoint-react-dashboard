import axios from "axios";
import Swal from "sweetalert2";

import {
  AIBOT_SEND_MESSAGE_TYPE,
  COMMENT_LIKE_TYPE,
  JOIN_COMMUNITY_TYPE,
  LIKE_POST_TYPE,
  PARENT_COMMENT_REPLY_TYPE,
  POST_COMMENT_TYPE,
  SAVE_POST_TYPE,
} from "@types/api-types";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";


export const ApiReportPost = async (data: FormData): Promise<any> => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/report`;

  try {
    const token = JSON.parse(localStorage.getItem("token") || "");

    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.payload;
  } catch (error) {
    toast.error(error?.response?.data?.errors[0]?.message);
    throw error;
  }
};

export const ApiGetPopularCommunities = async (search: string) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}community?popular=true`;
  if (search) {
    BASE_URL += `&title=${search}`;
  }
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

export const ApiGetCommunityPost = async (popular = false) => {
  let BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;

  if (popular) {
    BASE_URL += `?popular=true`;
  }

  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });


  return {
    records: response.data.payload.records,
    hasMore: response.data.payload.records.length > 0, 
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
  try {
    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post`;
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; 
  }
};

export const ApiGellAllCommunity = async (
  search: string,
  page: number,
  sort: number
) => {
  let URL = `${
    import.meta.env.VITE_APP_API_URL
  }community?user_communities=yes&limit=3&page=${page}`;

  if (search) {
    URL += `&search=${search}`;
  }

  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  if (sort) {
    URL += `&sort=created_at:${sort}`;
  }

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


export const ApiChatPost = async (data: AIBOT_SEND_MESSAGE_TYPE, navigate) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}chat`;
  const token = JSON.parse(localStorage.getItem("token") || "null");
  try {
    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
  } catch (error) {
    
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const role_type = userInfo?.role_type;  
    Swal.fire({
      title: "<strong>Error</strong>",
      icon: "error",
      html: `
    ${error?.response?.data?.errors[0]?.message}
    <br/><br/>
  `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
    <i class="fa fa-check"></i> Subscribe
  `,
      confirmButtonAriaLabel: "Subscribe Now",
      cancelButtonText: `
    <i class="fa fa-times"></i> Cancel
  `,
      cancelButtonAriaLabel: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
    }).then((result) => {
      if (result.isConfirmed) {
        if (role_type == "PATIENT") {
          navigate("/patient/feature", { replace: true });
          
        } 
        if (role_type=="CARE_PROVIDER") {
          navigate("/care-provider/feature", { replace: true });


        }
      }
    });

  }
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

  try {
    const response = await axios.delete(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.payload;
  } catch (error) {

    toast.error(error?.response?.data?.errors[0]?.message);
    throw error;
  }
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
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }user/notifications?sort=created_at:desc`;

  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit }, 
  });

  return response.data.payload;
};

export const ApiAcceptPrivateCommunity = async (memberId, status) => {
  const currentStatus = {
    status: status,
  };
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community/join/member/${memberId}/status`;

  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.put(
    BASE_URL,
    { status: status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

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


export const ApiDeletePost = async (postId: number) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community/post/${postId}`;
  const token = JSON.parse(localStorage.getItem("token") || "null");

  try {
    const response = await axios.delete(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.payload;
  } catch (error) {
    toast.error(error?.response?.data?.message);

    throw error;
  }
};

export const ApiGetSinglePost = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_APP_API_URL}community/post/${id}`;
  const token: string | null = JSON.parse(
    localStorage.getItem("token") || "null"
  );

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.payload;
};

export const ApiDeleteCommunity = async (communityId: number) => {
  const BASE_URL = `${
    import.meta.env.VITE_APP_API_URL
  }community/${communityId}`;
  const token = JSON.parse(localStorage.getItem("token") || "null");

  try {
    const response = await axios.delete(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.payload;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
};
