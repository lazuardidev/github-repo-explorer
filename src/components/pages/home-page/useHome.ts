import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSearchUsers, getUsersRepos } from './helper';

const useHome = () => {
  const [searched, setSearched] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: searchUsers,
    isLoading: isSearchUsersLoading,
    isError: isSearchUsersError,
    error: searchUsersError,
  } = useQuery({
    queryKey: ['searchUsers', searchTerm],
    queryFn: () => getSearchUsers(searchTerm),
    enabled: !!searchTerm,
  });

  const {
    data: usersRepos,
    isLoading: isUsersReposLoading,
    isError: isUsersReposError,
    error: usersReposError,
  } = useQuery({
    queryKey: ['usersRepos', selectedUser],
    queryFn: () =>
      selectedUser ? getUsersRepos(selectedUser) : Promise.resolve([]),
    enabled: !!selectedUser,
  });

  const handleSearch = (term: string) => {
    setSearched(true);
    setExpanded(null);
    setSelectedUser(null);
    setSearchTerm(term);
  };

  const handleExpand = (username: string) => {
    if (expanded === username) {
      setExpanded(null);
      setSelectedUser(null);
    } else {
      setExpanded(username);
      setSelectedUser(username);
    }
  };

  return {
    searchUsers,
    isSearchUsersLoading,
    isSearchUsersError,
    searchUsersError,
    usersRepos,
    isUsersReposLoading,
    isUsersReposError,
    usersReposError,
    searched,
    searchTerm,
    expanded,
    handleSearch,
    handleExpand,
  };
};

export default useHome;
