import React from 'react';
import { Star } from 'lucide-react';
import type { GitHubRepository } from '../../../interfaces';

interface RepoListProps {
  repos: GitHubRepository[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <>
    {repos.map((repo, idx) => (
      <div
        key={repo.id || idx}
        className='min-h-30 mb-3 last:mb-0 p-4 bg-[#e0e0e0] rounded flex flex-col gap-1'
      >
        <div className='flex items-center justify-between mb-1 w-full'>
          <span className='font-bold text-base text-gray-800 truncate max-w-[70%]'>
            {repo.name}
          </span>
          <span className='flex-shrink-0 flex items-center gap-1 text-gray-600 font-medium'>
            {repo.stargazers_count ?? 0}
            <Star size={18} className='text-black' fill='black' />
          </span>
        </div>
        <div className='text-gray-500 text-sm break-words line-clamp-3'>
          {repo.description || 'No description available.'}
        </div>
      </div>
    ))}
  </>
);

export default RepoList;
