import { api } from "@/shared/services/api";
import { ApiResponse } from "@/shared/types/api";
import { UpdateProfilePayload, UserProfile } from "@/shared/types/user";

const PROFILE_ENDPOINT = '/profile';

export const profileService = {
    getProfile: () =>
        api
    .get<ApiResponse<UserProfile>>(PROFILE_ENDPOINT)
    .then(res => res.data.data),

    updateProfile: (payload: UpdateProfilePayload) =>
        api
    .put<ApiResponse<UserProfile>>(PROFILE_ENDPOINT, payload)
    .then(res => res.data.data),
}