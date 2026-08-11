import type { PartialTheme } from '@ant-design/react-native/lib/style';

export const COLORS = {
  primary: 'rgba(118, 203, 79, 1)',
  error: '#F4333C',
  textPrimary: '#2B3043',
  textSecondary: '#8E8E93',
  textDark: '#101142',
  border: '#E5E5EA',
  white: '#FFFFFF',
  emptyText: '#E6E6E6',
  inputBackground: '#F6F5FB',
  inputButton: '#76CB4F',
  bannerPurple: 'rgba(179, 128, 255, 1)',
};

function parseRgb(color: string): { r: number; g: number; b: number } {
  const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  const [r, g, b] = match ? match.slice(1, 4).map(Number) : [0, 0, 0];
  return { r, g, b };
}

const { r, g, b } = parseRgb(COLORS.primary);
const primaryTap = `rgba(${Math.round(r * 0.85)}, ${Math.round(g * 0.85)}, ${Math.round(b * 0.85)}, 1)`;
const primaryFillTap = `rgba(${r}, ${g}, ${b}, 0.6)`;

// Brand tokens consumed by @ant-design/react-native's Provider `theme` prop.
// Provider merges this shallowly over the library defaults, so every token
// that visually derives from the brand color has to be listed explicitly —
// overriding `brand_primary` alone does not cascade to the others.
export const ANT_THEME: PartialTheme = {
  brand_primary: COLORS.primary,
  brand_primary_tap: primaryTap,
  primary_button_fill: COLORS.primary,
  primary_button_fill_tap: primaryTap,
  color_link: COLORS.primary,
  ghost_button_color: COLORS.primary,
  ghost_button_fill_tap: primaryFillTap,
};
