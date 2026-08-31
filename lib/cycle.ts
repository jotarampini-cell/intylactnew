/**
 * Menstrual cycle projection.
 *
 * Pure date arithmetic with no dependencies, kept apart from the UI so the maths
 * can be reasoned about (and tested) on its own.
 *
 * The model is the standard calendar estimate: ovulation is placed 14 days
 * before the *next* period, and the fertile window spans the five days before
 * ovulation plus the day itself (sperm survive ~5 days; the ovum ~24 hours).
 *
 * This is an estimate for planning, not contraception — cycles vary, and the
 * UI says so alongside the result.
 */

export type CycleInput = {
  /** First day of the most recent period */
  lastPeriodStart: Date;
  /** Days from the start of one period to the start of the next */
  cycleLength: number;
  /** Days of bleeding */
  periodLength: number;
};

export type CyclePhase = {
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
  /** Whole days from today until the next period; negative if overdue */
  daysUntilNextPeriod: number;
};

export const CYCLE_LIMITS = {
  minCycle: 21,
  maxCycle: 45,
  minPeriod: 1,
  maxPeriod: 10,
  defaultCycle: 28,
  defaultPeriod: 5,
} as const;

/** Midnight local time, so day maths is never skewed by a time component. */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Whole days between two dates. Computed from calendar values rather than
 * millisecond division so DST transitions can't produce an off-by-one.
 */
export function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86_400_000);
}

export function clampCycleLength(n: number): number {
  if (!Number.isFinite(n)) return CYCLE_LIMITS.defaultCycle;
  return Math.min(CYCLE_LIMITS.maxCycle, Math.max(CYCLE_LIMITS.minCycle, Math.round(n)));
}

export function clampPeriodLength(n: number): number {
  if (!Number.isFinite(n)) return CYCLE_LIMITS.defaultPeriod;
  return Math.min(CYCLE_LIMITS.maxPeriod, Math.max(CYCLE_LIMITS.minPeriod, Math.round(n)));
}

/**
 * Projects the next cycle. If the given start date is more than one cycle in the
 * past, it rolls forward so the result is always the *upcoming* period rather
 * than one that has already been and gone.
 */
export function projectCycle(
  input: CycleInput,
  today: Date = new Date(),
): CyclePhase {
  const cycleLength = clampCycleLength(input.cycleLength);
  const periodLength = clampPeriodLength(input.periodLength);
  const start = startOfDay(input.lastPeriodStart);
  const now = startOfDay(today);

  let nextPeriodStart = addDays(start, cycleLength);
  if (daysBetween(now, nextPeriodStart) < 0) {
    const elapsed = daysBetween(start, now);
    const cyclesPassed = Math.floor(elapsed / cycleLength) + 1;
    nextPeriodStart = addDays(start, cyclesPassed * cycleLength);
  }

  const ovulation = addDays(nextPeriodStart, -14);

  return {
    nextPeriodStart,
    nextPeriodEnd: addDays(nextPeriodStart, periodLength - 1),
    ovulation,
    fertileStart: addDays(ovulation, -5),
    fertileEnd: ovulation,
    daysUntilNextPeriod: daysBetween(now, nextPeriodStart),
  };
}

const formatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}

/** "15 – 20 de marzo" style range, collapsing a repeated month. */
export function formatRange(from: Date, to: Date): string {
  const short = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long" });
  return from.getMonth() === to.getMonth()
    ? `${from.getDate()} – ${short.format(to)}`
    : `${short.format(from)} – ${short.format(to)}`;
}
