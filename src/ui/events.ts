import { rebuildAvailableMetricIds } from '../metrics/funMetrics'
import { savePreferences } from '../preferences/preferences'
import { state } from '../state/store'
import type { ProgressKey } from '../types'
import { getTimeProgress } from '../metrics/progress'
import { refresh, rerenderApp, shuffleMetric, togglePin, updateSelectedMetricUI } from './render'

function handleBirthDateChange(value: string): void {
  state.preferences.birthDate = value

  if (!value) {
    state.preferences.personalMetricsEnabled = false
    state.preferences.pinnedMetricId = null

    if (state.currentMetric?.personal) {
      state.currentMetric = null
    }
  }

  savePreferences(state.preferences)
  rebuildAvailableMetricIds()
  rerenderApp()
  refresh()
}

function handlePersonalToggle(enabled: boolean): void {
  if (!state.preferences.birthDate && enabled) {
    if (state.refs) state.refs.personalToggle.checked = false
    return
  }

  state.preferences.personalMetricsEnabled = enabled
  state.preferences.pinnedMetricId = null

  savePreferences(state.preferences)
  rebuildAvailableMetricIds()
  rerenderApp()
  refresh()
}

function handleSinceDateChange(value: string): void {
  state.preferences.sinceDate = value

  if (!value) {
    state.preferences.pinnedMetricId = null

    if (state.currentMetric?.id.startsWith('since-')) {
      state.currentMetric = null
    }
  }

  if (state.refs) {
    state.refs.sinceLabelInput.disabled = !value
  }

  savePreferences(state.preferences)
  rebuildAvailableMetricIds()
  rerenderApp()
  refresh()
}

function handleSinceLabelChange(value: string): void {
  state.preferences.sinceLabel = value
  savePreferences(state.preferences)
  rebuildAvailableMetricIds()
  rerenderApp()
  refresh()
}

export function bindEvents(): void {
  if (!state.refs) return

  const keys: ProgressKey[] = ['hour', 'day', 'month', 'year', 'century']

  for (const key of keys) {
    state.refs.metricButtons[key]?.addEventListener('click', () => {
      state.selectedMetricKey = key
      updateSelectedMetricUI(getTimeProgress(new Date()))
    })
  }

  state.refs.shuffleButton.addEventListener('click', shuffleMetric)
  state.refs.pinButton.addEventListener('click', togglePin)

  state.refs.birthDateInput.addEventListener('change', (event) => {
    handleBirthDateChange((event.target as HTMLInputElement).value)
  })

  state.refs.personalToggle.addEventListener('change', (event) => {
    handlePersonalToggle((event.target as HTMLInputElement).checked)
  })

  state.refs.sinceDateInput.addEventListener('change', (event) => {
    handleSinceDateChange((event.target as HTMLInputElement).value)
  })

  state.refs.sinceLabelInput.addEventListener('input', (event) => {
    handleSinceLabelChange((event.target as HTMLInputElement).value)
  })

  state.refs.sinceLabelInput.disabled = !state.preferences.sinceDate
}