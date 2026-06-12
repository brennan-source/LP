/**
 * Visual enhancement variant — compare against /demo/[slug]
 * Option A (split hero, CSS-only) and the icon-card services grid.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDemos, getDemoBySlug, resolveDemo, type DemoCompany } from "@/lib/demo-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const demos = await getAllDemos();
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getDemoBySlug(slug);
  if (!raw) return { title: "Demo Site" };
  const d = resolveDemo(raw);
  const serviceType = d.industry === "hvac" ? "HVAC" : "Plumbing & Septic";
  return {
    title: `${d.businessName} | ${serviceType} in ${d.city}, ${d.state}`,
    description: `${d.businessName} — professional ${serviceType.toLowerCase()} services in ${d.city}, ${d.state}.`,
  };
}

function getServiceIcon(name: string): string {
  const l = name.toLowerCase();
  if (l.includes("air condition") || (l.includes("ac") && !l.includes("place")) || l.includes("cooling")) return "❄️";
  if (l.includes("furnace")) return "🔥";
  if (l.includes("heat pump") || l.includes("mini-split") || l.includes("ductless")) return "🔄";
  if (l.includes("heat") || l.includes("warm")) return "♨️";
  if (l.includes("duct") || l.includes("airflow") || l.includes("ventil")) return "💨";
  if (l.includes("air quality") || l.includes("indoor")) return "🌿";
  if (l.includes("maintenance") || l.includes("tune") || l.includes("plan")) return "📋";
  if (l.includes("emergency")) return "🚨";
  if (l.includes("drain") || l.includes("clog")) return "🚿";
  if (l.includes("water heater") || l.includes("tankless")) return "🌡️";
  if (l.includes("leak") || l.includes("detect")) return "💧";
  if (l.includes("septic")) return "⚙️";
  if (l.includes("sewer")) return "🔩";
  if (l.includes("pipe") || l.includes("replac")) return "🔧";
  if (l.includes("fixture") || l.includes("faucet")) return "🚰";
  if (l.includes("water quality") || l.includes("filter")) return "🫧";
  if (l.includes("bathroom") || l.includes("kitchen")) return "🏠";
  return "✅";
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="text-yellow-400 text-xl" aria-label={`${rating} stars`}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

// Curated Unsplash photo IDs per industry/scene
const PHOTOS = {
  hvac: {
    hero: "photo-1621905251189-08b45d6a269e",      // HVAC technician working
    work1: "photo-1558618666-fcd25c85cd64",         // AC unit outdoor
    work2: "photo-1504328345606-18bbc8c9d7d1",      // furnace/heating
    work3: "photo-1621905252507-b35492cc74b4",      // HVAC duct work
    cta:   "photo-1504328345606-18bbc8c9d7d1",
  },
  plumbing: {
    hero: "photo-1585771724684-38269d6639fd",       // plumber working under sink
    work1: "photo-1558618047-3c8c76ca7d13",         // pipes / drain
    work2: "photo-1607400201515-c2c41c07d307",      // water heater
    work3: "photo-1581092918056-0c4c3acd3789",      // emergency repair
    cta:   "photo-1585771724684-38269d6639fd",
  },
};

function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export default async function EnhancedDemoPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getDemoBySlug(slug);
  if (!raw) notFound();
  const d = resolveDemo(raw);

  const isHvac = d.industry === "hvac";
  const photos = isHvac ? PHOTOS.hvac : PHOTOS.plumbing;
  const industryLabel = isHvac ? "HVAC" : "Plumbing & Septic";
  const industryIcon = isHvac ? "❄️" : "🔧";

  const accent = isHvac
    ? { bg: "bg-blue-700", bgHover: "hover:bg-blue-600", bgLight: "bg-blue-50", bgPanel: "bg-blue-800",
        border: "border-blue-200", text: "text-blue-700", hex: "#1d4ed8", panelGrad: "from-blue-900 to-blue-700" }
    : { bg: "bg-teal-700", bgHover: "hover:bg-teal-600", bgLight: "bg-teal-50", bgPanel: "bg-teal-800",
        border: "border-teal-200", text: "text-teal-700", hex: "#0f766e", panelGrad: "from-teal-900 to-teal-700" };

  return (
    <>
      {/* Makr banner */}
      <div className="sticky top-0 z-50 bg-amber-500 px-4 py-2.5 flex items-center justify-between gap-4">
        <p className="text-slate-900 text-sm font-medium truncate">
          {industryIcon} Free demo site from Makr.ai for {d.businessName} — included with any plan, no setup fee.
        </p>
        <Link
          href={`/contact?name=${encodeURIComponent(d.businessName)}`}
          className="shrink-0 bg-slate-900 text-amber-400 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-slate-800 transition whitespace-nowrap"
        >
          Claim it →
        </Link>
      </div>

      <div className="font-sans">
        {/* ── Nav ── */}
        <header className="bg-white shadow-sm sticky top-[44px] z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${accent.bg} rounded-lg flex items-center justify-center text-white font-black text-lg`}>
                {d.businessName[0]}
              </div>
              <span className="font-bold text-gray-900 text-lg">{d.businessName}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#services" className="hover:text-gray-900 transition">Services</a>
              <a href="#about" className="hover:text-gray-900 transition">About</a>
              <a href="#reviews" className="hover:text-gray-900 transition">Reviews</a>
              <a href={`tel:${d.phone}`} className={`px-4 py-2 ${accent.bg} ${accent.bgHover} text-white font-semibold rounded-lg transition`}>
                Call Now
              </a>
            </nav>
            <a href={`tel:${d.phone}`} className={`md:hidden px-3 py-2 ${accent.bg} text-white text-sm font-bold rounded-lg`}>
              Call Now
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {d.emergencyService && (
              <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                24/7 Emergency Service Available
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">{d.tagline}</h1>
            <p className="text-gray-300 text-xl mb-4 leading-relaxed max-w-2xl mx-auto">
              Licensed & insured {industryLabel.toLowerCase()} serving {d.city} and surrounding areas.
              {d.reviewCount > 0 && ` Trusted by ${d.reviewCount.toLocaleString()}+ local customers.`}
            </p>
            {d.rating > 0 && (
              <div className="flex items-center justify-center gap-2 mb-8">
                <Stars rating={d.rating} />
                <span className="text-yellow-400 font-bold text-xl">{d.rating.toFixed(1)}</span>
                <span className="text-gray-400">({d.reviewCount.toLocaleString()} Google reviews)</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${d.phone}`} className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${accent.bg} ${accent.bgHover} text-white font-bold text-lg rounded-xl transition shadow-lg`}>
                📞 {d.phone}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 transition">
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { icon: "🛡️", label: "Licensed & Insured", sub: "Fully certified & bonded" },
                { icon: "⭐", label: `${d.rating.toFixed(1)}/5 Rating`, sub: `${d.reviewCount.toLocaleString()}+ verified reviews` },
                { icon: "⚡", label: "24/7 Emergency", sub: "We answer every call" },
                { icon: "📍", label: "Local & Independent", sub: `Based in ${d.city}` },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services: icon cards ── */}
        <section id="services" className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className={`inline-block px-3 py-1 ${accent.bgLight} ${accent.text} text-xs font-bold rounded-full uppercase tracking-wider mb-3`}>
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{industryLabel} Services</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Professional, reliable service for residential and commercial customers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.services.map((service) => {
                const icon = getServiceIcon(service);
                return (
                  <div
                    key={service}
                    className={`bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-2xl p-5 flex items-center gap-4 transition group`}
                  >
                    <div className={`w-12 h-12 shrink-0 ${accent.bgLight} border ${accent.border} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {icon}
                    </div>
                    <p className="font-semibold text-gray-900 leading-tight">{service}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <a href={`tel:${d.phone}`} className={`inline-flex items-center gap-2 px-8 py-4 ${accent.bg} ${accent.bgHover} text-white font-bold rounded-xl transition shadow-md`}>
                Call for Pricing — {d.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── Photo-ready section (shows layout; swap src for real photos) ── */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className={`inline-block px-3 py-1 ${accent.bgLight} ${accent.text} text-xs font-bold rounded-full uppercase tracking-wider mb-3`}>
                Our Work
              </span>
              <h2 className="text-3xl font-black text-gray-900">See the Difference We Make</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {([
                { label: isHvac ? "AC Installation" : "Drain Cleaning", photo: photos.work1, desc: "Fast, clean, and done right" },
                { label: isHvac ? "Furnace Replacement" : "Water Heater Install", photo: photos.work2, desc: "Efficient, up-to-code installs" },
                { label: isHvac ? "Emergency Repair" : "Emergency Plumbing", photo: photos.work3, desc: "Here when you need us most" },
              ] as { label: string; photo: string; desc: string }[]).map((item) => (
                <div key={item.label} className="relative rounded-2xl overflow-hidden aspect-video flex items-end p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={unsplash(item.photo, 800)} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3 w-full">
                    <p className="text-white font-bold text-sm">{item.label}</p>
                    <p className="text-white/70 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block px-3 py-1 ${accent.bgLight} ${accent.text} text-xs font-bold rounded-full uppercase tracking-wider mb-4`}>
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">About {d.businessName}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {d.businessName} is a local {industryLabel.toLowerCase()} company serving {d.city}, {d.state}
                {d.serviceAreas.length > 0 ? ` and ${d.serviceAreas.slice(0, 3).join(", ")}` : ""}.
                {d.yearFounded ? ` In business since ${d.yearFounded}.` : ""}
                {" "}We're licensed, insured, and committed to doing the job right the first time.
              </p>
              <ul className="space-y-3">
                {["Licensed & fully insured", "Upfront pricing — no surprise bills",
                  "Available 24/7 for emergencies", "Locally owned and operated", "100% satisfaction guarantee"]
                  .map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <span className={`w-5 h-5 ${accent.bg} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>✓</span>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: d.rating.toFixed(1), label: "Google Rating", icon: "⭐" },
                { value: `${d.reviewCount}+`, label: "Happy Customers", icon: "😊" },
                { value: d.yearFounded ? `${new Date().getFullYear() - d.yearFounded}+` : "Local", label: d.yearFounded ? "Years in Business" : "Business", icon: "🏆" },
                { value: "24/7", label: "Emergency Service", icon: "⚡" },
              ].map((stat) => (
                <div key={stat.label} className={`bg-white border ${accent.border} rounded-2xl p-6 text-center shadow-sm`}>
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className={`text-3xl font-black ${accent.text} mb-1`}>{stat.value}</p>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section id="reviews" className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className={`inline-block px-3 py-1 ${accent.bgLight} ${accent.text} text-xs font-bold rounded-full uppercase tracking-wider mb-3`}>
                Customer Reviews
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">What Our Customers Say</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Stars rating={d.rating} />
                <span className="font-semibold text-gray-700 text-xl">{d.rating.toFixed(1)} out of 5</span>
                <span className="text-gray-400">({d.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>
            {d.reviewQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {d.reviewQuotes.slice(0, 3).map((review, i) => (
                  <div key={i} className={`border ${accent.border} rounded-2xl p-6 relative`}>
                    <div className={`absolute -top-3 left-6 text-5xl leading-none ${accent.text} opacity-30 font-serif`}>&ldquo;</div>
                    <div className="text-yellow-400 text-lg mb-3">{"★".repeat(review.rating)}</div>
                    <p className="text-gray-700 leading-relaxed mb-4 italic text-sm">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className={`w-9 h-9 ${accent.bg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {review.author[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                        <p className="text-gray-400 text-xs">Google Review</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <div className={`border ${accent.border} ${accent.bgLight} rounded-2xl px-12 py-10 text-center max-w-sm`}>
                  <p className="text-5xl mb-3">⭐</p>
                  <p className={`text-4xl font-black ${accent.text} mb-1`}>{d.rating.toFixed(1)}</p>
                  <p className="text-gray-500">Based on {d.reviewCount.toLocaleString()} verified Google reviews</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Service areas ── */}
        {d.serviceAreas.length > 0 && (
          <section className="bg-gray-50 py-14 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Service Area</h2>
              <p className="text-gray-500 mb-7">Proudly serving {d.city} and these surrounding communities:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[d.city, ...d.serviceAreas].map((area) => (
                  <span key={area} className={`px-4 py-2 ${area === d.city ? `${accent.bg} text-white` : `bg-white border ${accent.border} ${accent.text}`} rounded-full text-sm font-medium shadow-sm`}>
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section id="contact" className="relative overflow-hidden py-20 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={unsplash(photos.cta)} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Get Started Today</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready for a Free Estimate?</h2>
            <p className="text-white/70 text-lg mb-8">
              Call us now.{d.emergencyService ? " Emergency service available 24/7." : ""}
            </p>
            <a href={`tel:${d.phone}`} className="inline-flex items-center gap-3 bg-white text-gray-900 font-black text-2xl px-10 py-5 rounded-2xl hover:bg-gray-50 transition shadow-xl mb-5">
              📞 {d.phone}
            </a>
            {d.email && (
              <p className="text-white/60 text-sm">
                Email: <a href={`mailto:${d.email}`} className="text-white underline">{d.email}</a>
              </p>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-slate-950 text-slate-400 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 ${accent.bg} rounded-lg flex items-center justify-center text-white font-black text-sm`}>
                    {d.businessName[0]}
                  </div>
                  <p className="font-bold text-white">{d.businessName}</p>
                </div>
                <p className="text-sm">{d.address}</p>
                <p className="text-sm">{d.city}, {d.state} {d.zip}</p>
                <a href={`tel:${d.phone}`} className="text-sm mt-2 block hover:text-white transition">{d.phone}</a>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-3">Services</p>
                <ul className="space-y-1 text-sm">
                  {d.services.slice(0, 5).map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-3">Service Area</p>
                <p className="text-sm">{d.city}, {d.state} and surrounding areas</p>
                {d.serviceAreas.length > 0 && (
                  <p className="text-sm mt-1 text-slate-500">{d.serviceAreas.slice(0, 4).join(" • ")}</p>
                )}
                <div className="flex gap-3 mt-4">
                  {d.facebook && <a href={d.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white text-sm transition">Facebook</a>}
                  {d.instagram && <a href={d.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white text-sm transition">Instagram</a>}
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <p>© {new Date().getFullYear()} {d.businessName}. All rights reserved.</p>
              <p>
                Website by{" "}
                <Link href="https://gomakr.ai" className="text-amber-400 hover:text-amber-300 font-semibold transition">Makr.ai</Link>
                {" — "}
                <Link href="/contact" className="text-amber-400 hover:text-amber-300 underline transition">Get yours free →</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
