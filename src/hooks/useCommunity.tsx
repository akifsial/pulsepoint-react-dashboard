import { ApiGetPopularCommunities } from "@src/api/ApiCommunityForum";
import { useQuery } from "@tanstack/react-query";


export const usePopularCommunities = () => {

    return useQuery({
        queryKey: ["useCareProviders"],
        queryFn: () => ApiGetPopularCommunities(),
        // enabled: !!search, // only fetch when search is not empty
        refetchOnWindowFocus: false,
    });
};

