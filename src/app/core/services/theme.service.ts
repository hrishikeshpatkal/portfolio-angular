import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DEFAULT_THEME, isThemeId, ThemeId } from '../../data/theme-config';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-theme';

  readonly theme = signal<ThemeId>(DEFAULT_THEME);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey);
      this.theme.set(isThemeId(stored) ? stored : DEFAULT_THEME);

      effect(() => {
        const current = this.theme();
        document.documentElement.setAttribute('data-theme', current);
        localStorage.setItem(this.storageKey, current);
      });
    }
  }

  setTheme(themeId: ThemeId): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const apply = (): void => {
      this.theme.set(themeId);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as DocumentWithViewTransition;

    if (!prefersReducedMotion && typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(apply);
      return;
    }

    apply();
  }
}
