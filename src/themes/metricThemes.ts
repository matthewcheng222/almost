import type { ProgressItem } from '../types'

type MetricTheme = {
  themeKey: string
  panelClass: string
  accentClass: string
  glowMarkup: string
}

export function getDayTheme(now: Date): MetricTheme {
  const hour = now.getHours() + now.getMinutes() / 60

  if (hour >= 5 && hour < 8) {
    return {
      themeKey: 'daybreak',
      panelClass: 'time-theme-daybreak',
      accentClass: 'time-fill-daybreak',
      glowMarkup: `
        <div class="time-theme-orb sun-orb daybreak-sun"></div>
        <div class="time-theme-orb haze-orb daybreak-haze"></div>
      `,
    }
  }

  if (hour >= 8 && hour < 12) {
    return {
      themeKey: 'morning',
      panelClass: 'time-theme-morning',
      accentClass: 'time-fill-morning',
      glowMarkup: `
        <div class="time-theme-orb sun-orb morning-sun"></div>
        <div class="time-theme-orb haze-orb morning-haze"></div>
      `,
    }
  }

  if (hour >= 12 && hour < 17) {
    return {
      themeKey: 'afternoon',
      panelClass: 'time-theme-afternoon',
      accentClass: 'time-fill-afternoon',
      glowMarkup: `
        <div class="time-theme-orb sun-orb afternoon-sun"></div>
        <div class="time-theme-orb haze-orb afternoon-haze"></div>
      `,
    }
  }

  if (hour >= 17 && hour < 21) {
    return {
      themeKey: 'dusk',
      panelClass: 'time-theme-dusk',
      accentClass: 'time-fill-dusk',
      glowMarkup: `
        <div class="time-theme-orb sun-orb dusk-sun"></div>
        <div class="time-theme-orb haze-orb dusk-haze"></div>
      `,
    }
  }

  return {
    themeKey: 'night',
    panelClass: 'time-theme-night',
    accentClass: 'time-fill-night',
    glowMarkup: `
      <div class="time-theme-orb moon-orb night-moon"></div>
      <div class="time-theme-orb haze-orb night-haze"></div>
    `,
  }
}

export function getYearTheme(now: Date): MetricTheme {
  const month = now.getMonth()

  if (month >= 2 && month <= 4) {
    return {
      themeKey: 'spring',
      panelClass: 'time-theme-spring',
      accentClass: 'time-fill-spring',
      glowMarkup: `
        <div class="time-theme-orb season-orb spring-bloom"></div>
        <div class="time-theme-orb season-orb spring-mist"></div>
      `,
    }
  }

  if (month >= 5 && month <= 7) {
    return {
      themeKey: 'summer',
      panelClass: 'time-theme-summer',
      accentClass: 'time-fill-summer',
      glowMarkup: `
        <div class="time-theme-orb season-orb summer-glow"></div>
        <div class="time-theme-orb season-orb summer-air"></div>
      `,
    }
  }

  if (month >= 8 && month <= 10) {
    return {
      themeKey: 'autumn',
      panelClass: 'time-theme-autumn',
      accentClass: 'time-fill-autumn',
      glowMarkup: `
        <div class="time-theme-orb season-orb autumn-glow"></div>
        <div class="time-theme-orb season-orb autumn-smoke"></div>
      `,
    }
  }

  return {
    themeKey: 'winter',
    panelClass: 'time-theme-winter',
    accentClass: 'time-fill-winter',
    glowMarkup: `
      <div class="time-theme-orb season-orb winter-glow"></div>
      <div class="time-theme-orb season-orb winter-mist"></div>
    `,
  }
}

export function getHourTheme(now: Date): MetricTheme {
  const hour = now.getHours()

  if (hour < 6) {
    return {
      themeKey: 'hour-night',
      panelClass: 'time-theme-hour-night',
      accentClass: 'time-fill-hour-night',
      glowMarkup: `
        <div class="time-theme-orb moon-orb hour-night-moon"></div>
        <div class="time-theme-orb haze-orb hour-night-haze"></div>
      `,
    }
  }

  if (hour < 12) {
    return {
      themeKey: 'hour-morning',
      panelClass: 'time-theme-hour-morning',
      accentClass: 'time-fill-hour-morning',
      glowMarkup: `
        <div class="time-theme-orb sun-orb hour-morning-sun"></div>
        <div class="time-theme-orb haze-orb hour-morning-haze"></div>
      `,
    }
  }

  if (hour < 18) {
    return {
      themeKey: 'hour-afternoon',
      panelClass: 'time-theme-hour-afternoon',
      accentClass: 'time-fill-hour-afternoon',
      glowMarkup: `
        <div class="time-theme-orb sun-orb hour-afternoon-sun"></div>
        <div class="time-theme-orb haze-orb hour-afternoon-haze"></div>
      `,
    }
  }

  return {
    themeKey: 'hour-evening',
    panelClass: 'time-theme-hour-evening',
    accentClass: 'time-fill-hour-evening',
    glowMarkup: `
      <div class="time-theme-orb sun-orb hour-evening-sun"></div>
      <div class="time-theme-orb haze-orb hour-evening-haze"></div>
    `,
  }
}

export function getMonthTheme(now: Date): MetricTheme {
  const month = now.getMonth()

  if (month <= 1 || month === 11) {
    return {
      themeKey: 'month-winter',
      panelClass: 'time-theme-month-winter',
      accentClass: 'time-fill-month-winter',
      glowMarkup: `
        <div class="time-theme-orb season-orb month-winter-glow"></div>
        <div class="time-theme-orb haze-orb month-winter-haze"></div>
      `,
    }
  }

  if (month >= 2 && month <= 4) {
    return {
      themeKey: 'month-spring',
      panelClass: 'time-theme-month-spring',
      accentClass: 'time-fill-month-spring',
      glowMarkup: `
        <div class="time-theme-orb season-orb month-spring-glow"></div>
        <div class="time-theme-orb haze-orb month-spring-haze"></div>
      `,
    }
  }

  if (month >= 5 && month <= 7) {
    return {
      themeKey: 'month-summer',
      panelClass: 'time-theme-month-summer',
      accentClass: 'time-fill-month-summer',
      glowMarkup: `
        <div class="time-theme-orb season-orb month-summer-glow"></div>
        <div class="time-theme-orb haze-orb month-summer-haze"></div>
      `,
    }
  }

  return {
    themeKey: 'month-autumn',
    panelClass: 'time-theme-month-autumn',
    accentClass: 'time-fill-month-autumn',
    glowMarkup: `
      <div class="time-theme-orb season-orb month-autumn-glow"></div>
      <div class="time-theme-orb haze-orb month-autumn-haze"></div>
    `,
  }
}

export function getCenturyTheme(): MetricTheme {
  return {
    themeKey: 'century',
    panelClass: 'time-theme-century',
    accentClass: 'time-fill-century',
    glowMarkup: `
      <div class="time-theme-orb season-orb century-glow"></div>
      <div class="time-theme-orb haze-orb century-haze"></div>
    `,
  }
}

export function getMetricTheme(item: ProgressItem): MetricTheme {
  const now = new Date()

  switch (item.key) {
    case 'hour':
      return getHourTheme(now)
    case 'day':
      return getDayTheme(now)
    case 'month':
      return getMonthTheme(now)
    case 'year':
      return getYearTheme(now)
    case 'century':
      return getCenturyTheme()
    default:
      return {
        themeKey: 'default',
        panelClass: '',
        accentClass: '',
        glowMarkup: '',
      }
  }
}