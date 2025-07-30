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
} from "@src/api/ApiCommunityForum";
import { useQuery } from "@tanstack/react-query";

export const usePopularCommunities = (search) => {
  return useQuery({
    queryKey: ["useCareProviders", search],
    queryFn: () => ApiGetPopularCommunities(search),
    refetchOnWindowFocus: false,
  });
};

export const useGetCommunityPost = () => {
  return useQuery({
    queryKey: ["useGetCommunityPost"],
    queryFn: () => ApiGetCommunityPost(),
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

export const useGetAllCommunities = (search) => {
  return useQuery({
    queryKey: ["useGetAllCommunities", search],
    queryFn: ({ queryKey }) => {
      const [, searchTerm] = queryKey; // Get the second item
      return ApiGellAllCommunity(searchTerm);
    },
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
  });
};

export const useGetAllCommunityTopics = () => {
  return useQuery({
    queryKey: ["useGetAllCommunityTopics"],
    queryFn: () => ApiGetCommunityTopics(),
    refetchOnWindowFocus: false,
  });
};

export const useGetSpecificCommunity = (id) => {
  return useQuery({
    queryKey: ["useGetSpecificCommunity"],
    queryFn: () => ApiGetSpecificCommunity(id),
    refetchOnWindowFocus: false,
    enabled:!!id
  });
};
