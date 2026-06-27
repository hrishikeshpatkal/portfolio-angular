import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly systemReduced = signal(false);

  readonly enabled = computed(() => !this.systemReduced());

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.systemReduced.set(mediaQuery.matches);

    mediaQuery.addEventListener('change', (event) => {
      this.systemReduced.set(event.matches);
    });

    effect(() => {
      document.documentElement.setAttribute('data-motion', this.enabled() ? 'on' : 'off');
    });
  }
}
