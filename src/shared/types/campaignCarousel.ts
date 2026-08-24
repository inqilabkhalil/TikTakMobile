import type { Campaign } from './campaign';

export interface CampaignCarouselProps {
  campaigns: Campaign[];
  onPress?: (campaign?: Campaign) => void;
  fallbackImage?: number;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}
