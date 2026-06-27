export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  location?: string;
  companyUrl?: string;
  summary: string;
  metrics: ExperienceMetric[];
  highlights: string[];
}
