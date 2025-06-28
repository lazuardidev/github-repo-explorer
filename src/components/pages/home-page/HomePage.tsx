import { SearchForm, UserList } from '../../ui';
import useHome from './useHome';

const HomePage = () => {
  const {
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
  } = useHome();

  return (
    <div className='min-h-screen flex flex-col items-center py-8'>
      <SearchForm onSearch={handleSearch} />
      {searched && (
        <div className='w-full max-w-md'>
          {searchTerm && (
            <div className='mb-4 text-gray-600 text-base my-4'>
              Showing users for “{searchTerm}”
            </div>
          )}
          {isSearchUsersLoading ? (
            <div className='text-center text-gray-400 py-8 bg-white rounded shadow'>
              Loading users...
            </div>
          ) : isSearchUsersError ? (
            <div className='text-center text-red-500 py-8 bg-white rounded shadow'>
              {searchUsersError instanceof Error
                ? searchUsersError.message
                : 'Error fetching users'}
            </div>
          ) : !searchUsers || searchUsers.length === 0 ? (
            <div className='text-center text-gray-400 py-8 bg-white rounded shadow'>
              No users found.
            </div>
          ) : (
            <UserList
              users={searchUsers}
              expanded={expanded}
              onExpand={handleExpand}
              usersRepos={usersRepos}
              isUsersReposLoading={isUsersReposLoading}
              isUsersReposError={isUsersReposError}
              usersReposError={usersReposError}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
