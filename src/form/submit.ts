import type { FormState } from './model';

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; reason: 'network' | 'server' };

/**
 * Sends the request to the endpoint in VITE_FORM_ENDPOINT (your API, Formspree,
 * Netlify Forms, a serverless function…). That endpoint is responsible for:
 *  - the notification email to HillyBilly
 *  - the confirmation email to the customer
 *  - server-side spam checks and consent-aware retention (see README)
 * Without an endpoint the form runs in demo mode and nothing is sent.
 */
export async function submitRequest(form: FormState, lang: string): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  const { website, ...data } = form;
  if (website) return { ok: true, demo: false }; // honeypot hit: pretend success, send nothing

  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true };
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, lang, submittedAt: new Date().toISOString() }),
    });
    return res.ok ? { ok: true, demo: false } : { ok: false, reason: 'server' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
