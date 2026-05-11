import Link from "next/link";
import SuccessEmailTrigger from "./SuccessClient";

export const dynamic = "force-dynamic";

/**
 * Bron's Beach Rentals — checkout success page.
 * Customer lands here after completing Stripe checkout.
 *
 * SuccessEmailTrigger fires the confirmation email server-side via API;
 * the trigger is mounted client-side so it runs on render, fire-and-forget.
 */
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || "";

  return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-center">
      {sessionId && <SuccessEmailTrigger sessionId={sessionId} />}
      <div className="text-6xl mb-6">🏖</div>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
        You&apos;re set up.
      </h1>
      <p className="text-lg text-bron-deep-blue/80 mb-2">
        Your reservation is confirmed. We just sent your confirmation by
        email.
      </p>
      <p className="text-sm text-bron-deep-blue/70 mb-10">
        Our crew will text you the morning of your rental with the exact
        setup time. If you need to reach us before then — text the same
        number we&apos;ll text from.
      </p>

      <div className="bg-white rounded-2xl border border-bron-blue/10 p-6 mb-8 text-left">
        <p className="text-xs uppercase tracking-widest text-bron-deep-blue/60 mb-2">
          What&apos;s next
        </p>
        <ul className="space-y-3 text-sm text-bron-deep-blue/85">
          <li>
            <strong>Morning of:</strong> Crew texts you the setup time
            window. Usually within an hour of sunrise.
          </li>
          <li>
            <strong>At your spot:</strong> They set everything up exactly
            where you asked. You don&apos;t need to be there for the
            setup — we know where to find you.
          </li>
          <li>
            <strong>End of day:</strong> Crew swings back and breaks it
            down. You don&apos;t haul anything home.
          </li>
          <li>
            <strong>Need to change something:</strong> Text us. We&apos;re
            flexible — wind shifts, plans change.
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full bg-bron-blue text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-deep-blue"
      >
        ← Back to Bron&apos;s
      </Link>
    </main>
  );
}
