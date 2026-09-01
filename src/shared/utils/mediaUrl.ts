import Config from 'react-native-config';

const LOCAL_URI_PATTERN = /^(file:|content:|ph:|assets-library:|data:)/i;

export function isLocalFileUri(uri?: string | null): boolean {
  return !!uri && LOCAL_URI_PATTERN.test(uri.trim());
}

function getApiOrigin(): string {
  const base = Config.API_URL ?? '';
  const match = base.match(/^(https?:\/\/[^/]+)/i);
  return match ? match[1] : '';
}

export function resolveMediaUrl(url?: string | null): string | undefined {
  const value = url?.trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value) || isLocalFileUri(value)) return value;

  const origin = getApiOrigin();
  if (!origin) return value;

  return `${origin}/${value.replace(/^\//, '')}`;
}