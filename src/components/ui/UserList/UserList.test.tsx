import '@testing-library/jest-dom';

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import UserList from './UserList';
import type { GitHubRepository, GitHubUser } from '../../../interfaces';

const mockUsers: GitHubUser[] = [
  {
    id: 1,
    login: 'tester1',
    avatar_url: '',
    html_url: '',
  },
  {
    id: 2,
    login: 'tester2',
    avatar_url: '',
    html_url: '',
  },
];

const mockRepos: GitHubRepository[] = [
  {
    id: 1,
    name: 'repo1',
    description: 'test repo',
    stargazers_count: 5,
  },
];

describe('UserList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all users', () => {
    render(
      <UserList
        users={mockUsers}
        expanded={null}
        onExpand={() => {}}
        usersRepos={[]}
        isUsersReposLoading={false}
        isUsersReposError={false}
        usersReposError={null}
      />
    );

    expect(screen.getByText('tester1')).toBeInTheDocument();
    expect(screen.getByText('tester2')).toBeInTheDocument();
  });

  it('calls onExpand when a user row is clicked', () => {
    const mockOnExpand = vi.fn();
    render(
      <UserList
        users={mockUsers}
        expanded={null}
        onExpand={mockOnExpand}
        usersRepos={[]}
        isUsersReposLoading={false}
        isUsersReposError={false}
        usersReposError={null}
      />
    );

    fireEvent.click(screen.getByText('tester1'));
    expect(mockOnExpand).toHaveBeenCalledWith('tester1');
  });

  it('shows loading state when loading', () => {
    render(
      <UserList
        users={[mockUsers[0]]}
        expanded='tester1'
        onExpand={() => {}}
        usersRepos={[]}
        isUsersReposLoading={true}
        isUsersReposError={false}
        usersReposError={null}
      />
    );

    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
  });

  it('shows error message when error occurs', () => {
    render(
      <UserList
        users={[mockUsers[0]]}
        expanded='tester1'
        onExpand={() => {}}
        usersRepos={[]}
        isUsersReposLoading={false}
        isUsersReposError={true}
        usersReposError={'Failed to load repos'}
      />
    );

    expect(screen.getByText('Failed to load repos')).toBeInTheDocument();
  });

  it('shows empty message when there are no repos', () => {
    render(
      <UserList
        users={[mockUsers[0]]}
        expanded='tester1'
        onExpand={() => {}}
        usersRepos={[]}
        isUsersReposLoading={false}
        isUsersReposError={false}
        usersReposError={null}
      />
    );

    expect(screen.getByText('No repositories found.')).toBeInTheDocument();
  });

  it('renders RepoList when data is available', () => {
    render(
      <UserList
        users={[mockUsers[0]]}
        expanded='tester1'
        onExpand={() => {}}
        usersRepos={mockRepos}
        isUsersReposLoading={false}
        isUsersReposError={false}
        usersReposError={null}
      />
    );

    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('test repo')).toBeInTheDocument();
  });
});
