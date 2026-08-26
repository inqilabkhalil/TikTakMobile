import { api } from './api';
import type { ApiResponse } from '@/shared/types/api';
import type { Asset } from 'react-native-image-picker';

export const uploadService = {
  uploadImage: async (asset: Asset): Promise<string> => {
    if (!asset.uri) {
      throw new Error('Fayl tapılmadı');
    }

    const formData = new FormData();
    const fileToUpload = {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'avatar.jpg',
    };

    formData.append('file', fileToUpload as unknown as Blob);

    const response = await api.post<ApiResponse<{ url?: string; path?: string } | string>>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const resData = response.data?.data;
    const imageUrl = typeof resData === 'string' ? resData : resData?.url || resData?.path;

    if (!imageUrl) {
      throw new Error('Serverden URL gelmedi');
    }

    return imageUrl;
  },
};