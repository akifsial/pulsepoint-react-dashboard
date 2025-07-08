// src/hooks/useUsers.js
import { ApiMe } from '@src/api/ApiUsers';

export const useMeApi = (params = {}) => {
  return useQuery({
    queryKey: ['useMeApi'], // this enables caching per set of params
    queryFn: () => ApiMe(),
  });
};
