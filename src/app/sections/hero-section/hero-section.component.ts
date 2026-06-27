import { Component, inject } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { SITE, getSocialLinks } from '../../data/site.data';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  private readonly scrollService = inject(ScrollService);

  readonly site = SITE;
  readonly socialLinks = getSocialLinks();

  scrollTo(sectionId: string): void {
    this.scrollService.navigateToSection(sectionId);
  }
}
