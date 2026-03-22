import { MS_DAY, MS_HOUR, MS_MINUTE, MS_SECOND } from '../constants/time'
import { clamp } from './format'

export function parseDateOnly(value: string): Date | null {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function startOfToday(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function startOfWeek(now: Date): Date {
  const day = now.getDay()
  const diff = (day + 6) % 7
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff)
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1)
  return Math.floor((date.getTime() - start.getTime()) / MS_DAY) + 1
}

export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getDate() === 29
}

export function getCenturyStartYear(year: number): number {
  return Math.floor((year - 1) / 100) * 100 + 1
}

export function formatCountdownFromMs(diff: number): string {
  if (diff <= 0) return 'Now'

  let remaining = diff

  const days = Math.floor(remaining / MS_DAY)
  remaining -= days * MS_DAY

  const hours = Math.floor(remaining / MS_HOUR)
  remaining -= hours * MS_HOUR

  const minutes = Math.floor(remaining / MS_MINUTE)
  remaining -= minutes * MS_MINUTE

  const seconds = Math.floor(remaining / MS_SECOND)

  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (days > 0 || hours > 0) parts.push(`${hours}h`)
  if (days > 0 || hours > 0 || minutes > 0) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)

  return parts.join(' ')
}

export function nextWeekendStart(now: Date): Date {
  const day = now.getDay()
  const daysUntilSaturday = day === 6 ? 7 : (6 - day + 7) % 7
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilSaturday,
    0,
    0,
    0,
    0,
  )
}

export function nextWeekStart(now: Date): Date {
  const start = startOfWeek(now)
  return new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 7,
    0,
    0,
    0,
    0,
  )
}

export function nextMonthStart(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
}

export function nextNewYear(now: Date): Date {
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0)
}

export function nextLeapYearMoment(now: Date): Date {
  let year = now.getFullYear() + 1
  while (!isLeapYear(year)) year += 1
  return new Date(year, 0, 1, 0, 0, 0, 0)
}

export function nextFriday13th(now: Date): Date {
  let year = now.getFullYear()
  let month = now.getMonth()

  for (let i = 0; i < 120; i += 1) {
    const candidate = new Date(year, month, 13, 0, 0, 0, 0)
    if (candidate > now && candidate.getDay() === 5) return candidate
    month += 1
    if (month > 11) {
      month = 0
      year += 1
    }
  }

  return new Date(now.getFullYear() + 1, 0, 13, 0, 0, 0, 0)
}

export function approximateNextFullMoon(now: Date): Date {
  const reference = new Date('2025-01-13T22:27:00Z').getTime()
  const cycle = 29.530588853 * MS_DAY
  const elapsed = now.getTime() - reference
  const cycles = Math.ceil(elapsed / cycle)
  return new Date(reference + cycles * cycle)
}

export function getNextBirthday(birthDate: Date, now: Date): Date {
  const month = birthDate.getMonth()
  const day = birthDate.getDate()
  let candidate = new Date(now.getFullYear(), month, day, 0, 0, 0, 0)

  if (candidate <= now) {
    candidate = new Date(now.getFullYear() + 1, month, day, 0, 0, 0, 0)
  }

  return candidate
}

export function getHalfBirthday(birthDate: Date, now: Date): Date {
  let candidate = new Date(
    now.getFullYear(),
    birthDate.getMonth() + 6,
    birthDate.getDate(),
    0,
    0,
    0,
    0,
  )

  if (candidate <= now) {
    candidate = new Date(
      now.getFullYear() + 1,
      birthDate.getMonth() + 6,
      birthDate.getDate(),
      0,
      0,
      0,
      0,
    )
  }

  return candidate
}

export function getNextRoundAgeBirthday(
  birthDate: Date,
  now: Date,
): { target: Date; age: number } {
  const birthdayThisYear = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
    0,
    0,
    0,
    0,
  )

  const ageNow =
    now.getFullYear() - birthDate.getFullYear() - (now < birthdayThisYear ? 1 : 0)

  const nextMilestone = Math.ceil((ageNow + 1) / 10) * 10

  return {
    age: nextMilestone,
    target: new Date(
      birthDate.getFullYear() + nextMilestone,
      birthDate.getMonth(),
      birthDate.getDate(),
      0,
      0,
      0,
      0,
    ),
  }
}

export function getBillionSecondsDate(birthDate: Date): Date {
  return new Date(birthDate.getTime() + 1_000_000_000_000)
}

export function getMetricProgress(target: Date, spanStart: Date, now: Date): number {
  const total = target.getTime() - spanStart.getTime()
  if (total <= 0) return 100
  return clamp(((now.getTime() - spanStart.getTime()) / total) * 100)
}

export function getAgeInDays(from: Date, to: Date): number {
  return Math.floor(
    (startOfToday(to).getTime() - startOfToday(from).getTime()) / MS_DAY,
  )
}

export function getDateAtAgeInDays(birthDate: Date, ageInDays: number): Date {
  return new Date(birthDate.getTime() + ageInDays * MS_DAY)
}

export function getProgressBetween(start: number, end: number, current: number): number {
  if (end <= start) return 100
  return clamp(((current - start) / (end - start)) * 100)
}

export function getNextNiceDayMilestone(ageInDays: number): number {
  const milestones = [1_000, 5_000, 10_000, 15_000, 20_000, 25_000, 30_000]
  const match = milestones.find((value) => value > ageInDays)
  if (match) return match
  return Math.ceil(ageInDays / 5_000) * 5_000
}

export function getNextSeason(now: Date): {
  name: string
  target: Date
  seasonStart: Date
} {
  const year = now.getFullYear()

  const spring = new Date(year, 2, 20, 0, 0, 0, 0)
  const summer = new Date(year, 5, 21, 0, 0, 0, 0)
  const autumn = new Date(year, 8, 22, 0, 0, 0, 0)
  const winter = new Date(year, 11, 21, 0, 0, 0, 0)

  if (now < spring) {
    return {
      name: 'spring',
      target: spring,
      seasonStart: new Date(year - 1, 11, 21, 0, 0, 0, 0),
    }
  }

  if (now < summer) {
    return {
      name: 'summer',
      target: summer,
      seasonStart: spring,
    }
  }

  if (now < autumn) {
    return {
      name: 'autumn',
      target: autumn,
      seasonStart: summer,
    }
  }

  if (now < winter) {
    return {
      name: 'winter',
      target: winter,
      seasonStart: autumn,
    }
  }

  return {
    name: 'spring',
    target: new Date(year + 1, 2, 20, 0, 0, 0, 0),
    seasonStart: winter,
  }
}

export function getNextFridayNight(now: Date): Date {
  const result = new Date(now)
  const day = result.getDay()

  let daysUntilFriday: number
  if (day === 5 && result.getHours() < 18) {
    daysUntilFriday = 0
  } else {
    const raw = (5 - day + 7) % 7
    daysUntilFriday = raw === 0 ? 7 : raw
  }

  result.setDate(result.getDate() + daysUntilFriday)
  result.setHours(18, 0, 0, 0)

  return result
}