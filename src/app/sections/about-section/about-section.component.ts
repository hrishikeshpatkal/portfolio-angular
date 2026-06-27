import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SITE } from '../../data/site.data';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  readonly site = SITE;
}
