import { launchImageLibrary } from 'react-native-image-picker';
import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useUserStore } from '@/shared/store/userStore';
import { uploadService } from '@/shared/services/uploadService';
import {
  getApiErrorMessage,
  isNetworkError,
  isTimeoutError,
  isUnauthorizedError,
} from '@/shared/services/api';
import { resolveMediaUrl } from '@/shared/utils/mediaUrl';
import { profileService } from '../services/profileService';

export function useAvatarPicker(
  fallbackUri?: string,
  onImageSelected?: (uri: string) => void,
) {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const updateUser = useUserStore(state => state.updateUser);
  const [isUploading, setIsUploading] = useState(false);

  const pickAvatar = useCallback(async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      selectionLimit: 1,
    });

    if (response.didCancel) return;

    if (response.errorCode) {
      Toast.show({
        type: 'error',
        text1: 'Xəta',
        text2: response.errorMessage ?? 'Şəkil seçilə bilmədi',
      });
      return;
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) return;
    const previousImgUrl = useUserStore.getState().user?.img_url ?? '';

    const applyLocally = (uri: string) => {
      updateUser({ img_url: uri });
      onImageSelected?.(uri);
    };

    applyLocally(asset.uri);

    setIsUploading(true);

    let uploadedUrl: string;
    try {
      uploadedUrl = await uploadService.uploadImage(asset);
    } catch (err) {
      applyLocally(previousImgUrl);

      if (!isUnauthorizedError(err)) {
        Toast.show({
          type: 'error',
          text1: 'Şəkil yüklənmədi',
          text2: getApiErrorMessage(err, 'Şəkli serverə göndərmək mümkün olmadı'),
        });
      }

      setIsUploading(false);
      return;
    }

    const saveToProfile = () => {
      const latest = useUserStore.getState().user;
      return profileService.updateProfile({
        full_name: latest?.full_name ?? '',
        phone: latest?.phone ?? '',
        email: latest?.email ?? '',
        address: latest?.address ?? '',
        img_url: uploadedUrl,
      });
    };

    try {
      let updatedProfile;
      try {
        updatedProfile = await saveToProfile();
      } catch (err) {
        if (!isNetworkError(err) && !isTimeoutError(err)) throw err;
        updatedProfile = await saveToProfile();
      }

      const finalUrl =
        updatedProfile.img_url || resolveMediaUrl(uploadedUrl) || uploadedUrl;

      setUser({ ...updatedProfile, img_url: finalUrl });
      onImageSelected?.(finalUrl);

      Toast.show({
        type: 'success',
        text1: 'Uğurlu',
        text2: 'Profil şəkli yeniləndi',
      });
    } catch (err) {
      applyLocally(uploadedUrl);

      if (!isUnauthorizedError(err)) {
        Toast.show({
          type: 'error',
          text1: 'Şəkil yadda saxlanmadı',
          text2: getApiErrorMessage(
            err,
            'Şəkil yükləndi, lakin profilə yazılmadı. Yenidən cəhd edin.',
          ),
        });
      }
    } finally {
      setIsUploading(false);
    }
  }, [onImageSelected, setUser, updateUser]);

  return {
    avatarUri: user?.img_url || resolveMediaUrl(fallbackUri),
    pickAvatar,
    isUploading,
  };
}
