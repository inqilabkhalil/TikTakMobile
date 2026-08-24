import type { Campaign } from './campaign';

export interface CampaignState {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
  fetchCampaigns: (signal?: AbortSignal) => Promise<void>;
}

export const INITIAL_CAMPAIGN_STATE: Pick<CampaignState, 'campaigns' | 'isLoading' | 'error'> = {
  campaigns: [],
  isLoading: false,
  error: null,
};
