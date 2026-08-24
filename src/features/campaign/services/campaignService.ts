import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Campaign } from '@/shared/types/campaign';

export const campaignService = {
  getCampaigns: (signal?: AbortSignal) =>
    api.get<ApiResponse<Campaign[]>>('/campaigns', { signal }).then(res => res.data.data),
};
