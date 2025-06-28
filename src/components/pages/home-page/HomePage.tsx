import React, { useState } from 'react';
import useHome from './useHome';
import type { GitHubRepository, GitHubUser } from '../../../interfaces';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    searchUsers,
    isSearchUsersLoading,
    isSearchUsersError,
    searchUsersError,
    usersRepos,
    isUsersReposLoading,
    isUsersReposError,
    usersReposError,
  } = useHome(searchTerm, selectedUser);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setExpanded(null);
    setSelectedUser(null);
    setSearchTerm(search);
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

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-8'>
      <form
        className='w-full max-w-md flex flex-col gap-4 bg-white p-8 rounded-lg shadow mb-8'
        onSubmit={handleSearch}
      >
        <input
          className='border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          type='text'
          placeholder='Enter username'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-3 rounded transition-colors'
          type='submit'
        >
          Search
        </button>
      </form>
      {searched && (
        <div className='w-full max-w-md'>
          {searchTerm && (
            <div className='mb-4 text-gray-600 text-base'>
              Showing users for “{searchTerm}”
            </div>
          )}
          {isSearchUsersLoading ? (
            <div className='text-center text-gray-400 py-8 bg-white rounded shadow'>
              Loading users...
            </div>
          ) : isSearchUsersError ? (
            <div className='text-center text-red-500 py-8 bg-white rounded shadow'>
              {String(searchUsersError)}
            </div>
          ) : !searchUsers || searchUsers.length === 0 ? (
            <div className='text-center text-gray-400 py-8 bg-white rounded shadow'>
              No users found.
            </div>
          ) : (
            searchUsers.map((user: GitHubUser) => (
              <div
                key={user.id}
                className='mb-4 bg-white rounded shadow overflow-hidden'
              >
                <div
                  className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100'
                  onClick={() => handleExpand(user.login)}
                >
                  <span className='font-semibold text-lg text-gray-800'>
                    {user.login}
                  </span>
                  <span className='text-xl text-gray-400'>
                    {expanded === user.login ? '▲' : '▼'}
                  </span>
                </div>
                {expanded === user.login && (
                  <div className='bg-gray-50 px-4 py-3'>
                    {isUsersReposLoading ? (
                      <div className='text-gray-400'>
                        Loading repositories...
                      </div>
                    ) : isUsersReposError ? (
                      <div className='text-red-500'>
                        {String(usersReposError)}
                      </div>
                    ) : !usersRepos || usersRepos.length === 0 ? (
                      <div className='text-gray-400'>
                        No repositories found.
                      </div>
                    ) : (
                      usersRepos.map((repo: GitHubRepository, idx: number) => (
                        <div
                          key={repo.id || idx}
                          className='mb-3 last:mb-0 p-4 bg-white rounded shadow flex flex-col gap-1 border border-gray-200'
                        >
                          <div className='flex items-center justify-between mb-1'>
                            <span className='font-bold text-base text-gray-800'>
                              {repo.name}
                            </span>
                            <span className='flex items-center gap-1 text-gray-600 font-medium'>
                              {repo.stargazers_count ?? 0}
                              <span className='text-yellow-400 text-lg'>★</span>
                            </span>
                          </div>
                          <div className='text-gray-500 text-sm'>
                            {repo.description}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
