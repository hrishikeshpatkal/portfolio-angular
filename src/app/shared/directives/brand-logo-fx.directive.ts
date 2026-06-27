import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MotionService } from '../../core/services/motion.service';

@Directive({
  selector: '[appBrandLogoFx]',
  standalone: true,
})
export class BrandLogoFxDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly motion = inject(MotionService);

  private logoFx?: HTMLElement;
  private touchActive = false;
  private tapTimeout = 0;
  private tiltFrame = 0;
  private pendingPointer?: PointerEvent;
  private readonly disposers: Array<() => void> = [];

  constructor() {
    effect(() => {
      if (!this.motion.enabled()) {
        this.resetLogoFx();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.resolveLogoFx();
    if (!this.logoFx || !this.motion.enabled()) {
      return;
    }

    this.bindInteractions();
  }

  ngOnDestroy(): void {
    if (this.tapTimeout) {
      window.clearTimeout(this.tapTimeout);
    }

    if (this.tiltFrame) {
      window.cancelAnimationFrame(this.tiltFrame);
    }

    this.disposers.forEach((dispose) => dispose());
    this.disposers.length = 0;
  }

  private resolveLogoFx(): void {
    const brand = this.host.nativeElement;
    const logoFx = brand.querySelector('.brand-logo-fx');
    this.logoFx = logoFx instanceof HTMLElement ? logoFx : undefined;
  }

  private bindInteractions(): void {
    const brand = this.host.nativeElement;
    const canUsePointerFx = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canUsePointerFx) {
      this.bindPointerTilt(brand);
    }

    this.bindTapFx(brand);
  }

  private bindPointerTilt(brand: HTMLElement): void {
    const logoFx = this.logoFx;
    if (!logoFx) {
      return;
    }

    const applyTilt = (event: PointerEvent): void => {
      if (!this.motion.enabled() || this.touchActive) {
        return;
      }

      const rect = logoFx.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const tiltX = (y / 100 - 0.5) * -14;
      const tiltY = (x / 100 - 0.5) * 14;

      logoFx.style.setProperty('--logo-x', `${x}%`);
      logoFx.style.setProperty('--logo-y', `${y}%`);
      logoFx.style.setProperty('--logo-tilt-x', `${tiltX.toFixed(2)}deg`);
      logoFx.style.setProperty('--logo-tilt-y', `${tiltY.toFixed(2)}deg`);
      logoFx.classList.add('brand-logo-fx--active');
    };

    const handleMove = (event: PointerEvent): void => {
      this.pendingPointer = event;

      if (this.tiltFrame) {
        return;
      }

      this.tiltFrame = window.requestAnimationFrame(() => {
        this.tiltFrame = 0;

        if (this.pendingPointer) {
          applyTilt(this.pendingPointer);
          this.pendingPointer = undefined;
        }
      });
    };

    const reset = (): void => {
      if (this.touchActive) {
        return;
      }

      this.pendingPointer = undefined;

      if (this.tiltFrame) {
        window.cancelAnimationFrame(this.tiltFrame);
        this.tiltFrame = 0;
      }

      logoFx.classList.remove('brand-logo-fx--active');
      logoFx.style.removeProperty('will-change');
      logoFx.style.removeProperty('--logo-x');
      logoFx.style.removeProperty('--logo-y');
      logoFx.style.removeProperty('--logo-tilt-x');
      logoFx.style.removeProperty('--logo-tilt-y');
    };

    const onEnter = (): void => {
      logoFx.style.transition = 'transform 0.2s ease-out';
      logoFx.style.setProperty('will-change', 'transform');
    };

    this.addListener(brand, 'pointerenter', onEnter);
    this.addListener(brand, 'pointermove', handleMove);
    this.addListener(brand, 'pointerleave', reset);
  }

  private bindTapFx(brand: HTMLElement): void {
    const logoFx = this.logoFx;
    if (!logoFx) {
      return;
    }

    const setBurstOrigin = (event?: PointerEvent): void => {
      const rect = logoFx.getBoundingClientRect();

      if (event) {
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        logoFx.style.setProperty('--burst-x', `${x}%`);
        logoFx.style.setProperty('--burst-y', `${y}%`);
        logoFx.style.setProperty('--logo-x', `${x}%`);
        logoFx.style.setProperty('--logo-y', `${y}%`);
        return;
      }

      logoFx.style.setProperty('--burst-x', '50%');
      logoFx.style.setProperty('--burst-y', '50%');
    };

    const triggerTap = (event?: PointerEvent): void => {
      if (!this.motion.enabled()) {
        return;
      }

      setBurstOrigin(event);

      logoFx.classList.remove('brand-logo-fx--tap');
      void logoFx.offsetWidth;
      logoFx.classList.add('brand-logo-fx--tap');

      if (this.tapTimeout) {
        window.clearTimeout(this.tapTimeout);
      }

      this.tapTimeout = window.setTimeout(() => {
        logoFx.classList.remove('brand-logo-fx--tap');
        logoFx.style.removeProperty('--burst-x');
        logoFx.style.removeProperty('--burst-y');
      }, 520);
    };

    const onDown = (event: PointerEvent): void => {
      if (!this.motion.enabled()) {
        return;
      }

      this.touchActive = event.pointerType === 'touch';
      logoFx.classList.add('brand-logo-fx--active');
      triggerTap(event);
    };

    const onUp = (): void => {
      if (!this.motion.enabled()) {
        return;
      }

      if (this.touchActive) {
        window.setTimeout(() => {
          logoFx.classList.remove('brand-logo-fx--active');
          this.touchActive = false;
        }, 180);
        return;
      }

      logoFx.classList.remove('brand-logo-fx--active');
    };

    this.addListener(brand, 'pointerdown', onDown);
    this.addListener(brand, 'pointerup', onUp);
    this.addListener(brand, 'pointercancel', onUp);
    this.addListener(brand, 'keydown', (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;

      if (keyboardEvent.key === ' ') {
        keyboardEvent.preventDefault();
      }

      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        triggerTap();
      }
    });
  }

  private resetLogoFx(): void {
    const logoFx = this.logoFx;
    if (!logoFx) {
      return;
    }

    this.touchActive = false;
    this.pendingPointer = undefined;

    if (this.tiltFrame) {
      window.cancelAnimationFrame(this.tiltFrame);
      this.tiltFrame = 0;
    }

    if (this.tapTimeout) {
      window.clearTimeout(this.tapTimeout);
      this.tapTimeout = 0;
    }

    logoFx.classList.remove('brand-logo-fx--active', 'brand-logo-fx--tap', 'brand-logo-fx--boot');
    logoFx.style.removeProperty('--logo-x');
    logoFx.style.removeProperty('--logo-y');
    logoFx.style.removeProperty('--logo-tilt-x');
    logoFx.style.removeProperty('--logo-tilt-y');
    logoFx.style.removeProperty('--burst-x');
    logoFx.style.removeProperty('--burst-y');
    logoFx.style.removeProperty('will-change');
  }

  private addListener<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void
  ): void {
    const handler = listener as EventListener;
    target.addEventListener(type, handler);
    this.disposers.push(() => target.removeEventListener(type, handler));
  }
}
