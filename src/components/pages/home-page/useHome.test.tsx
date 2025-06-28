import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useHome from './useHome';
import * as helper from './helper';

const mockUsers = [
  { id: 1, login: 'user1' },
  { id: 2, login: 'user2' },
];
const mockRepos = [
  { id: 1, name: 'repo1', stargazers_count: 10, description: 'desc1' },
  { id: 2, name: 'repo2', stargazers_count: 5, description: 'desc2' },
];

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useHome', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useHome(), {
      wrapper: createWrapper(),
    });

    expect(result.current.searched).toBe(false);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.expanded).toBe(null);
    expect(typeof result.current.handleSearch).toBe('function');
    expect(typeof result.current.handleExpand).toBe('function');
  });

  it('should update state on handleSearch', () => {
    const { result } = renderHook(() => useHome(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSearch('user1');
    });

    expect(result.current.searched).toBe(true);
    expect(result.current.searchTerm).toBe('user1');
    expect(result.current.expanded).toBe(null);
  });

  it('should expand and collapse user', () => {
    const { result } = renderHook(() => useHome(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleExpand('user1');
    });
    expect(result.current.expanded).toBe('user1');

    act(() => {
      result.current.handleExpand('user1');
    });
    expect(result.current.expanded).toBe(null);
  });

  it('should fetch users and repos (mocked)', async () => {
    vi.spyOn(helper, 'getSearchUsers').mockResolvedValue(mockUsers);
    vi.spyOn(helper, 'getUsersRepos').mockResolvedValue(mockRepos);

    const { result } = renderHook(() => useHome(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSearch('user1');
      result.current.handleExpand('user1');
    });

    await waitFor(() => {
      expect(helper.getSearchUsers).toHaveBeenCalledWith('user1');
      expect(helper.getUsersRepos).toHaveBeenCalledWith('user1');
    });

    expect(result.current.searchUsers).toEqual(mockUsers);
    expect(result.current.usersRepos).toEqual(mockRepos);
  });
});
