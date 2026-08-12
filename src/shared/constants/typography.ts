import { pixelFont, pixelHeight } from '../utils/metrics';

export const TYPOGRAPHY = {
  tabBarLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(12),
    lineHeight: pixelHeight(16),
    letterSpacing: 0,
    textAlign: 'center' as const,
  },
  categoryLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(16),
    lineHeight: pixelHeight(16),
    letterSpacing: 0,
    textTransform: 'capitalize' as const,
  },
  bannerTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: pixelFont(26),
    lineHeight: pixelHeight(26),
    letterSpacing: 0,
    textTransform: 'uppercase' as const,
  },
  // fontSize/lineHeight estimated from the Figma screenshot (no direct Figma
  // access) — verify against the real Figma file and adjust if needed.
  deliveryLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(14),
    lineHeight: pixelHeight(19),
    letterSpacing: 0,
  },
  deliveryAddress: {
    fontFamily: 'Roboto-Light',
    fontSize: pixelFont(12),
    lineHeight: pixelHeight(16),
    letterSpacing: 0,
  },
  filterTag: {
    fontFamily: 'Roboto-Light',
    fontSize: pixelFont(14),
    lineHeight: pixelHeight(14),
    letterSpacing: 0,
  },
  productSheetTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(20),
    lineHeight: pixelHeight(20),
    letterSpacing: 0,
  },
  productSheetDescription: {
    fontFamily: 'Roboto-Light',
    fontSize: pixelFont(16),
    lineHeight: pixelHeight(22.4),
    letterSpacing: 0,
  },
  productSheetPrice: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(22),
    lineHeight: pixelHeight(22),
    letterSpacing: 0,
  },
};
