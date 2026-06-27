import {
  Component,
  inject,
  signal,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  viewChildren,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemePreviewComponent } from '../theme-preview/theme-preview.component';
import { BrandLogoComponent } from '../../shared/components/brand-logo/brand-logo.component';
import { BrandLogoFxDirective } from '../../shared/directives/brand-logo-fx.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { PRIMARY_NAV, SCROLL_SECTION_IDS } from '../../data/navigation.data';
import { SITE } from '../../data/site.data';

interface MobileNavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemePreviewComponent, BrandLogoComponent, BrandLogoFxDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly navItemsRef = viewChildren<ElementRef<HTMLButtonElement>>('navItem');
  private readonly mobileNavItemsRef = viewChildren<ElementRef<HTMLButtonElement>>('mobileNavItem');

  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);

  readonly site = SITE;
  readonly navItems = PRIMARY_NAV;
  readonly activeSection = signal('home');
  readonly isScrolled = signal(false);
  readonly indicatorLeft = signal(0);
  readonly mobileIndicatorLeft = signal(0);
  readonly mobileNavItems: MobileNavItem[] = [
    { id: 'home', label: 'Home', icon: 'bi-house-door-fill' },
    { id: 'skills', label: 'Skills', icon: 'bi-lightning-charge' },
    { id: 'experience', label: 'Experience', icon: 'bi-briefcase' },
    { id: 'projects', label: 'Projects', icon: 'bi-grid' },
    { id: 'contact', label: 'Contact', icon: 'bi-send' },
  ];

  private sectionElements: HTMLElement[] = [];
  private scrollFrame = 0;
  private programmaticScrollTarget?: string;
  private programmaticScrollTimeout?: number;
  private readonly handleViewportChange = (): void => {
    if (this.scrollFrame) {
      return;
    }

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.isScrolled.set(window.scrollY > 50);
      this.syncActiveSectionToViewport();
      this.updateIndicatorPositions();
    });
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupSectionTracking();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateIndicatorPositions();
    window.addEventListener('resize', this.updateIndicatorPositions);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.removeEventListener('scroll', this.handleViewportChange);
    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('resize', this.updateIndicatorPositions);

    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }

    this.clearProgrammaticScrollLock();
  }

  navigate(sectionId: string, event?: Event): void {
    this.lockActiveSectionDuringProgrammaticScroll(sectionId);
    this.activeSection.set(sectionId);
    this.scrollService.navigateToSection(sectionId);
    this.updateIndicatorPositions();

    if (event?.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }
  }

  isMobileNavActive(sectionId: string): boolean {
    return this.toMobileNavSection(this.activeSection()) === sectionId;
  }

  private readonly updateIndicatorPositions = (): void => {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const activeIndex = this.navItems.findIndex((item) => item.id === this.activeSection());
    const desktopItems = this.navItemsRef();
    const mobileItems = this.mobileNavItemsRef();

    if (activeIndex >= 0 && desktopItems[activeIndex]) {
      const track = desktopItems[activeIndex].nativeElement.parentElement;
      const item = desktopItems[activeIndex].nativeElement;
      if (track) {
        const trackRect = track.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const center = itemRect.left - trackRect.left + itemRect.width / 2;
        this.indicatorLeft.set(center - 12);
      }
    }

    const mobileActiveIndex = this.mobileNavItems.findIndex((item) => this.isMobileNavActive(item.id));
    if (mobileActiveIndex >= 0 && mobileItems[mobileActiveIndex]) {
      const track = mobileItems[mobileActiveIndex].nativeElement.parentElement;
      const item = mobileItems[mobileActiveIndex].nativeElement;
      if (track) {
        const trackRect = track.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const center = itemRect.left - trackRect.left + itemRect.width / 2;
        this.mobileIndicatorLeft.set(center - 30);
      }
    }
  };

  private setupSectionTracking(): void {
    this.sectionElements = SCROLL_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => !!element
    );

    if (!this.sectionElements.length) {
      return;
    }

    window.addEventListener('scroll', this.handleViewportChange, { passive: true });
    window.addEventListener('resize', this.handleViewportChange);
    this.handleViewportChange();
  }

  private syncActiveSectionToViewport(): void {
    const activationY = Math.min(window.innerHeight * 0.42, 360);

    if (this.programmaticScrollTarget) {
      const target = document.getElementById(this.programmaticScrollTarget);
      const targetRect = target?.getBoundingClientRect();
      const targetReached = !!targetRect && targetRect.top <= activationY && targetRect.bottom > activationY;

      if (!targetReached) {
        return;
      }

      this.clearProgrammaticScrollLock();
    }

    if (window.scrollY < 100) {
      this.activeSection.set('home');
      return;
    }

    const active = this.sectionElements.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= activationY && rect.bottom > activationY;
    });

    if (active?.id) {
      this.activeSection.set(active.id);
    }
  }

  private toMobileNavSection(sectionId: string): string {
    const sectionGroups: Record<string, string> = {
      home: 'home',
      about: 'home',
      skills: 'skills',
      projects: 'projects',
      experience: 'experience',
      education: 'experience',
      contact: 'contact',
    };

    return sectionGroups[sectionId] ?? sectionId;
  }

  private lockActiveSectionDuringProgrammaticScroll(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.clearProgrammaticScrollLock();
    this.programmaticScrollTarget = sectionId;
    this.programmaticScrollTimeout = window.setTimeout(() => {
      this.clearProgrammaticScrollLock();
      this.syncActiveSectionToViewport();
      this.updateIndicatorPositions();
    }, 1200);
  }

  private clearProgrammaticScrollLock(): void {
    if (this.programmaticScrollTimeout) {
      window.clearTimeout(this.programmaticScrollTimeout);
      this.programmaticScrollTimeout = undefined;
    }

    this.programmaticScrollTarget = undefined;
  }

}
