import type { Preferences } from '../types'

const STORAGE_KEY = 'time-progress-preferences'

export const defaultPreferences: Preferences = {
  birthDate: '',
  personalMetricsEnabled: false,
  pinnedMetricId: null,
  sinceDate: '',
  sinceLabel: '',
}

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultPreferences }

    const parsed = JSON.parse(raw) as Partial<Preferences>

    return {
      birthDate: typeof parsed.birthDate === 'string' ? parsed.birthDate : '',
      personalMetricsEnabled:
        typeof parsed.personalMetricsEnabled === 'boolean'
          ? parsed.personalMetricsEnabled
          : false,
      pinnedMetricId:
        typeof parsed.pinnedMetricId === 'string' ? parsed.pinnedMetricId : null,
      sinceDate: typeof parsed.sinceDate === 'string' ? parsed.sinceDate : '',
      sinceLabel: typeof parsed.sinceLabel === 'string' ? parsed.sinceLabel : '',
    }
  } catch {
    return { ...defaultPreferences }
  }
}

export function savePreferences(preferences: Preferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}