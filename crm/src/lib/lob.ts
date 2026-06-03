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
}

const FRONT_HTML = `
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #0f172a; color: #fff; margin: 0; padding: 40px; width: 900px; height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
  .wrap { text-align: center; }
  .brand { font-size: 48px; font-weight: 900; color: #a78bfa; letter-spacing: -1px; margin-bottom: 16px; }
  .tagline { font-size: 22px; color: #cbd5e1; margin-bottom: 32px; line-height: 1.3; }
  .hook { font-size: 18px; color: #94a3b8; }
</style></head>
<body>
  <div class="wrap">
    <div class="brand">Makr</div>
    <div class="tagline">We built a free website<br>for your business.</div>
    <div class="hook">Scan the QR code on the back to see it.</div>
  </div>
</body>
</html>`;

function backHtml(contact: PostcardContact, trackingUrl: string): string {
  const name = contact.businessName ?? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() ?? "your business";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trackingUrl)}`;
  return `
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #fff; margin: 0; padding: 40px; width: 900px; height: 600px; box-sizing: border-box; display: flex; gap: 40px; align-items: center; }
  .left { flex: 1; }
  .business { font-size: 26px; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.2; }
  .msg { font-size: 16px; color: #334155; line-height: 1.5; margin-bottom: 20px; }
  .cta { font-size: 14px; color: #7c3aed; font-weight: 600; }
  .right { text-align: center; }
  .qr { width: 180px; height: 180px; border: 3px solid #e2e8f0; border-radius: 8px; }
  .scan { font-size: 12px; color: #94a3b8; margin-top: 8px; }
  .brand { font-size: 18px; font-weight: 800; color: #7c3aed; }
</style></head>
<body>
  <div class="left">
    <div class="business">${name}</div>
    <div class="msg">We built a professional website for your business — at no cost. Scan to see your new site and claim it free for 4 months.</div>
    <div class="cta">gomakr.ai</div>
  </div>
  <div class="right">
    <img class="qr" src="${qrUrl}" alt="QR code" />
    <div class="scan">Scan to see your website</div>
    <div class="brand">Makr</div>
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
    "from[name]": "Makr",
    "from[address_line1]": "123 Main St",
    "from[address_city]": "Boston",
    "from[address_state]": "MA",
    "from[address_zip]": "02101",
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
