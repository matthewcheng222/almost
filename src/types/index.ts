export type ProgressKey = 'hour' | 'day' | 'month' | 'year' | 'century'

export type ProgressItem = {
  key: ProgressKey
  label: string
  percent: number
  detail: string
  subdetail: string
}

export type FunMetricCategory = 'playful' | 'seasonal' | 'milestone' | 'custom'

export type FunMetric =
  | {
      kind: 'countdown'
      id: string
      title: string
      detail: string
      value: string
      progressPercent: number
      personal?: boolean
      category?: FunMetricCategory
    }
  | {
      kind: 'since'
      id: string
      title: string
      detail: string
      value: string
      progressPercent: number
      personal?: boolean
      category?: FunMetricCategory
    }

export type Preferences = {
  birthDate: string
  personalMetricsEnabled: boolean
  pinnedMetricId: string | null
  sinceDate: string
  sinceLabel: string
}

export type UIRefs = {
  metricTitle: HTMLElement
  metricPercent: HTMLElement
  metricDetail: HTMLElement
  metricSubdetail: HTMLElement
  metricBar: HTMLElement
  metricPanel: HTMLElement
  metricGlow: HTMLElement
  metricButtons: Record<ProgressKey, HTMLButtonElement>

  funTitle: HTMLElement
  funValue: HTMLElement
  funDetail: HTMLElement
  funBar: HTMLElement
  funPercent: HTMLElement
  shuffleButton: HTMLButtonElement
  pinButton: HTMLButtonElement

  birthDateInput: HTMLInputElement
  personalToggle: HTMLInputElement
  sinceDateInput: HTMLInputElement
  sinceLabelInput: HTMLInputElement
}