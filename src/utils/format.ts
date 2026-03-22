export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(Math.max(value, min), max)
}

export function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatPercent(value: number): string {
  return `${value.toFixed(3)}%`
}

export function formatLargeNumber(value: number): string {
  return value.toLocaleString()
}

export function ordinal(num: number): string {
  const mod10 = num % 10
  const mod100 = num % 100

  if (mod10 === 1 && mod100 !== 11) return `${num}st`
  if (mod10 === 2 && mod100 !== 12) return `${num}nd`
  if (mod10 === 3 && mod100 !== 13) return `${num}rd`
  return `${num}th`
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}