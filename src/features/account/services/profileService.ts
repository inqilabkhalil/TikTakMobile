import { api } from '@/shared/services/api';
import { isLocalFileUri, resolveMediaUrl } from '@/shared/utils/mediaUrl';
import { ApiResponse } from '@/shared/types/api';
import { UpdateProfilePayload, UserProfile } from '@/shared/types/user';

const PROFILE_ENDPOINT = '/profile';

const ADDRESS_PLACEHOLDER = ' ';

type ProfileRequestBody = {
  full_name: string;
  address: string;
  phone?: string;
  email?: string;
  img_url?: string;
  password?: string;
  password_repeat?: string;
};

function toRequestBody(payload: UpdateProfilePayload): ProfileRequestBody {
  const body: ProfileRequestBody = {
    full_name: payload.full_name?.trim() ?? '',
    address: payload.address?.trim() || ADDRESS_PLACEHOLDER,
  };

  const phone = payload.phone?.trim();
  if (phone) body.phone = phone;

  const email = payload.email?.trim();
  if (email) body.email = email;

  const imgUrl = payload.img_url?.trim();
  if (imgUrl && !isLocalFileUri(imgUrl)) body.img_url = imgUrl;

  if (payload.password) {
    body.password = payload.password;
    body.password_repeat = payload.password_repeat;
  }

  return body;
}

function normalizeProfile(profile: UserProfile): UserProfile {
  return {
    ...profile,
    address: profile?.address?.trim() ?? '',
    img_url: resolveMediaUrl(profile?.img_url) ?? '',
  };
}

export const profileService = {
  getProfile: () =>
    api
      .get<ApiResponse<UserProfile>>(PROFILE_ENDPOINT)
      .then(res => normalizeProfile(res.data.data)),

  updateProfile: (payload: UpdateProfilePayload) =>
    api
      .put<ApiResponse<UserProfile>>(PROFILE_ENDPOINT, toRequestBody(payload))
      .then(res => normalizeProfile(res.data.data)),
};
