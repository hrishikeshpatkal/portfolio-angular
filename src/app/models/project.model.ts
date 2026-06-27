export type ProjectStatus = 'in-progress' | 'active' | 'polishing';

export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
}

export interface RecentProject {
  id: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  statusLabel: string;
  currentFocus: string;
  description: string;
  image: string;
  imageAlt: string;
  tech: string[];
  accent: 'primary' | 'secondary' | 'accent';
  icon: string;
  caseStudy: ProjectCaseStudy;
  liveUrl?: string;
  githubUrl?: string;
}
