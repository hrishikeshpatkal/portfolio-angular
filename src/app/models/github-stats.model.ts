export interface GitHubProfileStats {
  publicRepos: number;
  followers: number;
  following: number;
  memberSinceYear: number;
}

export interface GitHubStatsConfig {
  username: string;
  fallback: GitHubProfileStats;
}

interface GitHubApiUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export function mapGitHubApiUser(user: GitHubApiUser): GitHubProfileStats {
  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    memberSinceYear: new Date(user.created_at).getFullYear(),
  };
}
