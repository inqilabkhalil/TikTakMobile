import { api, isNetworkError, isTimeoutError } from './api';
import { isLocalFileUri, resolveMediaUrl } from '@/shared/utils/mediaUrl';
import type { ApiResponse } from '@/shared/types/api';
import type { Asset } from 'react-native-image-picker';

const FILE_FIELD = 'file';
const MAX_ATTEMPTS = 3;
const UPLOAD_TIMEOUT_MS = 60000;
type UploadResponseData = string | { url?: string; path?: string } | null;

function resolveFileName(asset: Asset): string {
  const name = asset.fileName?.trim();
  if (name) return name;

  const fromUri = asset.uri?.split('?')[0].split('/').pop();
  if (fromUri && fromUri.includes('.')) return fromUri;

  const ext = (asset.type?.split('/')[1] ?? 'jpg').replace('jpeg', 'jpg');
  return `avatar_${Date.now()}.${ext}`;
}

function resolveMimeType(asset: Asset, fileName: string): string {
  if (asset.type?.includes('/')) return asset.type;

  switch (fileName.split('.').pop()?.toLowerCase()) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'heic':
    case 'heif':
      return 'image/heic';
    default:
      return 'image/jpeg';
  }
}

function extractUrl(data: UploadResponseData): string | undefined {
  if (!data) return undefined;
  if (typeof data === 'string') return data.trim() || undefined;
  return (data.url ?? data.path)?.trim() || undefined;
}

function buildFormDataBody(asset: Asset, fileName: string, mimeType: string) {
  const formData = new FormData();

  formData.append(FILE_FIELD, {
    uri: asset.uri,
    type: mimeType,
    name: fileName,
  } as unknown as Blob);

  return formData;
}

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export const uploadService = {
  uploadImage: async (asset: Asset): Promise<string> => {
    if (!asset.uri) {
      throw new Error('Şəkil faylı tapılmadı');
    }

    if (!api.defaults.baseURL) {
      throw new Error('API ünvanı (API_URL) təyin edilməyib');
    }

    const fileName = resolveFileName(asset);
    const mimeType = resolveMimeType(asset, fileName);

    const send = () =>
      api.post<ApiResponse<UploadResponseData>>(
        '/upload',
        buildFormDataBody(asset, fileName, mimeType),
        { timeout: UPLOAD_TIMEOUT_MS },
      );

    let response;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        response = await send();
        break;
      } catch (error) {
        const isRetryable = isNetworkError(error) || isTimeoutError(error);
        if (!isRetryable || attempt === MAX_ATTEMPTS) throw error;

        await delay(attempt * 800);
      }
    }

    const rawUrl = extractUrl(response?.data?.data ?? null);
    if (!rawUrl) {
      throw new Error('Server şəkil ünvanını qaytarmadı');
    }
    if (isLocalFileUri(rawUrl)) {
      throw new Error('Server düzgün şəkil ünvanı qaytarmadı');
    }

    return resolveMediaUrl(rawUrl) ?? rawUrl;
  },
};