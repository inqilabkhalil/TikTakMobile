import { useUserStore } from '@/shared/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profileService } from '../services/profileService';
import Toast from 'react-native-toast-message';
import { UpdateProfilePayload } from '@/shared/types/user';
import { isLocalFileUri } from '@/shared/utils/mediaUrl';
import { getApiErrorMessage, isUnauthorizedError } from '@/shared/services/api';

export function useProfile() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchProfile = useCallback(
    async (options?: { silent?: boolean }) => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await profileService.getProfile();
        setUser(userData);
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'Məlumatları yükləmək mümkün olmadı',
        );
        setError(message);

        if (!options?.silent && !isUnauthorizedError(err)) {
          Toast.show({ type: 'error', text1: 'Xəta', text2: message });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setUser],
  );

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchProfile({ silent: !!useUserStore.getState().user });
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchProfile,
  };
}

export function useUpdateProfile() {
  const setUser = useUserStore(state => state.setUser);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = useCallback(
    async (payload: UpdateProfilePayload): Promise<boolean> => {
      try {
        setIsUpdating(true);
        const currentImgUrl = useUserStore.getState().user?.img_url;
        const keepImgUrl = isLocalFileUri(currentImgUrl)
          ? undefined
          : currentImgUrl || undefined;

        const updatedUser = await profileService.updateProfile({
          ...payload,
          img_url: payload.img_url ?? keepImgUrl,
        });

        setUser({
          ...updatedUser,
          img_url: updatedUser.img_url || keepImgUrl || '',
        });

        Toast.show({
          type: 'success',
          text1: 'Uğurlu',
          text2: 'Məlumatlar yeniləndi',
        });
        return true;
      } catch (err) {
        if (!isUnauthorizedError(err)) {
          Toast.show({
            type: 'error',
            text1: 'Xəta',
            text2: getApiErrorMessage(
              err,
              'Məlumatları yeniləmək mümkün olmadı',
            ),
          });
        }
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [setUser],
  );

  return {
    updateProfile,
    isUpdating,
  };
}
