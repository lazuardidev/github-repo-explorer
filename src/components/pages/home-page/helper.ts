import { userServices } from '../../../services/users/services';

const getSearchUsers = async (
  query: string,
  per_page: number = 5,
  page: number = 1
) => {
  try {
    const response = await userServices.getSearchUsers(query, per_page, page);
    return response;
  } catch (error) {
    console.error('Error fetching search users:', error);
    throw error;
  }
};

const getUsersRepos = async (
  username: string,
  per_page: number = 0,
  page: number = 1
) => {
  try {
    const response = await userServices.getUserRepos(username, per_page, page);
    return response;
  } catch (error) {
    console.error('Error fetching user repos:', error);
    throw error;
  }
};

export { getSearchUsers, getUsersRepos };
