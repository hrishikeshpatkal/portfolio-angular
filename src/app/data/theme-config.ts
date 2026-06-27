export type ThemeId =
  | 'developer-dark'
  | 'cyber-neon'
  | 'midnight-aurora'
  | 'navy-mirage'
  | 'ocean-depths'
  | 'cosmic-purple'
  | 'arctic-frost'
  | 'sunset-ember';

export interface ThemeInfo {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export const PORTFOLIO_THEMES: ThemeInfo[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Cyan & magenta neon vibes',
    colors: { primary: '#00d4ff', secondary: '#ff00ff', background: '#0f0f1a' },
  },
  {
    id: 'developer-dark',
    name: 'Developer Dark',
    description: 'Terminal green, syntax glow & IDE darkness',
    colors: { primary: '#00ff41', secondary: '#58a6ff', background: '#0a0e0a' },
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep blue & teal waves',
    colors: { primary: '#0ea5e9', secondary: '#14b8a6', background: '#0a1520' },
  },
  {
    id: 'navy-mirage',
    name: 'Navy Mirage',
    description: 'Deep navy & steel blue',
    colors: { primary: '#3F5E96', secondary: '#141E30', background: '#141E30' },
  },
  {
    id: 'midnight-aurora',
    name: 'Midnight Aurora',
    description: 'Green & purple aurora lights',
    colors: { primary: '#00ff88', secondary: '#8b5cf6', background: '#0a0f0d' },
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Purple',
    description: 'Purple & pink galaxy',
    colors: { primary: '#a855f7', secondary: '#ec4899', background: '#0f0a15' },
  },
  {
    id: 'arctic-frost',
    name: 'Arctic Frost',
    description: 'Glacier blue & soft lavender',
    colors: { primary: '#88c0d0', secondary: '#b48ead', background: '#2e3440' },
  },
  {
    id: 'sunset-ember',
    name: 'Sunset Ember',
    description: 'Warm amber & coral glow',
    colors: { primary: '#f59e0b', secondary: '#fb7185', background: '#1a1008' },
  },
];

export const DEFAULT_THEME: ThemeId = 'cyber-neon';

export const THEME_IDS = PORTFOLIO_THEMES.map((theme) => theme.id);

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return !!value && (THEME_IDS as string[]).includes(value);
}
