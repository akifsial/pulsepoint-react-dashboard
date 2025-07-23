import {
  ApiGetPopularCommunities,
  ApiGetPostComments,
  ApiGetCommunityPost,
  ApiGetSingleUser,
  ApiGellAllCommunity,
  ApiPostReports,
  ApiParentCommentReply,
  ApiGetCommunityPostSaved,
} from "@src/api/ApiCommunityForum";
import { useQuery } from "@tanstack/react-query";

export const usePopularCommunities = (search) => {
  return useQuery({
    queryKey: ["useCareProviders", search],
    queryFn: () => ApiGetPopularCommunities(search),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useGetCommunityPost = () => {
  return useQuery({
    queryKey: ["useGetCommunityPost"],
    queryFn: () => ApiGetCommunityPost(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useGetCommunityPostSaved = () => {
  return useQuery({
    queryKey: ["useGetCommunityPostSaved"],
    queryFn: () => ApiGetCommunityPostSaved(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleUser = () => {
  return useQuery({
    queryKey: ["useGetSingleUser"],
    queryFn: () => ApiGetSingleUser(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useGetAllCommunities = () => {
  return useQuery({
    queryKey: ["useGetAllCommunities"],
    queryFn: () => ApiGellAllCommunity(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useGetReportsPost = () => {
  return useQuery({
    queryKey: ["useGetReportsPost"],
    queryFn: () => ApiPostReports(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};
