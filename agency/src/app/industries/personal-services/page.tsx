import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";

export const metadata: Metadata = {
  title: "Personal Services — Booking, Reminders & Reactivation for Appointment Businesses",
  description:
    "Makr helps dental, veterinary, med spa, wellness, fitness and beauty businesses increase bookings, reduce no-shows and reactivate past clients.",
  alternates: { canonical: "/industries/personal-services" },
};

const SEGMENTS = [
  { name: "Dental", problem: "Appointment slots go unfilled because of no-shows and lapsed patients who never rebook.", capabilities: ["No-show follow-up", "Patient reactivation campaigns", "Appointment reminders"] },
  { name: "Veterinary", problem: "Calls go unanswered during busy clinic hours, and missed calls mean missed appointments.", capabilities: ["Missed-call text back", "Online booking", "Follow-up after visits"] },
  { name: "Med Spa & Aesthetics", problem: "High-value services need consistent follow-up. Many clients drift away between treatments.", capabilities: ["Treatment follow-up", "Client reactivation campaigns", "Booking and rescheduling workflows"] },
  { name: "Wellness & Therapy", problem: "New client intake is manual and time-consuming for a small team.", capabilities: ["Intake form automation", "Session reminders", "Review requests"] },
  { name: "Fitness", problem: "Member churn happens quietly. Timely outreach keeps people coming back.", capabilities: ["Membership renewal reminders", "Win-back outreach", "Class and appointment booking"] },
  { name: "Beauty & Salon", problem: "Rebooking at checkout is inconsistent, leaving gaps in the calendar.", capabilities: ["Rebooking prompts", "Lapsed client reactivation", "Review requests"] },
  { name: "Senior Services", problem: "Families researching care need fast, empathetic responses. Delays lose placements.", capabilities: ["Prompt inquiry response", "Family communication workflows", "Assessment scheduling"] },
];

export default function PersonalServicesPage() {
  return (
    <IndustryDetail
      id="personal-services"
      name="Personal Services"
      headline="Increase bookings, reduce no-shows and reactivate past customers."
      intro="Makr helps dental practices, veterinary clinics, wellness providers, med spas, fitness studios and salons keep their calendars full and their front desks less buried."
      segments={SEGMENTS}
      applications={[
        ["A site that makes booking the obvious next step", "Service pages that answer common questions", "Ongoing updates as services change"],
        ["Confirmations and reminders before every visit", "Reactivation for clients who haven't returned", "Review requests after great visits"],
        ["Intake forms that fill your systems automatically", "Fewer manual reminder calls", "Simple reports on bookings and no-shows"],
      ]}
      ctaTitle="How many appointments are slipping through?"
      ctaBody="Book a short Growth Gap Review. We'll look at your booking flow, reminders and follow-up and show you the clearest improvements."
    />
  );
}
