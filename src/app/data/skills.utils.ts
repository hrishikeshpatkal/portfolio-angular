import { SkillCategory } from '../models/skill.model';

function normalizeSkillToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+]/g, '');
}

export function buildVisibleSkillCategories(categories: readonly SkillCategory[]): SkillCategory[] {
  const seen = new Set<string>();
  const visible: SkillCategory[] = [];

  for (const category of categories) {
    const skills = category.skills.filter((skill) => {
      const key = normalizeSkillToken(skill.name);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });

    if (skills.length > 0) {
      visible.push({ ...category, skills });
    }
  }

  return visible;
}
