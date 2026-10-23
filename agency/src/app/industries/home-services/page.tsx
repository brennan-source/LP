import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";

export const metadata: Metadata = {
  title: "Home Services — Websites, Follow-Up & Automation for Contractors",
  description:
    "Makr helps HVAC, plumbing, roofing, electrical and other home service businesses answer faster, follow up on every estimate and cut office work.",
  alternates: { canonical: "/industries/home-services" },
};

const SEGMENTS = [
  { name: "HVAC", problem: "Emergency calls during peak season go to voicemail. After-hours service requests go to competitors.", capabilities: ["After-hours call capture and intake", "Seasonal maintenance reminders", "Technician scheduling support"] },
  { name: "Plumbing", problem: "Urgent calls can't wait. If you don't respond quickly, the next plumber gets the job.", capabilities: ["Immediate missed-call text back", "Emergency request routing", "Estimate follow-up"] },
  { name: "Roofing", problem: "Storm season floods the phone. Qualifying leads and booking estimates quickly is everything.", capabilities: ["High-volume inquiry handling", "Lead qualification questions", "Estimate pipeline follow-up"] },
  { name: "Electrical", problem: "Busy lines and missed calls during peak periods hand jobs directly to competitors.", capabilities: ["Overflow call capture", "Service scheduling workflows", "Follow-up on open estimates"] },
  { name: "Restoration", problem: "Emergency restoration leads are time-sensitive. The first responder usually wins the job.", capabilities: ["Around-the-clock inquiry intake", "Job documentation handling", "Job status communication"] },
  { name: "Landscaping", problem: "Seasonal demand spikes mean admin work piles up right when you're busiest in the field.", capabilities: ["Seasonal quote follow-up", "Customer reactivation campaigns", "Recurring service scheduling"] },
  { name: "Pest Control", problem: "Recurring service customers are valuable. Renewal reminders keep them on schedule.", capabilities: ["Service renewal reminders", "Customer reactivation", "Review requests"] },
];

export default function HomeServicesPage() {
  return (
    <IndustryDetail
      id="home-services"
      name="Home Services"
      headline="Convert local demand and follow up on every inquiry."
      intro="Makr helps HVAC, plumbing, roofing, electrical and other home service businesses respond faster, follow up on every estimate and spend less time on office work."
      segments={SEGMENTS}
      applications={[
        ["Service and location pages that rank and convert", "Click-to-call and quote forms on every page", "Ongoing site care so it stays current"],
        ["Missed-call text back", "Estimate follow-up until a decision", "Seasonal reminders and review requests"],
        ["Intake details captured before the callback", "Job and estimate data moved between tools", "Weekly summaries of leads and open quotes"],
      ]}
      ctaTitle="Find out where your business is losing jobs."
      ctaBody="Book a short Growth Gap Review. We'll look at how customers find you, what happens when they call and where follow-up breaks down."
    />
  );
}
