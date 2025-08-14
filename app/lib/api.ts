import { Platform } from 'react-native';

const getBaseUrl = (): string => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl && envUrl.length > 0) return envUrl;
  // web uses localhost; Android emulator uses 10.0.2.2; iOS simulator can use localhost
  if (Platform.OS === 'android') return 'http://10.0.2.2:8000';
  return 'http://localhost:8000';
};

export const API_BASE_URL = getBaseUrl();

let authToken: string | null = null;
let ws: WebSocket | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export function connectPresenceWebSocket(username?: string) {
  try {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return ws;
    }
    const url = API_BASE_URL.replace('http', 'ws');
    ws = new WebSocket(`${url}`);
    ws.onopen = () => {
      if (username) {
        ws?.send(JSON.stringify({ type: 'introduce', username }));
      }
    };
    return ws;
  } catch (_e) {
    return null;
  }
}

export function getPresenceSocket(): WebSocket | null {
  return ws;
}


