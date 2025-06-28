export const userEndpoints = {
  getSearchUsers: (query: string, per_page: number = 5, page: number = 1) => ({
    url: `/search/users?q=${encodeURIComponent(
      query
    )}&per_page=${per_page}&page=${page}`,
    method: 'GET',
  }),
  getUserRepos: (username: string, per_page: number = 0, page: number = 1) => ({
    url: `/users/${encodeURIComponent(
      username
    )}/repos?per_page=${per_page}&page=${page}`,
    method: 'GET',
  }),
};
