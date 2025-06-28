import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { GitHubRepository } from '../../../interfaces';
import RepoList from './RepoList';

const mockRepos: GitHubRepository[] = [
  {
    id: 1,
    name: 'repo1',
    description: 'Repository 1 description',
    stargazers_count: 10,
  },
  {
    id: 2,
    name: 'repo2',
    description: '',
    stargazers_count: 0,
  },
];

describe('RepoList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a list of repositories with correct data', () => {
    render(<RepoList repos={mockRepos} />);

    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('Repository 1 description')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('No description available.')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
