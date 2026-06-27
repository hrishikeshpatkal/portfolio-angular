import { Component, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { DEFAULT_THEME, PORTFOLIO_THEMES } from '../../data/theme-config';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-preview',
  standalone: true,
  template: `
    <div
      class="theme-preview"
      [class.theme-preview--header]="placement() === 'header'"
      [class.theme-preview--mobile]="placement() === 'mobile'"
      #panel
    >
      <button
        #toggleButton
        type="button"
        class="theme-preview__toggle theme-toggle-btn"
        (click)="togglePanel()"
        [attr.aria-expanded]="isOpen()"
        aria-label="Choose color theme"
      >
        @if (isOpen()) {
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        } @else {
          <i class="bi bi-palette-fill" aria-hidden="true"></i>
        }
      </button>

      @if (isOpen()) {
        <div
          #themeDialog
          class="theme-preview__panel"
          [class.theme-preview__panel--header]="placement() === 'header'"
          [class.theme-preview__panel--mobile]="placement() === 'mobile'"
          role="dialog"
          aria-modal="true"
          aria-label="Theme picker"
        >
          <div class="grid grid-cols-3 gap-x-4 gap-y-4">
            @for (theme of themes; track theme.id) {
              <button
                type="button"
                class="flex flex-col items-center gap-2 border-0 bg-transparent p-0 transition-transform hover:scale-110 active:scale-95"
                [attr.data-theme-id]="theme.id"
                (click)="selectTheme(theme.id)"
              >
                <span
                  class="relative h-12 w-12 rounded-full border-2 shadow-md"
                  [class.border-white]="themeService.theme() === theme.id"
                  [class.border-border]="themeService.theme() !== theme.id"
                  [style.opacity]="themeService.theme() === theme.id ? '1' : '0.5'"
                  [style.background-image]="'linear-gradient(135deg, ' + theme.colors.primary + ', ' + theme.colors.secondary + ')'"
                >
                  @if (themeService.theme() === theme.id) {
                    <span class="absolute inset-0 flex items-center justify-center">
                      <i class="bi bi-check-lg text-xl text-white drop-shadow-md" aria-hidden="true"></i>
                    </span>
                  }
                </span>
                <span
                  class="text-xs text-center"
                  [class.text-primary]="themeService.theme() === theme.id"
                  [class.font-medium]="themeService.theme() === theme.id"
                  [class.text-muted-foreground]="themeService.theme() !== theme.id"
                >
                  {{ theme.name.split(' ')[0] }}
                  @if (theme.id === defaultTheme) {
                    <span class="theme-preview__default-badge">Default</span>
                  }
                </span>
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class ThemePreviewComponent {
  readonly placement = input<'header' | 'mobile'>('header');

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly themeDialog = viewChild<ElementRef<HTMLElement>>('themeDialog');

  readonly themeService = inject(ThemeService);
  readonly themes = PORTFOLIO_THEMES;
  readonly defaultTheme = DEFAULT_THEME;
  readonly isOpen = signal(false);

  togglePanel(): void {
    if (this.isOpen()) {
      this.closePanel({ restoreFocus: true });
      return;
    }

    this.isOpen.set(true);
    this.focusSelectedTheme();
  }

  selectTheme(themeId: (typeof PORTFOLIO_THEMES)[number]['id']): void {
    this.themeService.setTheme(themeId);
    this.closePanel({ restoreFocus: true });
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const panelEl = this.panel()?.nativeElement;
    if (panelEl && !panelEl.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePanel({ restoreFocus: true });
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private closePanel(options: { restoreFocus?: boolean } = {}): void {
    this.isOpen.set(false);

    if (options.restoreFocus) {
      this.toggleButton()?.nativeElement.focus();
    }
  }

  private focusSelectedTheme(): void {
    queueMicrotask(() => {
      const dialog = this.themeDialog()?.nativeElement;
      const selectedTheme = this.themeService.theme();
      const selectedButton = dialog?.querySelector<HTMLButtonElement>(
        `[data-theme-id="${selectedTheme}"]`
      );

      selectedButton?.focus();
    });
  }

  private trapFocus(event: KeyboardEvent): void {
    const dialog = this.themeDialog()?.nativeElement;

    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

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
}
