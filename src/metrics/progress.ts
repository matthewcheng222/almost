import type { ProgressItem } from '../types'
import { getCenturyStartYear, getDayOfYear, getDaysInMonth, isLeapYear } from '../utils/date'
import { clamp, ordinal, pad } from '../utils/format'

export function getTimeProgress(now: Date): ProgressItem[] {
  const year = now.getFullYear()
  const monthIndex = now.getMonth()
  const dayOfMonth = now.getDate()
  const dayOfYear = getDayOfYear(now)

  const daysInMonth = getDaysInMonth(year, monthIndex)
  const daysInYear = isLeapYear(year) ? 366 : 365

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const milliseconds = now.getMilliseconds()

  const secondProgress = (seconds + milliseconds / 1000) / 60
  const minuteProgress = (minutes + secondProgress) / 60

  const hourProgress = minuteProgress * 100
  const dayProgress = ((hours + minuteProgress) / 24) * 100
  const monthProgress =
    ((dayOfMonth - 1 + (hours + minuteProgress) / 24) / daysInMonth) * 100
  const yearProgress =
    ((dayOfYear - 1 + (hours + minuteProgress) / 24) / daysInYear) * 100

  const centuryStartYear = getCenturyStartYear(year)
  const centuryYear = year - centuryStartYear + 1
  const centuryProgress =
    ((year - centuryStartYear +
      (dayOfYear - 1 + (hours + minuteProgress) / 24) / daysInYear) /
      100) *
    100

  const monthName = now.toLocaleString(undefined, { month: 'long' })
  const weekdayName = now.toLocaleString(undefined, { weekday: 'long' })
  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  return [
    {
      key: 'hour',
      label: 'Hour',
      percent: clamp(hourProgress),
      detail: `${minutes}m ${seconds}s elapsed`,
      subdetail: `From ${pad(hours)}:00 to ${pad(hours)}:59`,
    },
    {
      key: 'day',
      label: 'Day',
      percent: clamp(dayProgress),
      detail: `${timeString} local time`,
      subdetail: `${weekdayName}, ${monthName} ${dayOfMonth}`,
    },
    {
      key: 'month',
      label: 'Month',
      percent: clamp(monthProgress),
      detail: `${monthName} ${dayOfMonth} of ${daysInMonth}`,
      subdetail: `${daysInMonth - dayOfMonth} full days after today`,
    },
    {
      key: 'year',
      label: 'Year',
      percent: clamp(yearProgress),
      detail: `Day ${dayOfYear} of ${daysInYear}`,
      subdetail: `${daysInYear - dayOfYear} days remaining after today`,
    },
    {
      key: 'century',
      label: 'Century',
      percent: clamp(centuryProgress),
      detail: `${centuryYear} year of the ${ordinal(Math.ceil(year / 100))} century`,
      subdetail: `${100 - centuryYear} years remaining after this one`,
    },
  ]
}