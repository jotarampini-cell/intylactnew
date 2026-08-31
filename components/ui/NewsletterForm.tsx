"use client";

import { useId, useState } from "react";
import Icon from "@/components/ui/Icon";

/**
 * Newsletter capture.
 *
 * NOT WIRED UP YET. There is no mailing-list provider behind this, so on submit
 * it validates the address and shows a confirmation without sending anything
 * anywhere. Before launch, connect it to your provider (Mailchimp, Klaviyo,
 * Brevo…) in `onSubmit` — otherwise it collects intent it cannot honour.
 */
export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Deliberately permissive: the server is the real validator, and overly
    // strict client-side patterns reject valid addresses.
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint-300">
          <Icon name="check" size={17} strokeWidth={2.6} className="text-teal-900" />
        </span>
        <p className="text-sm text-white/90">
          ¡Listo! Te escribiremos pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Tu correo electrónico
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${id}-error` : undefined}
          className="min-h-12 flex-1 rounded-full border-2 border-white/20 bg-white/10 px-5 text-[15px] text-white placeholder:text-white/45 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-brand)] focus:border-mint-300 focus:outline-none"
        />
        <button
          type="submit"
          className="min-h-12 shrink-0 rounded-full bg-mint-300 px-7 font-heading text-[15px] font-semibold text-teal-900 transition-[transform,background-color] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-white"
        >
          Suscribirme
        </button>
      </div>

      {state === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-2.5 text-[13px] text-coral-200">
          Revisa tu correo, parece que falta algo.
        </p>
      )}
    </form>
  );
}
