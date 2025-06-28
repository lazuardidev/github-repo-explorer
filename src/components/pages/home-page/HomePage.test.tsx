import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import * as useHomeModule from './useHome';

const mockUsers = [
  { id: 1, login: 'user1' },
  { id: 2, login: 'user2' },
];
const mockRepos = [
  { id: 1, name: 'repo1', stargazers_count: 10, description: 'desc1' },
  { id: 2, name: 'repo2', stargazers_count: 5, description: 'desc2' },
];

describe('HomePage', () => {
  beforeEach(() => {
    vi.spyOn(useHomeModule, 'default').mockReturnValue({
      searchUsers: [],
      isSearchUsersLoading: false,
      isSearchUsersError: false,
      searchUsersError: null,
      usersRepos: [],
      isUsersReposLoading: false,
      isUsersReposError: false,
      usersReposError: null,
      searched: false,
      searchTerm: '',
      expanded: null,
      handleSearch: vi.fn(),
      handleExpand: vi.fn(),
    });
  });

  it('renders search form and no users by default', () => {
    render(<HomePage />);

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.queryByText(/showing users for/i)).not.toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.spyOn(useHomeModule, 'default').mockReturnValue({
      ...useHomeModule.default(),
      searched: true,
      searchTerm: 'user',
      isSearchUsersLoading: true,
    });

    render(<HomePage />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.spyOn(useHomeModule, 'default').mockReturnValue({
      ...useHomeModule.default(),
      searched: true,
      searchTerm: 'user',
      isSearchUsersError: true,
      searchUsersError: new Error('Error fetching users'),
    });

    render(<HomePage />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('shows no users found', () => {
    vi.spyOn(useHomeModule, 'default').mockReturnValue({
      ...useHomeModule.default(),
      searched: true,
      searchTerm: 'user',
      searchUsers: [],
    });

    render(<HomePage />);

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it('shows users and expands/collapses repos', () => {
    const handleExpand = vi.fn();
    vi.spyOn(useHomeModule, 'default').mockReturnValue({
      ...useHomeModule.default(),
      searched: true,
      searchTerm: 'user',
      searchUsers: mockUsers,
      expanded: null,
      handleExpand,
      usersRepos: mockRepos,
      isUsersReposLoading: false,
      isUsersReposError: false,
      usersReposError: null,
    });

    render(<HomePage />);

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('user1'));
    expect(handleExpand).toHaveBeenCalledWith('user1');
  });
});
