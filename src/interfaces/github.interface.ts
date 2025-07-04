export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
};

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
}
