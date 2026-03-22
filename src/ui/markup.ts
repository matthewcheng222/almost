import { state } from '../state/store'
import type { FunMetric, ProgressItem, ProgressKey } from '../types'
import { getMetricTheme } from '../themes/metricThemes'
import { escapeHtml, formatPercent } from '../utils/format'

export function expandedMetricMarkup(item: ProgressItem): string {
  const keys: ProgressKey[] = ['hour', 'day', 'month', 'year', 'century']
  const theme = getMetricTheme(item)

  return `
    <section
      class="glass-panel time-focus-panel ${theme.panelClass} rounded-[1.9rem] p-5 md:p-7"
      data-metric-panel
    >
      <div data-metric-glow>${theme.glowMarkup}</div>

      <div class="relative z-10 mb-6 flex items-start justify-between gap-4">
        <div>
          <p class="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Current Focus
          </p>
          <h2
            class="mt-2 text-2xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-3xl"
            data-metric-title
          >
            ${escapeHtml(item.label)}
          </h2>
        </div>

        <div
          class="text-3xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-5xl"
          data-metric-percent
        >
          ${escapeHtml(formatPercent(item.percent))}
        </div>
      </div>

      <div class="relative z-10 progress-track h-3 rounded-full">
        <div
          class="progress-fill ${theme.accentClass} transition-[width] duration-500 ease-out"
          style="width:${item.percent}%"
          data-metric-bar
        ></div>
      </div>

      <div class="relative z-10 mt-5">
        <p
          class="text-base font-medium tracking-[-0.02em] text-zinc-700 md:text-lg"
          data-metric-detail
        >
          ${escapeHtml(item.detail)}
        </p>

        <p
          class="mt-1 text-sm leading-6 text-zinc-500 md:text-base"
          data-metric-subdetail
        >
          ${escapeHtml(item.subdetail)}
        </p>
      </div>

      <div class="relative z-10 mt-6 flex flex-wrap gap-2">
        ${keys
          .map(
            (key) => `
              <button
                type="button"
                data-metric-select="${key}"
                class="metric-pill rounded-full px-4 py-2 text-sm font-medium transition ${
                  key === item.key ? 'metric-pill-active' : 'text-zinc-600'
                }"
              >
                ${escapeHtml(key.charAt(0).toUpperCase() + key.slice(1))}
              </button>
            `,
          )
          .join('')}
      </div>
    </section>
  `
}

export function appMarkup(progressItems: ProgressItem[], funMetric: FunMetric | null): string {
  const selected =
    progressItems.find((item) => item.key === state.selectedMetricKey) ??
    progressItems.find((item) => item.key === 'day') ??
    progressItems[0]

  return `
    <main class="selection-soft relative min-h-screen overflow-hidden px-6 py-10 md:px-10 md:py-14">
      <div class="ambient-orb left-[-5rem] top-[4rem] h-52 w-52 bg-white/70"></div>
      <div class="ambient-orb right-[-3rem] top-[8rem] h-60 w-60 bg-zinc-200/60"></div>

      <div class="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section class="glass-shell w-full max-w-3xl rounded-[2.25rem] px-6 py-8 md:px-10 md:py-10">
          <header class="mx-auto mb-10 max-w-2xl text-center">
            <p class="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-zinc-400">
              Live Time Visualization
            </p>
            <h1 class="text-4xl font-semibold tracking-[-0.07em] text-zinc-950 md:text-6xl">
              Almost There
            </h1>
            <p class="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 md:text-base">
              Progress is happening. You’re closer than you think.
            </p>
          </header>

          <section class="grid gap-4">
            ${expandedMetricMarkup(selected)}

            <section class="glass-panel sidequest-panel sidequest-panel-static rounded-[1.9rem] p-5 md:p-6">
              <div class="relative z-10 mb-5 flex items-start justify-between gap-4">
                <div>
                  <p class="sidequest-kicker inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
                    <span class="sidequest-kicker-dot"></span>
                    Small Wins
                  </p>

                  <h2
                    class="mt-3 text-xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-2xl"
                    data-fun-title
                  >
                    ${escapeHtml(funMetric?.title ?? 'No metric selected')}
                  </h2>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    data-action="shuffle"
                    class="glass-button sidequest-button sidequest-action rounded-full px-4 py-2 text-sm font-medium text-zinc-700"
                  >
                    Shuffle
                  </button>
                  <button
                    type="button"
                    data-action="pin"
                    class="glass-button sidequest-button sidequest-action rounded-full px-4 py-2 text-sm font-medium text-zinc-700"
                  >
                    ${escapeHtml(state.preferences.pinnedMetricId === funMetric?.id ? 'Unpin' : 'Pin')}
                  </button>
                </div>
              </div>

              <div class="relative z-10 mb-4">
                <div
                  class="sidequest-value text-3xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-4xl"
                  data-fun-value
                >
                  ${escapeHtml(funMetric?.value ?? '—')}
                </div>

                <p class="mt-2 text-sm leading-6 text-zinc-700" data-fun-detail>
                  ${escapeHtml(funMetric?.detail ?? 'Choose a live metric')}
                </p>
              </div>

              <div class="relative z-10">
                <div class="progress-track sidequest-track h-3 rounded-full">
                  <div
                    class="progress-fill sidequest-fill transition-[width] duration-500 ease-out"
                    style="width:${funMetric?.progressPercent ?? 0}%"
                    data-fun-bar
                  ></div>
                </div>

                <div class="mt-2 flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.14em] text-zinc-600">
                  <span>Quest progress</span>
                  <span data-fun-percent>${escapeHtml(formatPercent(funMetric?.progressPercent ?? 0))}</span>
                </div>
              </div>

              <details class="sidequest-disclosure relative z-10 mt-5">
                <summary class="glass-button sidequest-button sidequest-summary rounded-full px-4 py-2 text-sm font-medium text-zinc-700">
                  <span class="sidequest-summary-open">Hide your dates</span>
                  <span class="sidequest-summary-closed">Add your dates</span>
                </summary>

                <div class="sidequest-settings mt-4 rounded-[1.4rem] border border-white/35 bg-white/20 p-4">
                  <div class="grid gap-3 md:grid-cols-2">
                    <div>
                      <label for="sinceLabel" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        “Since” label
                      </label>
                      <input
                        id="sinceLabel"
                        type="text"
                        value="${escapeHtml(state.preferences.sinceLabel)}"
                        placeholder="for example: graduation"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>

                    <div>
                      <label for="sinceDate" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Since date
                      </label>
                      <input
                        id="sinceDate"
                        type="date"
                        value="${escapeHtml(state.preferences.sinceDate)}"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>
                  </div>

                  <div class="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <label for="birthDate" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Birth date
                      </label>
                      <input
                        id="birthDate"
                        type="date"
                        value="${escapeHtml(state.preferences.birthDate)}"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>

                    <label class="flex items-center gap-3 rounded-2xl py-2 text-sm text-zinc-600">
                      <input
                        id="personalMetricsEnabled"
                        type="checkbox"
                        ${state.preferences.personalMetricsEnabled ? 'checked' : ''}
                        class="h-4 w-4 accent-zinc-900"
                      />
                      Enable personal metrics
                    </label>
                  </div>
                </div>
              </details>
            </section>
          </section>

          <footer class="mt-8 text-center">
            <p class="text-xs uppercase tracking-[0.12em] text-zinc-400">
              Updates every second
            </p>
            <div class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
              <span>Made with time and caffeine by</span>
              <span class="font-semibold text-zinc-800">Matthew Cheng</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  `
}