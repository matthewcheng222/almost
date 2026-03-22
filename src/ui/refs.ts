import type { ProgressKey, UIRefs } from '../types'

export function collectRefs(): UIRefs {
  const keys: ProgressKey[] = ['hour', 'day', 'month', 'year', 'century']
  const metricButtons = {} as Record<ProgressKey, HTMLButtonElement>

  for (const key of keys) {
    metricButtons[key] = document.querySelector(
      `[data-metric-select="${key}"]`,
    ) as HTMLButtonElement
  }

  return {
    metricTitle: document.querySelector('[data-metric-title]') as HTMLElement,
    metricPercent: document.querySelector('[data-metric-percent]') as HTMLElement,
    metricDetail: document.querySelector('[data-metric-detail]') as HTMLElement,
    metricSubdetail: document.querySelector('[data-metric-subdetail]') as HTMLElement,
    metricBar: document.querySelector('[data-metric-bar]') as HTMLElement,
    metricPanel: document.querySelector('[data-metric-panel]') as HTMLElement,
    metricGlow: document.querySelector('[data-metric-glow]') as HTMLElement,
    metricButtons,

    funTitle: document.querySelector('[data-fun-title]') as HTMLElement,
    funValue: document.querySelector('[data-fun-value]') as HTMLElement,
    funDetail: document.querySelector('[data-fun-detail]') as HTMLElement,
    funBar: document.querySelector('[data-fun-bar]') as HTMLElement,
    funPercent: document.querySelector('[data-fun-percent]') as HTMLElement,
    shuffleButton: document.querySelector(
      '[data-action="shuffle"]',
    ) as HTMLButtonElement,
    pinButton: document.querySelector('[data-action="pin"]') as HTMLButtonElement,

    birthDateInput: document.querySelector('#birthDate') as HTMLInputElement,
    personalToggle: document.querySelector(
      '#personalMetricsEnabled',
    ) as HTMLInputElement,
    sinceDateInput: document.querySelector('#sinceDate') as HTMLInputElement,
    sinceLabelInput: document.querySelector('#sinceLabel') as HTMLInputElement,
  }
}