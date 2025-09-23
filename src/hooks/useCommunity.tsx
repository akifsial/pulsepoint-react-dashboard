import {
  ApiGetPopularCommunities,
  ApiGetCommunityPost,
  ApiGetSingleUser,
  ApiGellAllCommunity,
  ApiPostReports,
  ApiGetCommunityPostSaved,
  ApiGetAllConversation,
  ApiGetConversationChatSpecific,
  ApiGetCommunityTopics,
  ApiGetSpecificCommunity,
  ApiGetNotifications,
  ApiGetSinglePost,
} from "@src/api/ApiCommunityForum";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { USE_GET_NOTIFICATIONS_PROPS } from "@types/apiTypes";

export const usePopularCommunities = (search) => {
  return useQuery({
    queryKey: ["useCareProviders", search],
    queryFn: () => ApiGetPopularCommunities(search),
    refetchOnWindowFocus: false,
  });
};

export const useGetCommunityPost = (popular) => {
  return useQuery({
    queryKey: ["useGetCommunityPost",popular],
    queryFn: () => ApiGetCommunityPost(popular),
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteCommunityPosts = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteCommunityPosts"],
    queryFn: ({ pageParam = 1 }) => ApiGetCommunityPost(pageParam),
    getNextPageParam: (lastPage, allPages) => {
    
      return lastPage.records.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetCommunityPostSaved = () => {
  return useQuery({
    queryKey: ["useGetCommunityPostSaved"],
    queryFn: () => ApiGetCommunityPostSaved(),
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleUser = () => {
  return useQuery({
    queryKey: ["useGetSingleUser"],
    queryFn: () => ApiGetSingleUser(),
    refetchOnWindowFocus: false,
  });
};

// export const useGetAllCommunities = (search) => {
//   return useQuery({
//     queryKey: ["useGetAllCommunities",search],
//     queryFn: (search) => ApiGellAllCommunity(search),
//     refetchOnWindowFocus: false,
//   });
// };

export const useGetAllCommunities = (search, page, sort) => {
  return useQuery({
    queryKey: ["useGetAllCommunities", search, page, sort],
    // queryFn: ({ queryKey }) => {
    //   const [, searchTerm] = queryKey; // Get the second item
    //   return ApiGellAllCommunity(searchTerm);
    // },
    queryFn: () => ApiGellAllCommunity(search, page, sort),
    refetchOnWindowFocus: false,
  });
};

export const useGetReportsPost = () => {
  return useQuery({
    queryKey: ["useGetReportsPost"],
    queryFn: () => ApiPostReports(),
    refetchOnWindowFocus: false,
  });
};

export const useGetAllConversations = () => {
  return useQuery({
    queryKey: ["useGetAllConversations"],
    queryFn: () => ApiGetAllConversation(),
    refetchOnWindowFocus: false,
  });
};

export const useGetConversationChatSpecific = (selectedConversationId) => {
  return useQuery({
    queryKey: ["useGetConversationChatSpecific", selectedConversationId],
    queryFn: () => ApiGetConversationChatSpecific(selectedConversationId),
    refetchOnWindowFocus: false,
    enabled: !!selectedConversationId, // Only runs if id is provided
  });
};

export const useGetAllCommunityTopics = () => {
  return useQuery({
    queryKey: ["useGetAllCommunityTopics"],
    queryFn: () => ApiGetCommunityTopics(),
    refetchOnWindowFocus: false,
  });
};

// export const useGetSpecificCommunity = (id) => {
//   return useQuery({
//     queryKey: ["useGetSpecificCommunity"],
//     queryFn: () => ApiGetSpecificCommunity(id),
//     refetchOnWindowFocus: false,
//     enabled: !!id,
//     staleTime: 0,
//   });
// };
export const useGetSpecificCommunity = (id: string) => {
  return useQuery({
    queryKey: ["useGetSpecificCommunity", id], // id add kar do key me
    queryFn: async () => {
      try {
        return await ApiGetSpecificCommunity(id);
      } catch (err) {
        return null; // agar error aaya to null return kare
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: 0,
  });
};

// export const useGetNotifications = () => {
//   return useQuery({
//     queryKey: ["useGetNotifications"],
//     queryFn: () => ApiGetNotifications(),
//     refetchOnWindowFocus: false,
//   });
// };

// new use get notifications

// export const useGetNotifications = ({ page = 1, limit = 5 }) => {
//   return useQuery({
//     queryKey: ["useGetNotifications", page], // add page to keep cache separate
//     queryFn: () => ApiGetNotifications(page, limit),
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   });
// };

export const useGetNotifications = ({
  page = 1,
  limit = 5,
}: USE_GET_NOTIFICATIONS_PROPS = {}) => {
  return useQuery({
    queryKey: ["useGetNotifications", page],
    queryFn: () => ApiGetNotifications(page, limit),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleCommunityPost = (id) => {
  return useQuery({
    queryKey: ["useGetSingleCommunityPost", id],
    queryFn: () => ApiGetSinglePost(id),
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};
