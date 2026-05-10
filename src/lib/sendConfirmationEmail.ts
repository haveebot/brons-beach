import { Resend } from "resend";

/**
 * Bron's reservation confirmation email.
 *
 * Sender domain (`RESEND_FROM`) must be verified in Resend dashboard before
 * production use. For staging, set RESEND_FROM to `onboarding@resend.dev`
 * — Resend's test sender that bypasses domain verification.
 *
 * If RESEND_API_KEY is not set, this is a no-op (logs + returns false).
 * Used by the post-checkout success page; production should also wire a
 * Stripe webhook handler so confirmations fire even if the customer closes
 * their browser before redirect.
 */

export interface ConfirmationItem {
  productLabel: string;
  pickupDate: string;
  returnDate: string;
  numDays: number;
  itemTotalCents: number;
}

export interface ConfirmationInput {
  customerName: string;
  customerEmail: string;
  items: ConfirmationItem[];
  accessPoint: string;
  totalCents: number;
  sessionId: string;
}

export async function sendConfirmationEmail(
  input: ConfirmationInput,
): Promise<{ sent: boolean; reason?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Confirmation email] RESEND_API_KEY not set — skipping (would have sent to %s)",
      input.customerEmail,
    );
    return { sent: false, reason: "RESEND_API_KEY not set" };
  }

  const from =
    process.env.RESEND_FROM || "Bron's <reservations@bronsbeach.com>";
  const resend = new Resend(apiKey);

  const totalDollars = (input.totalCents / 100).toFixed(2);
  const subjectItem =
    input.items.length === 1
      ? input.items[0].productLabel
      : `${input.items.length} items`;

  try {
    const result = await resend.emails.send({
      from,
      to: input.customerEmail,
      subject: `Your Bron's reservation is confirmed — ${subjectItem}`,
      html: confirmationHtml(input, totalDollars),
      text: confirmationText(input, totalDollars),
      headers: {
        "X-Entity-Ref-ID": input.sessionId,
      },
    });

    if (result.error) {
      console.error("[Confirmation email] Resend error:", result.error);
      return { sent: false, reason: result.error.message };
    }

    return { sent: true, id: result.data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Confirmation email] Send threw:", msg);
    return { sent: false, reason: msg };
  }
}

function formatDate(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function dateRangeOf(it: ConfirmationItem): string {
  return it.pickupDate === it.returnDate
    ? formatDate(it.pickupDate)
    : `${formatDate(it.pickupDate)} → ${formatDate(it.returnDate)}`;
}

function confirmationHtml(i: ConfirmationInput, totalDollars: string): string {
  const itemsHtml = i.items
    .map((it) => {
      const dateRange = dateRangeOf(it);
      const itemDollars = (it.itemTotalCents / 100).toFixed(2);
      return `<tr>
        <td style="padding:8px 0;border-top:1px solid rgba(26,58,82,0.1);">
          <p style="margin:0 0 2px;font-size:14px;font-weight:bold;color:#1a3a52;">${escape(it.productLabel)}</p>
          <p style="margin:0;font-size:12px;color:#1a3a52;opacity:0.7;">${escape(dateRange)} · ${it.numDays} day${it.numDays === 1 ? "" : "s"}</p>
        </td>
        <td style="padding:8px 0;border-top:1px solid rgba(26,58,82,0.1);text-align:right;font-size:14px;font-weight:bold;color:#1a3a52;white-space:nowrap;">$${itemDollars}</td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Your Bron's reservation</title>
</head>
<body style="margin:0;padding:0;background:#f5efe2;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#1a3a52;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5efe2;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(26,58,82,0.08);">
        <tr><td style="background:#1a3a52;padding:24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;color:#f5b35a;font-weight:bold;text-transform:uppercase;">Reservation confirmed</p>
          <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:bold;">Bron's</h1>
        </td></tr>
        <tr><td style="padding:32px 24px 8px;">
          <p style="margin:0 0 16px;font-size:18px;line-height:1.5;color:#1a3a52;">
            Hey ${escape(i.customerName.split(" ")[0])} — you&rsquo;re set up.
          </p>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#1a3a52;">
            We&rsquo;ll text you the morning of your rental with the exact setup time. Reply to that text any time — same number we&rsquo;ll text from.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe2;border-radius:12px;margin:0 0 24px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;color:#1a3a52;opacity:0.7;text-transform:uppercase;font-weight:bold;">Your reservation</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHtml}
                <tr>
                  <td style="padding:8px 0 0;border-top:2px solid rgba(26,58,82,0.15);font-size:12px;color:#1a3a52;opacity:0.7;">Where</td>
                  <td style="padding:8px 0 0;border-top:2px solid rgba(26,58,82,0.15);text-align:right;font-size:12px;font-weight:600;color:#1a3a52;">${escape(i.accessPoint)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;font-weight:bold;color:#1a3a52;">Total</td>
                  <td style="padding:6px 0;text-align:right;color:#e8654a;font-weight:bold;font-size:20px;white-space:nowrap;">$${totalDollars}</td>
                </tr>
              </table>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#1a3a52;opacity:0.7;text-transform:uppercase;font-weight:bold;">What happens next</p>
          <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.7;color:#1a3a52;">
            <li><strong>Morning of:</strong> crew texts your setup time window — usually within an hour of sunrise.</li>
            <li><strong>At your spot:</strong> they set everything up exactly where you asked. You don&rsquo;t need to be there.</li>
            <li><strong>End of day:</strong> crew swings back and breaks it down. You don&rsquo;t haul anything home.</li>
            <li><strong>Need to change something:</strong> text us. We&rsquo;re flexible — wind shifts, plans change.</li>
          </ul>
          <p style="margin:24px 0 8px;font-size:13px;color:#1a3a52;opacity:0.7;line-height:1.6;">
            Free cancellation up to 24 hours before your rental start time.
          </p>
        </td></tr>
        <tr><td style="background:#1a3a52;padding:20px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;color:#ffffff;font-weight:bold;">Bron&rsquo;s</p>
          <p style="margin:0 0 4px;font-size:11px;color:#ffffff;opacity:0.8;">314 E Avenue G · Port Aransas, TX 78373</p>
          <p style="margin:0;font-size:11px;color:#f5b35a;font-weight:bold;">(361) 290-7143</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationText(i: ConfirmationInput, totalDollars: string): string {
  const itemLines = i.items
    .map(
      (it) =>
        `  - ${it.productLabel} · ${dateRangeOf(it)} · ${it.numDays} day${it.numDays === 1 ? "" : "s"} · $${(it.itemTotalCents / 100).toFixed(2)}`,
    )
    .join("\n");

  return `Hey ${i.customerName.split(" ")[0]} — you're set up at Bron's.

YOUR RESERVATION
${itemLines}

Where: ${i.accessPoint}
Total: $${totalDollars}

WHAT HAPPENS NEXT
- Morning of: crew texts your setup time window — usually within an hour of sunrise.
- At your spot: they set everything up exactly where you asked. You don't need to be there.
- End of day: crew swings back and breaks it down. You don't haul anything home.
- Need to change something: text us. We're flexible — wind shifts, plans change.

Free cancellation up to 24 hours before your rental start time.

Bron's
314 E Avenue G · Port Aransas, TX 78373
(361) 290-7143
`;
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
