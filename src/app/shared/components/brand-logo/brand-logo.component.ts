import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MotionService } from '../../../core/services/motion.service';

export type BrandLogoSize = 'header' | 'footer';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  template: `
    <span
      #logoFx
      class="brand-logo-fx"
      [class.brand-logo-fx--header]="size === 'header'"
      [class.brand-logo-fx--footer]="size === 'footer'"
      aria-hidden="true"
    >
      <span class="brand-logo-fx__ring"></span>
      <span class="brand-logo-fx__orbit"></span>
      <span class="brand-logo-fx__burst"></span>
      <span class="brand-logo-fx__core">
        <span class="brand-logo-fx__glow"></span>
        <span class="brand-logo-fx__scanline"></span>
        <img
          class="brand-logo-fx__image"
          [src]="src"
          alt=""
          [attr.width]="imageSize"
          [attr.height]="imageSize"
          decoding="async"
        />
      </span>
    </span>
  `,
})
export class BrandLogoComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) src!: string;
  @Input() size: BrandLogoSize = 'header';
  @Input() bootOnLoad = false;

  private readonly logoFx = viewChild<ElementRef<HTMLElement>>('logoFx');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly motion = inject(MotionService);

  private bootTimeout = 0;

  get imageSize(): number {
    return this.size === 'header' ? 40 : 36;
  }

  ngAfterViewInit(): void {
    if (!this.bootOnLoad || !isPlatformBrowser(this.platformId) || !this.motion.enabled()) {
      return;
    }

    const logoFx = this.logoFx()?.nativeElement;
    if (!logoFx) {
      return;
    }

    logoFx.classList.add('brand-logo-fx--boot');

    const finishBoot = (): void => {
      logoFx.classList.remove('brand-logo-fx--boot');
    };

    logoFx.addEventListener('animationend', finishBoot, { once: true });
    this.bootTimeout = window.setTimeout(finishBoot, 1100);
  }

  ngOnDestroy(): void {
    if (this.bootTimeout) {
      window.clearTimeout(this.bootTimeout);
    }
  }
}
