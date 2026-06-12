const API_KEY = process.env.LOB_API_KEY;
const BASE_URL = "https://api.lob.com/v1";

export interface PostcardContact {
  id: string;
  businessName: string | null;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  previewSlug: string | null;
  hasWebsite?: boolean;
}

const FRONT_HTML = `
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #14532d; color: #fff; margin: 0; padding: 40px; width: 900px; height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
  .wrap { text-align: center; }
  .brand { font-size: 48px; font-weight: 900; color: #86efac; letter-spacing: -1px; margin-bottom: 16px; }
  .tagline { font-size: 22px; color: #ffffff; margin-bottom: 16px; line-height: 1.3; }
  .sub { font-size: 15px; color: #bbf7d0; margin-bottom: 28px; }
  .pill { display: inline-block; background: #86efac; color: #14532d; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 999px; padding: 8px 20px; }
</style></head>
<body>
  <div class="wrap">
    <div class="brand">Makr.ai</div>
    <div class="tagline">We built a new website<br>for your business.</div>
    <div class="sub">No setup fee.&nbsp;&nbsp;No build charge.&nbsp;&nbsp;Built to help you grow.</div>
    <div class="pill">Included with any plan — you choose</div>
  </div>
</body>
</html>`;

function backHtml(contact: PostcardContact, trackingUrl: string): string {
  const name = contact.businessName ?? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() ?? "your business";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trackingUrl)}&color=14532d`;
  const msg = contact.hasWebsite
    ? `Hey — we built <strong>${name}</strong> a new SEO-optimized website. It's designed to rank higher on Google and drive more leads — at no cost to you. Scan to see it.`
    : `Hey — we built a professional website for <strong>${name}</strong> at no cost. Scan to see it, and claim it free for the first 4 months with any plan.`;
  return `
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #fff; margin: 0; padding: 40px; width: 900px; height: 600px; box-sizing: border-box; display: flex; gap: 40px; align-items: center; }
  .left { flex: 1; }
  .business { font-size: 26px; font-weight: 700; color: #111827; margin-bottom: 12px; line-height: 1.2; }
  .msg { font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 20px; }
  .cta { font-size: 14px; color: #15803d; font-weight: 700; }
  .right { text-align: center; }
  .qr { width: 180px; height: 180px; border: 2px solid #e5e7eb; border-radius: 8px; }
  .scan { font-size: 11px; color: #9ca3af; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
  .brand { font-size: 18px; font-weight: 900; color: #15803d; margin-top: 12px; }
</style></head>
<body>
  <div class="left">
    <div class="brand">Makr.ai</div>
    <div class="business" style="margin-top:12px">${name}</div>
    <div class="msg">${msg}</div>
    <div class="cta">gomakr.ai — You built your business. We make it grow.</div>
  </div>
  <div class="right">
    <img class="qr" src="${qrUrl}" alt="QR code" />
    <div class="scan">Scan to see your site</div>
  </div>
</body>
</html>`;
}

export async function sendPostcard(
  contact: PostcardContact,
  toAddress: { line1: string; city: string; state: string; zip: string },
  trackingUrl: string
): Promise<{ id: string }> {
  if (!API_KEY) throw new Error("LOB_API_KEY is not set");

  const body = new URLSearchParams({
    description: `Makr postcard — ${contact.businessName ?? contact.id}`,
    "to[name]": contact.businessName ?? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim(),
    "to[address_line1]": toAddress.line1,
    "to[address_city]": toAddress.city,
    "to[address_state]": toAddress.state,
    "to[address_zip]": toAddress.zip,
    "to[address_country]": "US",
    "from[name]": "Brennan Burks / Makr.ai",
    "from[address_line1]": "35 Cold Spring Rd",
    "from[address_city]": "Westford",
    "from[address_state]": "MA",
    "from[address_zip]": "01886",
    "from[address_country]": "US",
    front: FRONT_HTML,
    back: backHtml(contact, trackingUrl),
    size: "6x4",
  });

  const res = await fetch(`${BASE_URL}/postcards`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lob API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json() as { id: string };
  return { id: data.id };
}
