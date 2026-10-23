import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";

export const metadata: Metadata = {
  title: "Professional Services — Intake, Follow-Up & Workflow Automation for Firms",
  description:
    "Makr helps accounting, legal, consulting, engineering and advisory firms streamline intake, nurture prospects and improve client communication.",
  alternates: { canonical: "/industries/professional-services" },
};

const SEGMENTS = [
  { name: "Accounting & Tax", problem: "Deadline seasons bury the team in document chasing and repetitive client questions.", capabilities: ["Document collection reminders", "Client intake and routing", "Status updates drafted for review"] },
  { name: "Legal", problem: "Inquiries need a fast, careful response, and intake details are often gathered by hand.", capabilities: ["Structured intake forms", "Consultation booking", "Document drafting support for attorney review"] },
  { name: "Consulting", problem: "Proposals take too long to produce and follow-up depends on whoever remembers.", capabilities: ["Proposal follow-up", "Research and notes organized", "Pipeline reporting"] },
  { name: "Engineering & Architecture", problem: "Project inquiries and documentation move through email threads and spreadsheets.", capabilities: ["Project inquiry intake", "Documentation workflows", "Client update drafting"] },
  { name: "Financial Advisory", problem: "Prospects need nurturing over months, and client reporting takes hours to assemble.", capabilities: ["Prospect nurture sequences", "Meeting booking and reminders", "Client reporting support"] },
];

export default function ProfessionalServicesPage() {
  return (
    <IndustryDetail
      id="professional-services"
      name="Professional Services"
      headline="Streamline intake, nurture prospects and improve client communication."
      intro="Makr helps accounting firms, law firms, consultancies and other professional practices respond faster, keep prospects warm and spend less time on administrative work."
      segments={SEGMENTS}
      applications={[
        ["A credible site that explains your expertise", "Clear consultation requests and booking", "Landing pages for specific services"],
        ["Fast replies to new inquiries", "Nurture for prospects who aren't ready yet", "Reminders before consultations"],
        ["Intake details routed to the right person", "Document collection without chasing", "Client updates drafted for your review"],
      ]}
      ctaTitle="Where is your firm losing prospects or hours?"
      ctaBody="Book a short Growth Gap Review. We'll look at your website, intake process and client communication and point to the clearest improvements."
    />
  );
}
