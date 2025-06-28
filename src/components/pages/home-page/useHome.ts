import { useQuery } from '@tanstack/react-query';
import { getSearchUsers, getUsersRepos } from './helper';

const useHome = (searchTerm: string, selectedUser: string | null) => {
  const perPageUsers = 5;
  const pageUsers = 1;

  const {
    data: searchUsers,
    isLoading: isSearchUsersLoading,
    isError: isSearchUsersError,
    error: searchUsersError,
    refetch: refetchSearchUsers,
  } = useQuery({
    queryKey: ['searchUsers', searchTerm, perPageUsers, pageUsers],
    queryFn: () => getSearchUsers(searchTerm, perPageUsers, pageUsers),
    enabled: !!searchTerm,
  });

  const {
    data: usersRepos,
    isLoading: isUsersReposLoading,
    isError: isUsersReposError,
    error: usersReposError,
    refetch: refetchUsersRepos,
  } = useQuery({
    queryKey: ['usersRepos', selectedUser],
    queryFn: () =>
      selectedUser ? getUsersRepos(selectedUser) : Promise.resolve([]),
    enabled: !!selectedUser,
  });

  return {
    searchUsers,
    isSearchUsersLoading,
    isSearchUsersError,
    searchUsersError,
    refetchSearchUsers,
    usersRepos,
    isUsersReposLoading,
    isUsersReposError,
    usersReposError,
    refetchUsersRepos,
  };
};
export default useHome;
