import { SKILL_CATEGORIES } from './skills.data';
import { buildVisibleSkillCategories } from './skills.utils';

describe('skills.utils', () => {
  it('does not repeat the same skill across categories', () => {
    const visible = buildVisibleSkillCategories(SKILL_CATEGORIES);
    const names = visible.flatMap((category) => category.skills.map((skill) => skill.name));
    const unique = new Set(names);

    expect(unique.size).toBe(names.length);
  });

  it('keeps every category that has at least one skill', () => {
    const visible = buildVisibleSkillCategories(SKILL_CATEGORIES);

    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((category) => category.skills.length > 0)).toBeTrue();
  });
});
