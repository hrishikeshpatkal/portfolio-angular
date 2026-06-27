import { Component } from '@angular/core';
import { EDUCATION } from '../../data/education.data';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './education-section.component.html',
})
export class EducationSectionComponent {
  readonly education = EDUCATION;
}
