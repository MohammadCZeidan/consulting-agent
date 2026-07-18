import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json();
  const capital = Number(body.capital ?? 3000000);
  const currency = body.currency ?? "USD";
  const subject = `Investment Opportunities Identified for Your ${currency} ${capital.toLocaleString()} Mandate`;
  const recipient = String(body.email ?? "");
  const consent = body.consent === true;
  const resendApiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL ?? "Opportunity Scout AI <reports@verified-domain.com>";

  if (!consent || !resendApiKey || !recipient) {
    return NextResponse.json({
      status: "preview_created",
      sender: "Demo sender: o12345@gmail.com - no real email sent.",
      subject,
      consentRequired: true,
      production: "Set RESEND_API_KEY, RESEND_FROM_EMAIL, provide a recipient email, and pass explicit consent before real email delivery."
    });
  }

  const resend = new Resend(resendApiKey);
  const result = await resend.emails.send({
    from: sender,
    to: recipient,
    subject,
    html: `
      <h1>Opportunity Scout AI preliminary report</h1>
      <p>This email contains an automated preliminary research summary based on public information, user inputs, and stated assumptions.</p>
      <h2>Executive summary</h2>
      <p>Your mandate was screened against demo-ready opportunity analysis workflows. Production deployments must attach the complete generated report and source citations.</p>
      <h2>Major warnings</h2>
      <ul>
        <li>This is not financial, legal, tax, valuation, or investment advice.</li>
        <li>Listings and financial claims may be incomplete or inaccurate.</li>
        <li>Every opportunity requires independent verification and professional due diligence before funds are committed.</li>
      </ul>
    `
  });

  return NextResponse.json({
    status: "sent",
    provider: "resend",
    messageId: result.data?.id,
    subject
  });
}
