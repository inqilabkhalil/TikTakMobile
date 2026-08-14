import { useUserStore } from '@/shared/store';
import { useCallback, useEffect, useState } from 'react';
import { profileService } from '../services/profileService';
import Toast from 'react-native-toast-message';
import { UpdateProfilePayload } from '@/shared/types/user';

export function useProfile() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await profileService.getProfile();
      setUser(userData);
    } catch (err) {
      const message = 'Məlumatları yükləmək mümkün olmadı';
      setError(message);
      Toast.show({
        type: 'error',
        text1: 'Xəta',
        text2: 'message',
      });
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

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
        const updatedUser = await profileService.updateProfile(payload);
        setUser(updatedUser);
        Toast.show({
          type: 'success',
          text1: 'Uğurlu',
          text2: 'Məlumatlar yeniləndi',
        });
        return true;
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Xəta',
          text2: 'Məlumatları yeniləmək mümkün olmadı',
        });
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
