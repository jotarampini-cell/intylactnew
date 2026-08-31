"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import {
  CYCLE_LIMITS,
  formatDate,
  formatRange,
  projectCycle,
  startOfDay,
  type CyclePhase,
} from "@/lib/cycle";

export default function CycleCalculator() {
  const dateId = useId();
  const cycleId = useId();
  const periodId = useId();

  const [date, setDate] = useState("");
  const [cycleLength, setCycleLength] = useState(String(CYCLE_LIMITS.defaultCycle));
  const [periodLength, setPeriodLength] = useState(String(CYCLE_LIMITS.defaultPeriod));
  const [result, setResult] = useState<CyclePhase | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!date) {
      setResult(null);
      setError("Selecciona la fecha en la que comenzó tu último periodo.");
      return;
    }

    // Parse as local midnight — `new Date("YYYY-MM-DD")` would parse as UTC and
    // can land on the previous day in negative-offset timezones like es-MX.
    const [y, m, d] = date.split("-").map(Number);
    const lastPeriodStart = new Date(y, m - 1, d);

    if (Number.isNaN(lastPeriodStart.getTime())) {
      setResult(null);
      setError("Esa fecha no es válida. Intenta de nuevo.");
      return;
    }

    if (lastPeriodStart > startOfDay(new Date())) {
      setResult(null);
      setError("La fecha no puede estar en el futuro.");
      return;
    }

    setError(null);
    setResult(
      projectCycle({
        lastPeriodStart,
        cycleLength: Number(cycleLength),
        periodLength: Number(periodLength),
      }),
    );
  }

  return (
    <SectionShell
      id="calculadora"
      background="bg-white"
      width="narrow"
      aria-labelledby="calc-titulo"
    >
      <div className="text-center">
        <h2 id="calc-titulo" className="font-heading text-[clamp(1.75rem,4vw,2.4rem)] font-semibold">
          Crea tu horario menstrual
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-teal-900/70 sm:text-base">
          Calcula tu próximo periodo y tu ventana fértil estimada. Es una guía de
          planeación, no un método anticonceptivo.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-[520px]">
        <div className="grid gap-5">
          <div>
            <label htmlFor={dateId} className="block font-heading text-sm font-medium">
              ¿Cuándo comenzó tu último periodo?
            </label>
            <input
              id={dateId}
              type="date"
              value={date}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              aria-describedby={error ? `${dateId}-error` : undefined}
              aria-invalid={Boolean(error)}
              className="mt-2 w-full rounded-2xl border-2 border-teal-900/15 bg-cream px-4 py-3 font-body text-base text-teal-900 transition-colors focus:border-teal-900"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={cycleId} className="block font-heading text-sm font-medium">
                Duración del ciclo (días)
              </label>
              <input
                id={cycleId}
                type="number"
                inputMode="numeric"
                min={CYCLE_LIMITS.minCycle}
                max={CYCLE_LIMITS.maxCycle}
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                className="mt-2 w-full rounded-2xl border-2 border-teal-900/15 bg-cream px-4 py-3 font-body text-base text-teal-900 transition-colors focus:border-teal-900"
              />
            </div>

            <div>
              <label htmlFor={periodId} className="block font-heading text-sm font-medium">
                Días de sangrado
              </label>
              <input
                id={periodId}
                type="number"
                inputMode="numeric"
                min={CYCLE_LIMITS.minPeriod}
                max={CYCLE_LIMITS.maxPeriod}
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                className="mt-2 w-full rounded-2xl border-2 border-teal-900/15 bg-cream px-4 py-3 font-body text-base text-teal-900 transition-colors focus:border-teal-900"
              />
            </div>
          </div>
        </div>

        {error && (
          <p
            id={`${dateId}-error`}
            role="alert"
            className="mt-4 rounded-2xl bg-coral-100 px-4 py-3 text-sm text-teal-900"
          >
            {error}
          </p>
        )}

        <div className="mt-7 text-center">
          <Button type="submit" size="lg">
            Continuar
          </Button>
        </div>
      </form>

      {/* Results are announced when they appear */}
      <div aria-live="polite">
        {result && (
          <div className="mx-auto mt-10 max-w-[520px] rounded-3xl bg-mint-100 p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold">Tu estimación</h3>

            <dl className="mt-5 grid gap-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-teal-900/10 pb-3">
                <dt className="text-sm text-teal-900/75">Próximo periodo</dt>
                <dd className="text-right font-heading text-sm font-semibold">
                  {formatRange(result.nextPeriodStart, result.nextPeriodEnd)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-teal-900/10 pb-3">
                <dt className="text-sm text-teal-900/75">Ovulación estimada</dt>
                <dd className="text-right font-heading text-sm font-semibold">
                  {formatDate(result.ovulation)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-teal-900/10 pb-3">
                <dt className="text-sm text-teal-900/75">Ventana fértil</dt>
                <dd className="text-right font-heading text-sm font-semibold">
                  {formatRange(result.fertileStart, result.fertileEnd)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-teal-900/75">Faltan</dt>
                <dd className="text-right font-heading text-sm font-semibold">
                  {result.daysUntilNextPeriod === 0
                    ? "Hoy"
                    : `${result.daysUntilNextPeriod} días`}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-teal-900/65">
              Estas fechas son estimaciones basadas en un ciclo regular. No
              sustituyen la orientación de un profesional de la salud ni funcionan
              como método anticonceptivo.
            </p>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
