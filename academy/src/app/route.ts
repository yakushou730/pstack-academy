import { useSyncExternalStore } from 'react';

export function parseRoute(hash: string) {
  const [path = '/intro', query = ''] = (hash.replace(/^#/, '') || '/intro').split('?');
  const parts = path.split('/').filter(Boolean);
  return { section: parts[0] || 'intro', id: parts[1], path, params: new URLSearchParams(query), validShape: parts.length <= 2 };
}
function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}
export function useRoute() {
  return parseRoute(useSyncExternalStore(subscribe, () => window.location.hash, () => '#/intro'));
}
export function changeParams(updates: Record<string, string>) {
  const route = parseRoute(window.location.hash);
  for (const [key, value] of Object.entries(updates)) {
    if (value) route.params.set(key, value);
    else route.params.delete(key);
  }
  window.location.hash = `${route.path}${route.params.size ? `?${route.params}` : ''}`;
}
