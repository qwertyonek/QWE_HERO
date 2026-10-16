import { useSyncExternalStore } from 'react'

// Hash routing keeps GitHub Pages happy without a 404 fallback: #/ai, #/charts…
function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

const getRoute = () => window.location.hash.replace(/^#\/?/, '')

export function useRoute() {
  return useSyncExternalStore(subscribe, getRoute, () => '')
}

export function navigate(route: string) {
  window.location.hash = route ? `/${route}` : '/'
}
