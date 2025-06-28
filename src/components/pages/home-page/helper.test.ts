/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi, expect } from 'vitest';
import { getSearchUsers, getUsersRepos } from './helper';
import { userServices } from '../../../services/users/services';

vi.mock('../../../services/users/services', () => ({
  userServices: {
    getSearchUsers: vi.fn(),
    getUserRepos: vi.fn(),
  },
}));

describe('getSearchUsers', () => {
  it('should return search users from API', async () => {
    const mockData = [{ id: 1, login: 'tester' }];
    (userServices.getSearchUsers as any).mockResolvedValue(mockData);

    const result = await getSearchUsers('tester');
    expect(result).toEqual(mockData);
    expect(userServices.getSearchUsers).toHaveBeenCalledWith('tester', 5, 1);
  });

  it('should throw error when search users API fails', async () => {
    const error = new Error('API error');
    (userServices.getSearchUsers as any).mockRejectedValue(error);

    await expect(getSearchUsers('fail')).rejects.toThrow('API error');
    expect(userServices.getSearchUsers).toHaveBeenCalled();
  });
});

describe('getUsersRepos', () => {
  it('should return user repos from API', async () => {
    const mockData = [{ id: 1, name: 'repo' }];
    (userServices.getUserRepos as any).mockResolvedValue(mockData);

    const result = await getUsersRepos('tester');
    expect(result).toEqual(mockData);
    expect(userServices.getUserRepos).toHaveBeenCalledWith('tester', 0, 1);
  });

  it('should throw error when user repos API fails', async () => {
    const error = new Error('Repo fetch error');
    (userServices.getUserRepos as any).mockRejectedValue(error);

    await expect(getUsersRepos('tester')).rejects.toThrow('Repo fetch error');
    expect(userServices.getUserRepos).toHaveBeenCalled();
  });
});
