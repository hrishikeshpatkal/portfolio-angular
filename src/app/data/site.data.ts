import { SiteConfig, SocialLink } from '../models/site.model';

export const SITE: SiteConfig = {
  name: 'Hrishikesh Patkal',
  title: 'Full Stack Developer',
  heroDescriptionParts: [
    { text: 'I build ' },
    { text: 'scalable ERP web applications', emphasis: 'primary' },
    { text: ' with ' },
    { text: 'modern full-stack architecture', emphasis: 'secondary' },
    { text: ' that deliver ' },
    { text: 'measurable business value', emphasis: 'accent' },
    { text: '.' },
  ],
  tagline:
    '4+ years at JiBe shipping maritime ERP for 5,000+ users across 50+ sites — 150+ REST APIs, event-driven sync, and AWS delivery in the real world.',
  email: 'hrishikeshpatkal@gmail.com',
  phone: '+91 70660 00877',
  location: 'Pune, Maharashtra, India',
  yearsOfExperience: 4,
  availability: 'Open to new opportunities',
  aboutIntro:
    'Pune-based full-stack developer with 4+ years at JiBe building maritime ERP for 5,000+ users across 50+ sites. I work across APIs, event-driven sync, cloud delivery, and Angular — shipping software that stays fast, secure, and reliable under real operational load.',
  aboutPillars: [
    {
      icon: 'bi-code-slash',
      title: 'Full-stack delivery',
      text: 'Angular, Node.js, TypeScript, and 150+ REST APIs — designed, built, and maintained in production.',
    },
    {
      icon: 'bi-cloud-check',
      title: 'Cloud-native systems',
      text: 'Scalable AWS architecture with event-driven sync and microservices built for multi-site enterprise workloads.',
    },
    {
      icon: 'bi-speedometer2',
      title: 'Performance & UX',
      text: 'Responsive Angular with lazy loading and virtual scroll — plus backend tuning that cut API response times by 65%.',
    },
    {
      icon: 'bi-layers',
      title: 'Clean architecture',
      text: 'Layered APIs, solid design patterns, and maintainable codebases teams can extend without breaking what works.',
    },
    {
      icon: 'bi-robot',
      title: 'AI-assisted engineering',
      text: 'Copilot, Cursor, and LLM tooling in the daily workflow — shipping faster without sacrificing clarity or quality.',
    },
    {
      icon: 'bi-boxes',
      title: 'DevOps & automation',
      text: 'Docker, Kubernetes, and CI/CD pipelines that keep releases predictable and environments consistent.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Reliable & secure',
      text: 'Production discipline, observability, and 99.5% uptime on systems where downtime is not an option.',
    },
    {
      icon: 'bi-bullseye',
      title: 'Product thinking',
      text: 'Turning complex business requirements into focused interfaces and workflows crews can trust immediately.',
    },
  ],
  educationLine:
    'B.E. from Universal College of Engineering and Research, Pune, and PG-DAC (First Class with Distinction) from CDAC Mumbai.',
  metrics: [
    { value: '4+', label: 'Years building software' },
    { value: '5,000+', label: 'Users served daily' },
    { value: '150+', label: 'REST APIs shipped' },
    { value: '99.5%', label: 'Production uptime' },
  ],
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Hrishikesh-Patkal-Resume.pdf',
  logoUrl: '/images/hp-logo.jpeg',
  photoUrl: '/images/profile-photo.webp',
  siteUrl: 'https://hrishikeshpatkal.dev',
  ogImage: '/images/profile-photo.png',
  social: {
    github: 'https://github.com/hrishikeshpatkal',
    linkedin: 'https://linkedin.com/in/hrishikesh-patkal',
  },
  githubStats: {
    username: 'hrishikeshpatkal',
    fallback: {
      publicRepos: 0,
      followers: 0,
      following: 0,
      memberSinceYear: 2020,
    },
  },
};

export function getSocialLinks(site: SiteConfig = SITE): SocialLink[] {
  return [
    {
      key: 'github',
      label: 'GitHub',
      icon: 'bi-github',
      url: site.social.github,
      external: true,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: 'bi-linkedin',
      url: site.social.linkedin,
      external: true,
    },
    {
      key: 'email',
      label: 'Email',
      icon: 'bi-envelope-at',
      url: `mailto:${site.email}`,
      external: false,
    },
  ];
}
