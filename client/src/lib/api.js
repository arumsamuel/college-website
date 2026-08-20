// API helper for the College Website
const BASE = '/api';
const DEFAULT_TIMEOUT = 15000;

function withTimeout(timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout || DEFAULT_TIMEOUT);
  return { signal: controller.signal, cleanup: () => clearTimeout(timer) };
}

async function apiFetch(url, options = {}) {
  const { signal, cleanup } = withTimeout(options.timeout);
  const token = (() => {
    try {
      return localStorage.getItem('college-token');
    } catch {
      return null;
    }
  })();

  try {
    const response = await fetch(`${BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      },
      ...options,
      signal
    });
    cleanup();
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: response.statusText || 'Request failed' };
      }
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  } catch (err) {
    cleanup();
    if (err.name === 'AbortError') {
      throw new Error('The request timed out. Please try again.');
    }
    throw err;
  }
}

export const api = {
  get: url => apiFetch(url),
  post: (url, data) =>
    apiFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
  patch: (url, data) =>
    apiFetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
  chat: payload =>
    apiFetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
};

export default api;
