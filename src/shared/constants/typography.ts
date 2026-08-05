import { pixelFont, pixelHeight } from '../utils/metrics';

export const TYPOGRAPHY = {
  tabBarLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(12),
    lineHeight: pixelHeight(16),
    letterSpacing: 0,
    textAlign: 'center' as const,
  },
};
