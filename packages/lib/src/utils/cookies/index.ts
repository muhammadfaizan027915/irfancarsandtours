export function getCookie(key: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(key: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; path=/; expires=${expires.toUTCString()}`;
}
