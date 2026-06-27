import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  resetToTop(instant = true): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: instant ? 'auto' : 'smooth' });
  }

  clearUrlHash(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  navigateFromHash(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sectionId = this.readHashSectionId();

    if (!sectionId) {
      this.resetToTop(true);
      return;
    }

    requestAnimationFrame(() => {
      this.waitAndScroll(sectionId, 0, true);
    });
  }

  navigateToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const onHome = this.router.isActive('/', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });

    if (!onHome) {
      void this.router.navigate(['/']).then(() => {
        this.waitAndScroll(sectionId);
      });
      return;
    }

    this.scrollToSection(sectionId);
  }

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.waitAndScroll(sectionId);
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.scrollToSection('home');
    this.clearUrlHash();
  }

  private readHashSectionId(): string | null {
    const raw = window.location.hash.replace(/^#/, '').trim();

    if (!raw) {
      return null;
    }

    return decodeURIComponent(raw);
  }

  private waitAndScroll(sectionId: string, attempts = 0, instant = false): void {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    if (sectionId === 'home' && attempts === 0) {
      window.scrollTo({ top: 0, left: 0, behavior: instant ? 'auto' : 'smooth' });
      return;
    }

    if (attempts < 24) {
      requestAnimationFrame(() => this.waitAndScroll(sectionId, attempts + 1, instant));
    }
  }
}
