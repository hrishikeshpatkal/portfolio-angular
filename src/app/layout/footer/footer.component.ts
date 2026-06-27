import { Component, inject } from '@angular/core';
import { BrandLogoComponent } from '../../shared/components/brand-logo/brand-logo.component';
import { BrandLogoFxDirective } from '../../shared/directives/brand-logo-fx.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { SITE, getSocialLinks } from '../../data/site.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BrandLogoComponent, BrandLogoFxDirective],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);

  readonly site = SITE;
  readonly socialLinks = getSocialLinks();
  readonly year = new Date().getFullYear();
  readonly phoneHref = SITE.phone.replaceAll(' ', '');

  goHome(): void {
    this.scrollService.navigateToSection('home');
  }
}
