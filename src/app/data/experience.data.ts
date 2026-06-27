import { Experience } from '../models/experience.model';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'JiBe Development Services Pvt. Ltd.',
    role: 'Full Stack Developer',
    type: 'Full-time',
    startDate: 'May 2022',
    endDate: 'Present',
    location: 'Pune, Maharashtra, India',
    summary:
      'Building and scaling a maritime enterprise ERP used across 50+ sites worldwide — owning API architecture, event-driven sync, cloud delivery, and the Angular UI crews rely on every day.',
    metrics: [
      { value: '4+ yrs', label: 'In role' },
      { value: '5,000+', label: 'Daily users' },
      { value: '150+', label: 'REST APIs' },
      { value: '65%', label: 'Faster APIs' },
      { value: '50K+', label: 'Daily syncs' },
      { value: '99.5%', label: 'Uptime' },
    ],
    highlights: [
      'Own full-stack delivery on JiBe’s ERP — compliance, permits, audits, incident reporting, and offline-first sync for distributed maritime teams.',
      'Architected 150+ REST APIs in Node.js, Express, and TypeScript with a clean Controller → Business Logic → Data Access structure.',
      'Built RabbitMQ microservices processing 50,000+ messages per day to keep 50+ sites synchronized with zero data loss.',
      'Shipped Angular 19 UI with standalone components, lazy loading, virtual scrolling, OnPush, and NgRx for heavy operational data.',
      'Improved API response times by 65% and cut database load by 40% through indexing, query tuning, stored procedures, and Redis caching.',
      'Deployed on AWS (EC2, ECS, RDS, Lambda, SQS, SNS) with Docker, CI/CD automation, Datadog observability, and 99.5% production uptime.',
    ],
  },
  {
    id: 'exp-2',
    company: 'Tata AutoComp Systems Ltd.',
    role: 'Internship Trainee',
    type: 'Internship',
    startDate: 'Sept 2021',
    endDate: 'Aug 2022',
    location: 'Pune, Maharashtra, India',
    summary:
      'Completed a year-long internship in enterprise application development — supporting internal teams with build, testing, troubleshooting, and documentation.',
    metrics: [
      { value: '1 yr', label: 'Duration' },
      { value: '2021–22', label: 'Period' },
    ],
    highlights: [
      'Partnered with senior developers to translate business requirements into application workflows and support processes.',
      'Contributed to development, testing, and maintenance of internal software systems.',
      'Prepared technical documentation and supported debugging, issue tracking, and day-to-day team coordination.',
    ],
  },
];
