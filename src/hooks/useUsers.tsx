// src/hooks/useUsers.js
import { ApiMe } from '@src/api/ApiUsers';
import { useQuery } from '@tanstack/react-query';

export const useMeApi = (params = {}) => {
  return useQuery({
    queryKey: ['useMeApi'], // this enables caching per set of params
    queryFn: () => ApiMe(),
  });
};
