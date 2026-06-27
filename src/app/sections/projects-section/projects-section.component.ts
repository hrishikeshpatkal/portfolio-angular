import {
  Component,
  OnDestroy,
  AfterViewInit,
  HostListener,
  PLATFORM_ID,
  ElementRef,
  inject,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RECENT_PROJECTS } from '../../data/projects.data';
import { SITE } from '../../data/site.data';
import { GithubStatsService } from '../../core/services/github-stats.service';
import { GitHubProfileStats } from '../../models/github-stats.model';
import { RecentProject } from '../../models/project.model';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './projects-section.component.html',
})
export class ProjectsSectionComponent implements AfterViewInit, OnDestroy {
  private readonly githubStatsService = inject(GithubStatsService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly githubStatsPanel = viewChild<ElementRef<HTMLElement>>('githubStatsPanel');
  private readonly caseStudyDialog = viewChild<ElementRef<HTMLElement>>('caseStudyDialog');
  private readonly caseStudyClose = viewChild<ElementRef<HTMLButtonElement>>('caseStudyClose');

  readonly projects = RECENT_PROJECTS;
  readonly site = SITE;
  readonly githubProfileUrl = SITE.social.github;
  readonly githubStats = signal<GitHubProfileStats>(SITE.githubStats.fallback);
  readonly selectedProject = signal<RecentProject | null>(null);

  private githubStatsObserver?: IntersectionObserver;
  private githubStatsLoaded = false;
  private caseStudyTrigger: HTMLElement | null = null;

  readonly githubStatItems = [
    { key: 'publicRepos' as const, label: 'Public repos', icon: 'bi-folder2-open' },
    { key: 'followers' as const, label: 'Followers', icon: 'bi-people' },
    { key: 'following' as const, label: 'Following', icon: 'bi-person-plus' },
    { key: 'memberSinceYear' as const, label: 'GitHub since', icon: 'bi-calendar-check' },
  ];

  constructor() {
    effect(() => {
      if (!this.selectedProject() || !isPlatformBrowser(this.platformId)) {
        return;
      }

      queueMicrotask(() => {
        this.caseStudyClose()?.nativeElement.focus();
      });
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const panel = this.githubStatsPanel()?.nativeElement;
    if (!panel) {
      return;
    }

    this.githubStatsObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || this.githubStatsLoaded) {
          return;
        }

        this.githubStatsLoaded = true;
        this.githubStatsService.fetchProfileStats(SITE.githubStats).subscribe((stats) => {
          this.githubStats.set(stats);
        });
        this.githubStatsObserver?.unobserve(panel);
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    this.githubStatsObserver.observe(panel);
  }

  ngOnDestroy(): void {
    this.githubStatsObserver?.disconnect();
    this.unlockBodyScroll();
  }

  statusClass(status: RecentProject['status']): string {
    const map: Record<RecentProject['status'], string> = {
      'in-progress': 'showcase-card__status--progress',
      active: 'showcase-card__status--active',
      polishing: 'showcase-card__status--polish',
    };
    return map[status];
  }

  githubUrl(project: RecentProject): string {
    return project.githubUrl ?? this.githubProfileUrl;
  }

  formatStatValue(key: keyof GitHubProfileStats, stats: GitHubProfileStats): string {
    const value = stats[key];
    return key === 'memberSinceYear' ? String(value) : value.toLocaleString();
  }

  openCaseStudy(project: RecentProject, event?: Event): void {
    if (event?.currentTarget instanceof HTMLElement) {
      this.caseStudyTrigger = event.currentTarget;
    }

    this.selectedProject.set(project);
    this.lockBodyScroll();
  }

  closeCaseStudy(): void {
    const trigger = this.caseStudyTrigger;
    this.selectedProject.set(null);
    this.unlockBodyScroll();
    trigger?.focus();
    this.caseStudyTrigger = null;
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.selectedProject()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeCaseStudy();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const dialog = this.caseStudyDialog()?.nativeElement;

    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.offsetParent !== null || element === this.caseStudyClose()?.nativeElement);

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private lockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.body.style.overflow = '';
  }
}
