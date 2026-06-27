import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import {
  GitHubProfileStats,
  GitHubStatsConfig,
  mapGitHubApiUser,
} from '../../models/github-stats.model';

interface GitHubApiUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class GithubStatsService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  fetchProfileStats(config: GitHubStatsConfig): Observable<GitHubProfileStats> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(config.fallback);
    }

    return this.http
      .get<GitHubApiUser>(`https://api.github.com/users/${config.username}`)
      .pipe(
        map(mapGitHubApiUser),
        catchError(() => of(config.fallback)),
      );
  }
}
