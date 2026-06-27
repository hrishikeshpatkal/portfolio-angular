import { GitHubStatsConfig } from './github-stats.model';

export interface SiteMetric {
  value: string;
  label: string;
}

export interface AboutPillar {
  icon: string;
  title: string;
  text: string;
}

export type HeroEmphasis = 'primary' | 'secondary' | 'accent' | 'strong';

export interface HeroTextPart {
  text: string;
  emphasis?: HeroEmphasis;
}

export interface SiteConfig {
  name: string;
  title: string;
  heroDescriptionParts: HeroTextPart[];
  tagline: string;
  email: string;
  phone: string;
  location: string;
  yearsOfExperience: number;
  availability: string;
  aboutIntro: string;
  aboutPillars: AboutPillar[];
  educationLine: string;
  metrics: SiteMetric[];
  resumeUrl: string;
  resumeFileName: string;
  logoUrl: string;
  photoUrl: string;
  siteUrl: string;
  ogImage: string;
  social: {
    github: string;
    linkedin: string;
  };
  githubStats: GitHubStatsConfig;
}

export interface SocialLink {
  key: string;
  label: string;
  icon: string;
  url: string;
  external: boolean;
}
