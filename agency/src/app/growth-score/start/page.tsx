import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrowthScoreForm } from "@/components/growth-score/GrowthScoreForm";

export default function GrowthScoreStartPage() {
  return (
    <>
      <Nav />
      <section className="pt-32 pb-24 px-6 bg-stone-50 min-h-screen">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-stone-900 mb-3">Get Your Free AI Growth Score</h1>
            <p className="text-stone-500">Tell us about your business — takes about 2 minutes.</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
            <GrowthScoreForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
