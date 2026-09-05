'use client'

import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

function getServerSnapshot() {
  return false
}

/** true quando a página rolou mais que `threshold` px. */
export function useScrolled(threshold: number): boolean {
  return useSyncExternalStore(subscribe, () => window.scrollY > threshold, getServerSnapshot)
}
