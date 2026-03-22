import {
  chooseMetricId,
  getMetricById,
  rebuildAvailableMetricIds,
  rememberMetric,
} from '../metrics/funMetrics'
import { getTimeProgress } from '../metrics/progress'
import { savePreferences } from '../preferences/preferences'
import { state } from '../state/store'
import { getMetricTheme } from '../themes/metricThemes'
import type { FunMetric, ProgressItem, ProgressKey } from '../types'
import { formatPercent } from '../utils/format'
import { bindEvents } from './events'
import { appMarkup } from './markup'
import { collectRefs } from './refs'

const THEME_PANEL_CLASSES = [
  'time-theme-daybreak',
  'time-theme-morning',
  'time-theme-afternoon',
  'time-theme-dusk',
  'time-theme-night',
  'time-theme-spring',
  'time-theme-summer',
  'time-theme-autumn',
  'time-theme-winter',
  'time-theme-hour-night',
  'time-theme-hour-morning',
  'time-theme-hour-afternoon',
  'time-theme-hour-evening',
  'time-theme-month-winter',
  'time-theme-month-spring',
  'time-theme-month-summer',
  'time-theme-month-autumn',
  'time-theme-century',
]

const THEME_FILL_CLASSES = [
  'time-fill-daybreak',
  'time-fill-morning',
  'time-fill-afternoon',
  'time-fill-dusk',
  'time-fill-night',
  'time-fill-spring',
  'time-fill-summer',
  'time-fill-autumn',
  'time-fill-winter',
  'time-fill-hour-night',
  'time-fill-hour-morning',
  'time-fill-hour-afternoon',
  'time-fill-hour-evening',
  'time-fill-month-winter',
  'time-fill-month-spring',
  'time-fill-month-summer',
  'time-fill-month-autumn',
  'time-fill-century',
]

export function updateMetricButtons(activeKey: ProgressKey): void {
  if (!state.refs) return

  const keys: ProgressKey[] = ['hour', 'day', 'month', 'year', 'century']

  for (const key of keys) {
    const button = state.refs.metricButtons[key]
    if (!button) continue
    button.classList.toggle('metric-pill-active', key === activeKey)
    button.classList.toggle('text-zinc-600', key !== activeKey)
  }
}

export function updateSelectedMetricUI(items: ProgressItem[]): void {
  if (!state.refs) return

  const selected =
    items.find((item) => item.key === state.selectedMetricKey) ??
    items.find((item) => item.key === 'day') ??
    items[0]

  if (!selected) return

  const theme = getMetricTheme(selected)

  state.refs.metricTitle.textContent = selected.label
  state.refs.metricPercent.textContent = formatPercent(selected.percent)
  state.refs.metricDetail.textContent = selected.detail
  state.refs.metricSubdetail.textContent = selected.subdetail
  state.refs.metricBar.style.width = `${selected.percent}%`

  if (state.lastFocusThemeKey !== theme.themeKey) {
    state.refs.metricPanel.classList.remove(...THEME_PANEL_CLASSES)
    if (theme.panelClass) state.refs.metricPanel.classList.add(theme.panelClass)

    state.refs.metricBar.classList.remove(...THEME_FILL_CLASSES)
    if (theme.accentClass) state.refs.metricBar.classList.add(theme.accentClass)

    state.refs.metricGlow.innerHTML = theme.glowMarkup
    state.lastFocusThemeKey = theme.themeKey
  }

  updateMetricButtons(selected.key)
}

export function updateFunMetricUI(metric: FunMetric | null): void {
  if (!state.refs) return

  state.refs.funTitle.textContent = metric?.title ?? 'No metric selected'
  state.refs.funValue.textContent = metric?.value ?? '—'
  state.refs.funDetail.textContent = metric?.detail ?? 'Choose a live metric'
  state.refs.funBar.style.width = `${metric?.progressPercent ?? 0}%`
  state.refs.funPercent.textContent = formatPercent(metric?.progressPercent ?? 0)
  state.refs.pinButton.textContent =
    state.preferences.pinnedMetricId === metric?.id ? 'Unpin' : 'Pin'
}

function syncCurrentMetric(now: Date): void {
  if (state.preferences.pinnedMetricId) {
    state.currentMetric = getMetricById(state.preferences.pinnedMetricId, now)
    if (state.currentMetric) return
  }

  if (state.currentMetric) {
    state.currentMetric = getMetricById(state.currentMetric.id, now)
    if (state.currentMetric) return
  }

  const chosenId = chooseMetricId(null)
  state.currentMetric = chosenId ? getMetricById(chosenId, now) : null
}

export function refresh(): void {
  const now = new Date()
  const progressItems = getTimeProgress(now)
  updateSelectedMetricUI(progressItems)

  syncCurrentMetric(now)

  if (state.currentMetric) rememberMetric(state.currentMetric.id)
  updateFunMetricUI(state.currentMetric)
}

export function render(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  rebuildAvailableMetricIds()

  const now = new Date()
  const progressItems = getTimeProgress(now)

  const initialMetricId = chooseMetricId(null)
  state.currentMetric = initialMetricId ? getMetricById(initialMetricId, now) : null

  if (state.currentMetric) rememberMetric(state.currentMetric.id)

  app.innerHTML = appMarkup(progressItems, state.currentMetric)
  state.refs = collectRefs()
  state.lastFocusThemeKey = ''
  bindEvents()
}

export function rerenderApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  rebuildAvailableMetricIds()

  const now = new Date()
  const progressItems = getTimeProgress(now)

  syncCurrentMetric(now)

  app.innerHTML = appMarkup(progressItems, state.currentMetric)
  state.refs = collectRefs()
  state.lastFocusThemeKey = ''
  bindEvents()
  updateSelectedMetricUI(progressItems)
  updateFunMetricUI(state.currentMetric)
}

export function shuffleMetric(): void {
  state.preferences.pinnedMetricId = null
  savePreferences(state.preferences)

  rebuildAvailableMetricIds()

  const nextId = chooseMetricId(state.currentMetric?.id ?? null)
  state.currentMetric = nextId ? getMetricById(nextId, new Date()) : null

  if (state.currentMetric) rememberMetric(state.currentMetric.id)
  updateFunMetricUI(state.currentMetric)
}

export function togglePin(): void {
  if (!state.currentMetric) return

  state.preferences.pinnedMetricId =
    state.preferences.pinnedMetricId === state.currentMetric.id
      ? null
      : state.currentMetric.id

  savePreferences(state.preferences)
  updateFunMetricUI(state.currentMetric)
}

export function scheduleTick(): void {
  const delay = 1000 - (Date.now() % 1000)
  window.setTimeout(() => {
    refresh()
    scheduleTick()
  }, delay)
}