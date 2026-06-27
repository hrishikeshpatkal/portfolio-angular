export interface NavItem {
  id: string;
  label: string;
}

/** Primary in-page sections — logo links to home; nav starts at About */
export const PRIMARY_NAV: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/** Page scroll order — includes sections not shown in the header nav */
export const SCROLL_SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'contact',
];
