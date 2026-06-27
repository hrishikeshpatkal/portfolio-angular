export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  skills: Skill[];
}
