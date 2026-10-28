"use client";

import { useActionState } from "react";
import { track } from "@vercel/analytics";

import { sendContactMessage } from "../../actions/contact";
import { budgets, projectTypes, type ContactField, type ContactState } from "../../data/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border border-line-strong bg-surface px-4 py-3.5 text-base text-ink placeholder:text-dim focus:border-accent-solid focus:ring-2 focus:ring-accent-solid/25 focus:outline-none aria-[invalid=true]:border-red-600";
const labelClass = "text-sm font-medium";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="text-sm text-red-700 dark:text-red-400">
      {error}
    </p>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (prev: ContactState, formData: FormData) => {
      const result = await sendContactMessage(prev, formData);
      if (result.status === "success") track("contact_form_submit");
      return { ...result, attempt: (prev.attempt ?? 0) + 1 };
    },
    initialState
  );

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-ok-line bg-ok-bg p-6 text-ok-ink sm:p-8">
        <p className="font-display text-3xl">Message sent.</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  const err = (f: ContactField) => state.errors?.[f];

  return (
    <form
      key={state.attempt ?? 0}
      action={formAction}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-5 sm:p-8"
    >
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className={labelClass}>Your name</label>
          <input
            id="cf-name"
            name="name"
            defaultValue={state.values?.name}
            autoComplete="name"
            required
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "cf-name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="cf-name-error" error={err("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className={labelClass}>Email</label>
          <input
            id="cf-email"
            name="email"
            defaultValue={state.values?.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "cf-email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="cf-email-error" error={err("email")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-type" className={labelClass}>What do you need?</label>
          <select
            id="cf-type"
            name="projectType"
            required
            defaultValue={state.values?.projectType ?? ""}
            aria-invalid={Boolean(err("projectType"))}
            aria-describedby={err("projectType") ? "cf-type-error" : undefined}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Choose one…</option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <FieldError id="cf-type-error" error={err("projectType")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-budget" className={labelClass}>
            Budget <span className="font-normal text-dim">(optional)</span>
          </label>
          <select id="cf-budget" name="budget" defaultValue={state.values?.budget ?? budgets[0]} className={`${inputClass} appearance-none`}>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className={labelClass}>Project details</label>
        <textarea
          id="cf-message"
          name="message"
          defaultValue={state.values?.message}
          rows={5}
          required
          placeholder="Your store, what you'd like built, timeline…"
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? "cf-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="cf-message-error" error={err("message")} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-muted">
          {state.status === "error" && state.message}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="flex h-[52px] shrink-0 items-center justify-center rounded-full bg-btn px-8 font-medium text-btn-ink transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
