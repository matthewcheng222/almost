import { MS_DAY, MS_MINUTE } from '../constants/time'
import { state } from '../state/store'
import type { FunMetric, Preferences } from '../types'
import {
  approximateNextFullMoon,
  formatCountdownFromMs,
  getAgeInDays,
  getBillionSecondsDate,
  getDateAtAgeInDays,
  getHalfBirthday,
  getMetricProgress,
  getNextBirthday,
  getNextFridayNight,
  getNextNiceDayMilestone,
  getNextRoundAgeBirthday,
  getNextSeason,
  getProgressBetween,
  nextFriday13th,
  nextLeapYearMoment,
  nextMonthStart,
  nextNewYear,
  nextWeekStart,
  nextWeekendStart,
  parseDateOnly,
  startOfToday,
  startOfWeek,
} from '../utils/date'
import { clamp, formatLargeNumber, ordinal } from '../utils/format'

export function buildFunMetrics(now: Date, preferences: Preferences): FunMetric[] {
  const metrics: FunMetric[] = []
  const todayStart = startOfToday(now)

  const fridayNightTarget = getNextFridayNight(now)
  metrics.push({
    kind: 'countdown',
    id: 'friday-night',
    title: 'Until Friday night',
    detail: 'The unofficial weekly exhale starts at 18:00',
    value: formatCountdownFromMs(fridayNightTarget.getTime() - now.getTime()),
    progressPercent: getMetricProgress(fridayNightTarget, todayStart, now),
    category: 'playful',
  })

  const weekendTarget = nextWeekendStart(now)
  metrics.push({
    kind: 'countdown',
    id: 'weekend',
    title: 'Until the weekend',
    detail: 'Saturday begins at 00:00 in your local time',
    value: formatCountdownFromMs(weekendTarget.getTime() - now.getTime()),
    progressPercent: getMetricProgress(weekendTarget, todayStart, now),
    category: 'playful',
  })

  const nextWeek = nextWeekStart(now)
  metrics.push({
    kind: 'countdown',
    id: 'next-week',
    title: 'Until next week',
    detail: 'Monday starts a fresh weekly chapter',
    value: formatCountdownFromMs(nextWeek.getTime() - now.getTime()),
    progressPercent: getMetricProgress(nextWeek, startOfWeek(now), now),
    category: 'playful',
  })

  const nextMonth = nextMonthStart(now)
  metrics.push({
    kind: 'countdown',
    id: 'next-month',
    title: 'Until next month',
    detail: 'A fresh page on the calendar',
    value: formatCountdownFromMs(nextMonth.getTime() - now.getTime()),
    progressPercent: getMetricProgress(
      nextMonth,
      new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0),
      now,
    ),
    category: 'seasonal',
  })

  const season = getNextSeason(now)
  metrics.push({
    kind: 'countdown',
    id: 'next-season',
    title: `Until ${season.name}`,
    detail: 'A seasonal shift is on the way',
    value: formatCountdownFromMs(season.target.getTime() - now.getTime()),
    progressPercent: getMetricProgress(season.target, season.seasonStart, now),
    category: 'seasonal',
  })

  const fullMoonTarget = approximateNextFullMoon(now)
  metrics.push({
    kind: 'countdown',
    id: 'full-moon',
    title: 'Until the next full moon',
    detail: 'Approximate lunar timing for a little cosmic flavor',
    value: formatCountdownFromMs(fullMoonTarget.getTime() - now.getTime()),
    progressPercent: getMetricProgress(fullMoonTarget, todayStart, now),
    category: 'playful',
  })

  const newYearTarget = nextNewYear(now)
  metrics.push({
    kind: 'countdown',
    id: 'new-year',
    title: 'Until New Year',
    detail: 'A clean reset for the calendar',
    value: formatCountdownFromMs(newYearTarget.getTime() - now.getTime()),
    progressPercent: getMetricProgress(
      newYearTarget,
      new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0),
      now,
    ),
    category: 'seasonal',
  })

  const friday13Target = nextFriday13th(now)
  metrics.push({
    kind: 'countdown',
    id: 'friday-13th',
    title: 'Until Friday the 13th',
    detail: 'A classic little calendar oddity',
    value: formatCountdownFromMs(friday13Target.getTime() - now.getTime()),
    progressPercent: getMetricProgress(friday13Target, todayStart, now),
    category: 'playful',
  })

  const leapYearTarget = nextLeapYearMoment(now)
  metrics.push({
    kind: 'countdown',
    id: 'leap-year',
    title: 'Until the next leap year',
    detail: 'The next year with a February 29',
    value: formatCountdownFromMs(leapYearTarget.getTime() - now.getTime()),
    progressPercent: getMetricProgress(
      leapYearTarget,
      new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0),
      now,
    ),
    category: 'seasonal',
  })

  const sinceDate = parseDateOnly(preferences.sinceDate)
  if (
    preferences.sinceDate &&
    sinceDate &&
    !Number.isNaN(sinceDate.getTime()) &&
    sinceDate <= now
  ) {
    const label = preferences.sinceLabel.trim() || 'your date'
    const fullDays = getAgeInDays(sinceDate, now)
    const fullWeeks = Math.floor(fullDays / 7)

    const nextHundredDays = Math.ceil((fullDays + 1) / 100) * 100
    const previousHundredDays = Math.max(0, nextHundredDays - 100)
    const hundredDayTarget = new Date(
      startOfToday(sinceDate).getTime() + nextHundredDays * MS_DAY,
    )

    metrics.push({
      kind: 'since',
      id: 'since-custom-days',
      title: `Days since ${label}`,
      detail: `Since ${sinceDate.toLocaleDateString()}`,
      value: `${formatLargeNumber(fullDays)} days`,
      progressPercent: getProgressBetween(
        previousHundredDays,
        nextHundredDays,
        fullDays,
      ),
      category: 'custom',
    })

    metrics.push({
      kind: 'since',
      id: 'since-custom-weeks',
      title: `Weeks since ${label}`,
      detail: `${formatLargeNumber(fullDays)} days is ${formatLargeNumber(fullWeeks)} full weeks`,
      value: `${formatLargeNumber(fullWeeks)} weeks`,
      progressPercent: clamp((((fullDays % 7) + 1) / 7) * 100),
      category: 'custom',
    })

    metrics.push({
      kind: 'countdown',
      id: 'since-custom-100',
      title: `Until ${label} hits ${formatLargeNumber(nextHundredDays)} days`,
      detail: 'A nice round milestone',
      value: formatCountdownFromMs(hundredDayTarget.getTime() - now.getTime()),
      progressPercent: getProgressBetween(
        previousHundredDays,
        nextHundredDays,
        fullDays,
      ),
      category: 'milestone',
    })
  }

  const birthDate = parseDateOnly(preferences.birthDate)
  if (birthDate && preferences.personalMetricsEnabled) {
    const birthdayTarget = getNextBirthday(birthDate, now)
    metrics.push({
      kind: 'countdown',
      id: 'birthday',
      title: 'Until your next birthday',
      detail: 'Your next annual milestone',
      value: formatCountdownFromMs(birthdayTarget.getTime() - now.getTime()),
      personal: true,
      progressPercent: getMetricProgress(
        birthdayTarget,
        new Date(
          birthdayTarget.getFullYear() - 1,
          birthdayTarget.getMonth(),
          birthdayTarget.getDate(),
          0,
          0,
          0,
          0,
        ),
        now,
      ),
      category: 'milestone',
    })

    const halfBirthdayTarget = getHalfBirthday(birthDate, now)
    metrics.push({
      kind: 'countdown',
      id: 'half-birthday',
      title: 'Until your half-birthday',
      detail: 'A perfectly unnecessary but delightful milestone',
      value: formatCountdownFromMs(halfBirthdayTarget.getTime() - now.getTime()),
      personal: true,
      progressPercent: getMetricProgress(
        halfBirthdayTarget,
        new Date(
          halfBirthdayTarget.getFullYear(),
          halfBirthdayTarget.getMonth() - 6,
          halfBirthdayTarget.getDate(),
          0,
          0,
          0,
          0,
        ),
        now,
      ),
      category: 'playful',
    })

    const roundAge = getNextRoundAgeBirthday(birthDate, now)
    const currentAge = Math.max(
      0,
      now.getFullYear() -
        birthDate.getFullYear() -
        (now <
        new Date(
          now.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate(),
          0,
          0,
          0,
          0,
        )
          ? 1
          : 0),
    )
    const currentAgeDecadeStart = Math.floor(currentAge / 10) * 10

    metrics.push({
      kind: 'countdown',
      id: 'round-age',
      title: `Until your ${ordinal(roundAge.age)} birthday`,
      detail: 'A round-number age milestone',
      value: formatCountdownFromMs(roundAge.target.getTime() - now.getTime()),
      personal: true,
      progressPercent: getProgressBetween(
        currentAgeDecadeStart,
        roundAge.age,
        currentAge,
      ),
      category: 'milestone',
    })

    const ageInDays = getAgeInDays(birthDate, now)
    metrics.push({
      kind: 'since',
      id: 'alive-days',
      title: 'Days you have been alive',
      detail: `Since ${birthDate.toLocaleDateString()}`,
      value: `${formatLargeNumber(ageInDays)} days`,
      personal: true,
      progressPercent: clamp((((ageInDays % 100) + 1) / 100) * 100),
      category: 'milestone',
    })

    const nextDayMilestone = getNextNiceDayMilestone(ageInDays)
    const previousDayMilestone = Math.max(0, nextDayMilestone - 5_000)
    const dayMilestoneTarget = getDateAtAgeInDays(birthDate, nextDayMilestone)

    metrics.push({
      kind: 'countdown',
      id: `alive-days-${nextDayMilestone}`,
      title: `Until you are ${formatLargeNumber(nextDayMilestone)} days old`,
      detail: 'A fun round-number life milestone',
      value: formatCountdownFromMs(dayMilestoneTarget.getTime() - now.getTime()),
      personal: true,
      progressPercent: getProgressBetween(
        previousDayMilestone,
        nextDayMilestone,
        ageInDays,
      ),
      category: 'milestone',
    })

    const minutesAlive = Math.floor(
      (now.getTime() - birthDate.getTime()) / MS_MINUTE,
    )
    metrics.push({
      kind: 'since',
      id: 'alive-minutes',
      title: 'Minutes you have been alive',
      detail: 'A very committed counter',
      value: `${formatLargeNumber(minutesAlive)} minutes`,
      personal: true,
      progressPercent: clamp((((minutesAlive % 10_000) + 1) / 10_000) * 100),
      category: 'playful',
    })

    const approximateHeartbeats = Math.floor(
      ((now.getTime() - birthDate.getTime()) / MS_MINUTE) * 70,
    )
    metrics.push({
      kind: 'since',
      id: 'heartbeats',
      title: 'Approximate heartbeats so far',
      detail: 'Very rough estimate at 70 beats per minute',
      value: `${formatLargeNumber(approximateHeartbeats)} beats`,
      personal: true,
      progressPercent: clamp(
        (((approximateHeartbeats % 1_000_000) + 1) / 1_000_000) * 100,
      ),
      category: 'playful',
    })

    const billionSecondsTarget = getBillionSecondsDate(birthDate)
    if (billionSecondsTarget > now) {
      metrics.push({
        kind: 'countdown',
        id: 'billion-seconds',
        title: 'Until you are 1 billion seconds old',
        detail: 'A surprisingly satisfying milestone',
        value: formatCountdownFromMs(billionSecondsTarget.getTime() - now.getTime()),
        personal: true,
        progressPercent: getMetricProgress(billionSecondsTarget, birthDate, now),
        category: 'milestone',
      })
    }
  }

  return metrics
}

export function rebuildAvailableMetricIds(): void {
  const now = new Date()
  state.availableMetricIds = buildFunMetrics(now, state.preferences).map(
    (metric) => metric.id,
  )

  if (
    state.currentMetric &&
    !state.availableMetricIds.includes(state.currentMetric.id)
  ) {
    state.currentMetric = null
  }
}

export function getMetricById(id: string, now: Date): FunMetric | null {
  return buildFunMetrics(now, state.preferences).find((metric) => metric.id === id) ?? null
}

export function rememberMetric(id: string): void {
  state.recentMetricIds = [
    id,
    ...state.recentMetricIds.filter((item) => item !== id),
  ].slice(0, 4)
}

export function chooseMetricId(currentId?: string | null): string | null {
  const ids = state.availableMetricIds

  if (!ids.length) return null

  const pinnedId = state.preferences.pinnedMetricId
  if (pinnedId && ids.includes(pinnedId)) {
    return pinnedId
  }

  const filtered = ids.filter(
    (id) => id !== currentId && !state.recentMetricIds.includes(id),
  )

  const pool =
    filtered.length > 0 ? filtered : ids.filter((id) => id !== currentId)

  if (!pool.length) return ids[0]

  return pool[Math.floor(Math.random() * pool.length)]
}