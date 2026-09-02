import { api, isNetworkError, isTimeoutError } from './api';
import { isLocalFileUri, resolveMediaUrl } from '@/shared/utils/mediaUrl';
import type { ApiResponse } from '@/shared/types/api';
import type { Asset } from 'react-native-image-picker';

const FILE_FIELD = 'file';
const MAX_ATTEMPTS = 3;
const UPLOAD_TIMEOUT_MS = 60000;
const CRLF = '\r\n';
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

function sanitizeFileName(fileName: string): string {
  const safe = fileName.replace(/[^A-Za-z0-9._-]/g, '_');
  return safe.length ? safe : 'avatar.jpg';
}

function asciiToBytes(text: string): Uint8Array {
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    bytes[i] = text.charCodeAt(i) & 0x7f;
  }
  return bytes;
}

const BASE64_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const BASE64_LOOKUP = (() => {
  const table = new Uint8Array(128);
  for (let i = 0; i < BASE64_ALPHABET.length; i++) {
    table[BASE64_ALPHABET.charCodeAt(i)] = i;
  }
  return table;
})();

function base64ToBytes(input: string): Uint8Array {
  const clean = input
    .replace(/^data:[^,]*,/, '')
    .replace(/[^A-Za-z0-9+/]/g, '');

  const bytes = new Uint8Array(Math.floor((clean.length * 3) / 4));
  let byteIndex = 0;
  let buffer = 0;
  let bits = 0;

  for (let i = 0; i < clean.length; i++) {
    buffer = (buffer << 6) | BASE64_LOOKUP[clean.charCodeAt(i)];
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      bytes[byteIndex++] = (buffer >> bits) & 0xff;
    }
  }

  return byteIndex === bytes.length ? bytes : bytes.subarray(0, byteIndex);
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(total);

  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

function buildMultipartBody(
  base64Data: string,
  fileName: string,
  mimeType: string,
): { body: ArrayBuffer; contentType: string } {
  const boundary = `----TikTakFormBoundary${Date.now().toString(16)}${Math.random()
    .toString(16)
    .slice(2, 10)}`;

  const header =
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="${FILE_FIELD}"; filename="${sanitizeFileName(
      fileName,
    )}"${CRLF}` +
    `Content-Type: ${mimeType}${CRLF}${CRLF}`;

  const footer = `${CRLF}--${boundary}--${CRLF}`;

  const bytes = concatBytes([
    asciiToBytes(header),
    base64ToBytes(base64Data),
    asciiToBytes(footer),
  ]);
  const body = new ArrayBuffer(bytes.length);
  new Uint8Array(body).set(bytes);

  return {
    body,
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
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

    const send = () => {
      if (asset.base64) {
        const { body, contentType } = buildMultipartBody(
          asset.base64,
          fileName,
          mimeType,
        );

        return api.post<ApiResponse<UploadResponseData>>('/upload', body, {
          headers: { 'Content-Type': contentType },
          timeout: UPLOAD_TIMEOUT_MS,
        });
      }

      return api.post<ApiResponse<UploadResponseData>>(
        '/upload',
        buildFormDataBody(asset, fileName, mimeType),
        { timeout: UPLOAD_TIMEOUT_MS },
      );
    };

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