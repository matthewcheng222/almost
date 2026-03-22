import { loadPreferences } from '../preferences/preferences'
import type { FunMetric, ProgressKey, UIRefs } from '../types'

export const state = {
  preferences: loadPreferences(),
  currentMetric: null as FunMetric | null,
  selectedMetricKey: 'day' as ProgressKey,
  refs: null as UIRefs | null,
  recentMetricIds: [] as string[],

  availableMetricIds: [] as string[],
  lastFocusThemeKey: '',
}