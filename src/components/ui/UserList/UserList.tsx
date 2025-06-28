import type { GitHubRepository, GitHubUser } from '../../../interfaces';
import React from 'react';
import RepoList from '../RepoList';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface UserListProps {
  users: GitHubUser[];
  expanded: string | null;
  onExpand: (username: string) => void;
  usersRepos: GitHubRepository[];
  isUsersReposLoading: boolean;
  isUsersReposError: boolean;
  usersReposError: unknown;
}

const UserList: React.FC<UserListProps> = ({
  users,
  expanded,
  onExpand,
  usersRepos,
  isUsersReposLoading,
  isUsersReposError,
  usersReposError,
}) => (
  <>
    {users.map((user) => (
      <div
        key={user.id}
        className='mb-4 bg-gray-200 rounded overflow-hidden'
      >
        <div
          className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-300'
          onClick={() => onExpand(user.login)}
        >
          <span className='font-semibold text-lg text-gray-800'>
            {user.login}
          </span>
          {expanded === user.login ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
        {expanded === user.login && (
          <div className='bg-white pl-8 py-3'>
            {isUsersReposLoading ? (
              <div className='text-gray-400'>Loading repositories...</div>
            ) : isUsersReposError ? (
              <div className='text-red-500'>{String(usersReposError)}</div>
            ) : !usersRepos || usersRepos.length === 0 ? (
              <div className='text-gray-400'>No repositories found.</div>
            ) : (
              <RepoList repos={usersRepos} />
            )}
          </div>
        )}
      </div>
    ))}
  </>
);

export default UserList;
