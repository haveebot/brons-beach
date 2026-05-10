"use client";

import { useEffect, useRef } from "react";

/**
 * Fire-and-forget client trigger for the post-checkout confirmation email.
 *
 * The success page is the first thing the customer sees after Stripe redirects
 * them back. We POST the session_id to the email API so the server can pull
 * the session, render + send the confirmation. Idempotent on the server side.
 *
 * If RESEND_API_KEY isn't set on the deploy, the API returns sent:false with
 * a reason — silently ignored here so the success page never shows an error.
 * (Production should also have a Stripe webhook so this isn't the only path.)
 */
export default function SuccessEmailTrigger({
  sessionId,
}: {
  sessionId: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (!sessionId || fired.current) return;
    fired.current = true;
    void fetch("/api/email/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      // Swallow — confirmation page render isn't gated on the email
    });
  }, [sessionId]);

  return null;
}
