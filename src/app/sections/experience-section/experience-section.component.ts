import { Component, signal } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { EXPERIENCES } from '../../data/experience.data';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent {
  readonly experiences = EXPERIENCES;
  readonly activeId = signal(EXPERIENCES[0]?.id ?? '');

  isCurrent(item: Experience): boolean {
    return item.endDate.toLowerCase() === 'present';
  }

  setActive(id: string): void {
    this.activeId.set(id);
  }
}
