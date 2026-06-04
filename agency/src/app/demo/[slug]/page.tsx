import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDemos, getDemoBySlug, resolveDemo, type DemoCompany } from "@/lib/demo-data";

interface Props {
  params: Promise<{ slug: string }>;
}

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
    title: `${d.businessName} | ${serviceType} Services in ${d.city}, ${d.state}`,
    description: `${d.businessName} provides professional ${serviceType.toLowerCase()} services in ${d.city}, ${d.state}. Call ${d.phone} — licensed, insured, ${d.emergencyService ? "emergency service available. " : ""}Serving ${d.serviceAreas.slice(0, 4).join(", ")} and surrounding areas.`,
    openGraph: {
      title: `${d.businessName} | ${serviceType} in ${d.city}, ${d.state}`,
      description: `Rated ${d.rating}/5 by ${d.reviewCount}+ customers. Professional ${serviceType.toLowerCase()} services in ${d.city} and surrounding areas.`,
      type: "website",
    },
  };
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const cls = size === "lg" ? "text-2xl" : "text-base";
  return (
    <span className={cls} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function LocalBusinessSchema({ d }: { d: DemoCompany }) {
  const serviceType = d.industry === "hvac" ? "HVACBusiness" : "Plumber";
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", serviceType],
    name: d.businessName,
    telephone: d.phone,
    email: d.email ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.address,
      addressLocality: d.city,
      addressRegion: d.state,
      postalCode: d.zip,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: d.rating.toFixed(1),
      reviewCount: d.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: d.emergencyService
      ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }]
      : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: d.industry === "hvac" ? "HVAC Services" : "Plumbing & Septic Services",
      itemListElement: d.services.map((s, i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
        position: i + 1,
      })),
    },
    areaServed: d.serviceAreas.map((area) => ({ "@type": "City", name: area })),
    ...(d.yearFounded ? { foundingDate: String(d.yearFounded) } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getDemoBySlug(slug);
  if (!raw) notFound();
  const d = resolveDemo(raw);

  const accentColor = d.industry === "hvac" ? "blue" : "teal";
  const accent = {
    bg: accentColor === "blue" ? "bg-blue-700" : "bg-teal-700",
    bgHover: accentColor === "blue" ? "hover:bg-blue-600" : "hover:bg-teal-600",
    bgLight: accentColor === "blue" ? "bg-blue-50" : "bg-teal-50",
    border: accentColor === "blue" ? "border-blue-200" : "border-teal-200",
    text: accentColor === "blue" ? "text-blue-700" : "text-teal-700",
    textLight: accentColor === "blue" ? "text-blue-600" : "text-teal-600",
    ring: accentColor === "blue" ? "ring-blue-600" : "ring-teal-600",
  };

  const industryLabel = d.industry === "hvac" ? "HVAC" : "Plumbing & Septic";
  const industryIcon = d.industry === "hvac" ? "❄️" : "🔧";

  return (
    <>
      <LocalBusinessSchema d={d} />

      {/* Makr sticky banner */}
      <div className="sticky top-0 z-50 bg-amber-500 px-4 py-2.5 flex items-center justify-between gap-4">
        <p className="text-slate-900 text-sm font-medium truncate">
          {industryIcon} This is a free demo site Makr built for {d.businessName} — no setup fee, included with any plan.
        </p>
        <Link
          href={`/contact?name=${encodeURIComponent(d.businessName)}`}
          className="shrink-0 bg-slate-900 text-amber-400 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-slate-800 transition whitespace-nowrap"
        >
          Claim it →
        </Link>
      </div>

      {/* Business site */}
      <div className="font-sans">

        {/* Business nav */}
        <header className="bg-white shadow-sm sticky top-[44px] z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${accent.bg} rounded-lg flex items-center justify-center text-white font-black text-lg`}>
                {d.businessName[0]}
              </div>
              <span className="font-bold text-gray-900 text-lg leading-tight">
                {d.businessName}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#services" className="hover:text-gray-900 transition">Services</a>
              <a href="#about" className="hover:text-gray-900 transition">About</a>
              <a href="#reviews" className="hover:text-gray-900 transition">Reviews</a>
              <a href="#contact" className={`px-4 py-2 ${accent.bg} ${accent.bgHover} text-white font-semibold rounded-lg transition`}>
                Call Now
              </a>
            </nav>
            <a href={`tel:${d.phone}`} className={`md:hidden px-3 py-2 ${accent.bg} text-white text-sm font-bold rounded-lg`}>
              Call Now
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              {d.emergencyService && (
                <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  24/7 Emergency Service Available
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                {d.tagline}
              </h1>
              <p className="text-gray-300 text-xl mb-4 leading-relaxed">
                Licensed & insured {industryLabel.toLowerCase()} serving {d.city} and surrounding areas.
                {d.reviewCount > 0 && ` Trusted by ${d.reviewCount.toLocaleString()}+ local customers.`}
              </p>
              {d.rating > 0 && (
                <div className="flex items-center gap-2 mb-8">
                  <Stars rating={d.rating} size="lg" />
                  <span className="text-yellow-400 font-bold text-xl">{d.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({d.reviewCount.toLocaleString()} Google reviews)</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${d.phone}`}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${accent.bg} ${accent.bgHover} text-white font-bold text-lg rounded-xl transition shadow-lg`}
                >
                  📞 {d.phone}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 transition"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "✅", label: "Licensed & Insured", sub: "Fully certified" },
                { icon: "⭐", label: `${d.rating.toFixed(1)}/5 Rating`, sub: `${d.reviewCount.toLocaleString()}+ verified reviews` },
                { icon: "⚡", label: d.emergencyService ? "24/7 Emergency" : "Fast Response", sub: d.emergencyService ? "We answer the call" : "Same-day available" },
                { icon: "🏠", label: "Local & Independent", sub: `Serving ${d.city} area` },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                {industryLabel} Services
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Professional, reliable service for residential and commercial customers throughout the {d.city} area.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.services.map((service) => (
                <div
                  key={service}
                  className={`bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-5 flex items-start gap-3 transition hover:shadow-sm`}
                >
                  <span className={`mt-0.5 ${accent.text} font-bold text-lg`}>✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">{service}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`tel:${d.phone}`}
                className={`inline-flex items-center gap-2 px-8 py-4 ${accent.bg} ${accent.bgHover} text-white font-bold rounded-xl transition`}
              >
                Call for Pricing: {d.phone}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  About {d.businessName}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {d.businessName} is a local {industryLabel.toLowerCase()} company serving {d.city}, {d.state}{d.serviceAreas.length > 0 ? ` and ${d.serviceAreas.slice(0, 3).join(", ")}` : ""}.
                  {d.yearFounded ? ` In business since ${d.yearFounded}.` : ""}
                  {" "}We're licensed, insured, and committed to doing the job right the first time.
                </p>
                <ul className="space-y-3">
                  {[
                    "Licensed & fully insured",
                    "Upfront pricing — no surprise bills",
                    d.emergencyService ? "Available 24/7 for emergencies" : "Fast, reliable scheduling",
                    "Locally owned and operated",
                    "100% satisfaction guarantee",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <span className={`${accent.text} font-bold`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: d.rating.toFixed(1), label: "Google Rating" },
                  { value: `${d.reviewCount}+`, label: "Happy Customers" },
                  { value: d.yearFounded ? `${new Date().getFullYear() - d.yearFounded}+` : "Local", label: d.yearFounded ? "Years in Business" : "Company" },
                  { value: "24/7", label: d.emergencyService ? "Emergency Service" : "Commitment" },
                ].map((stat) => (
                  <div key={stat.label} className={`${accent.bgLight} border ${accent.border} rounded-2xl p-6 text-center`}>
                    <p className={`text-3xl font-black ${accent.text} mb-1`}>{stat.value}</p>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                What Our Customers Say
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Stars rating={d.rating} size="lg" />
                <span className="text-gray-700 font-semibold text-xl">
                  {d.rating.toFixed(1)} out of 5
                </span>
                <span className="text-gray-500">({d.reviewCount.toLocaleString()} Google reviews)</span>
              </div>
            </div>

            {d.reviewQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {d.reviewQuotes.slice(0, 3).map((review, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-1 text-yellow-400 mb-3 text-lg">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${accent.bg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {review.author[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                        <p className="text-gray-500 text-xs">Google Review</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white border border-gray-200 rounded-2xl px-10 py-8 text-center max-w-md">
                  <p className="text-5xl mb-4">⭐</p>
                  <p className="text-2xl font-black text-gray-900 mb-1">
                    {d.rating.toFixed(1)} / 5.0
                  </p>
                  <p className="text-gray-500">
                    Based on {d.reviewCount.toLocaleString()} verified Google reviews
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Service areas */}
        {d.serviceAreas.length > 0 && (
          <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Service Area</h2>
              <p className="text-gray-500 mb-8">
                Proudly serving {d.city} and these surrounding communities:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {d.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className={`px-4 py-2 ${accent.bgLight} border ${accent.border} ${accent.text} rounded-full text-sm font-medium`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA / contact */}
        <section id="contact" className={`${accent.bg} py-20 px-4`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Call us now for a free estimate.
              {d.emergencyService ? " Emergency service available 24/7." : ""}
            </p>
            <a
              href={`tel:${d.phone}`}
              className="inline-flex items-center gap-3 bg-white text-gray-900 font-black text-2xl px-10 py-5 rounded-2xl hover:bg-gray-50 transition shadow-lg mb-6"
            >
              📞 {d.phone}
            </a>
            {d.email && (
              <p className="text-white/70 text-sm">
                Or email us: <a href={`mailto:${d.email}`} className="text-white underline">{d.email}</a>
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-bold text-white text-lg mb-2">{d.businessName}</p>
                <p className="text-sm">{d.address}</p>
                <p className="text-sm">{d.city}, {d.state} {d.zip}</p>
                <a href={`tel:${d.phone}`} className="text-sm mt-2 block hover:text-white transition">{d.phone}</a>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-3">Services</p>
                <ul className="space-y-1 text-sm">
                  {d.services.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-3">Service Area</p>
                <p className="text-sm">{d.city}, {d.state} and surrounding areas</p>
                {d.serviceAreas.length > 0 && (
                  <p className="text-sm mt-1 text-gray-500">{d.serviceAreas.slice(0, 4).join(" • ")}</p>
                )}
                <div className="flex gap-3 mt-4">
                  {d.facebook && (
                    <a href={d.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition text-sm">Facebook</a>
                  )}
                  {d.instagram && (
                    <a href={d.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition text-sm">Instagram</a>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <p>© {new Date().getFullYear()} {d.businessName}. All rights reserved.</p>
              <p>
                Website by{" "}
                <Link href="https://gomakr.ai" className="text-amber-400 hover:text-amber-300 transition font-semibold">
                  Makr
                </Link>
                {" "}— want a site like this?{" "}
                <Link href="/contact" className="text-amber-400 hover:text-amber-300 transition underline">
                  Get yours free →
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
