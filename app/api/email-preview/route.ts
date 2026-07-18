import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    status: "preview_created",
    sender: "Demo sender: o12345@gmail.com - no real email sent.",
    subject: `Investment Opportunities Identified for Your ${body.currency ?? "USD"} ${Number(body.capital ?? 3000000).toLocaleString()} Mandate`,
    consentRequired: true,
    production: "Configure RESEND_API_KEY and an authenticated reports@verified-domain.com sender before real email delivery."
  });
}
