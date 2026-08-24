import { create } from 'zustand';
import { campaignService } from '@/features/campaign/services/campaignService';
import { INITIAL_CAMPAIGN_STATE, type CampaignState } from '../types/campaignStore';

export const useCampaignStore = create<CampaignState>(set => ({
  ...INITIAL_CAMPAIGN_STATE,

  fetchCampaigns: async signal => {
    set({ isLoading: true, error: null });
    try {
      const campaigns = await campaignService.getCampaigns(signal);
      set({ campaigns, isLoading: false });
    } catch {
      set({ error: 'Kampaniyalar yüklənmədi', isLoading: false });
    }
  },
}));
