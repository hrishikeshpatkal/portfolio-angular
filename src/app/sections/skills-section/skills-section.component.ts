import { Component } from '@angular/core';
import { SKILL_CATEGORIES } from '../../data/skills.data';
import { buildVisibleSkillCategories } from '../../data/skills.utils';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './skills-section.component.html',
})
export class SkillsSectionComponent {
  readonly categories = buildVisibleSkillCategories(SKILL_CATEGORIES);

  getIconUrl(skill: Skill): string {
    return `/icons/skills/${skill.icon}.svg`;
  }
}
