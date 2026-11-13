export const SHOW_TYPES = ['drama', 'movie'] as const;
export type SHOW_TYPES = typeof SHOW_TYPES;

export const SHOW_FORMATS = [
  { name: 'standard series', type: 'drama' },
  { name: 'anthology', type: 'drama' },
  { name: 'web series', type: 'drama' },
  { name: 'mini series', type: 'drama' },
  { name: 'short film', type: 'movie' },
  { name: 'feature film', type: 'movie' },
  { name: 'others', type: 'movie' },
] as const;
export type SHOW_FORMATS = typeof SHOW_FORMATS;

export const SHOW_STATUS = [
  { name: 'upcoming', type: 'drama' },
  { name: 'ongoing', type: 'drama' },
  { name: 'completed', type: 'drama' },
  { name: 'released', type: 'movie' },
] as const;
export type SHOW_STATUS = typeof SHOW_STATUS;

export const COVERS = ['hd', 'md', 'sd'] as const;
export type COVERS = typeof COVERS;
