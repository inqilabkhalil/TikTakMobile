import { launchImageLibrary } from 'react-native-image-picker';
import { useUserStore } from '@/shared/store/userStore';
import { uploadService } from '@/shared/services/uploadService';
import { profileService } from '../services/profileService';

export function useAvatarPicker(
  fallbackUri?: string,
  onImageSelected?: (uri: string) => void,
) {
  const user = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);

  const pickAvatar = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    const asset = response.assets?.[0];
    if (!asset || !asset.uri) return;
    updateUser({ img_url: asset.uri });
    if (onImageSelected) onImageSelected(asset.uri);

    try {
      const uploadedUrl = await uploadService.uploadImage(asset);

      const updatedProfile = await profileService.updateProfile({
        full_name: user?.full_name ?? '',
        phone: user?.phone ?? '',
        email: user?.email ?? '',
        address: user?.address ?? '',
        img_url: uploadedUrl,
      });

      updateUser(updatedProfile);
    } catch {
    }
  };

  return {
    avatarUri: user?.img_url || fallbackUri,
    pickAvatar,
  };
}