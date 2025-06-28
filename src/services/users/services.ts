import { api } from '../api';
import { userEndpoints } from './endpoint';

const getSearchUsers = async (
  query: string,
  per_page: number = 5,
  page: number = 1
) => {
  const response = await api.get(
    userEndpoints.getSearchUsers(query, per_page, page).url
  );
  return response.data.items;
};

const getUserRepos = async (
  username: string,
  per_page: number = 0,
  page: number = 1
) => {
  const response = await api.get(
    userEndpoints.getUserRepos(username, per_page, page).url
  );
  return response.data;
};

export const userServices = {
  getSearchUsers,
  getUserRepos,
};
