export type Stage =
  | "prospect"
  | "contacted"
  | "demo_sent"
  | "trial"
  | "customer"
  | "churned";

export const STAGES: { value: Stage; label: string }[] = [
  { value: "prospect", label: "Prospect" },
  { value: "contacted", label: "Contacted" },
  { value: "demo_sent", label: "Demo Sent" },
  { value: "trial", label: "Trial" },
  { value: "customer", label: "Customer" },
  { value: "churned", label: "Churned" },
];

export type Product = "leadpulse" | "aria";

export interface ContactProduct {
  id: string;
  contactId: string;
  product: string;
  status: string;
  paidAt: string | null;
  valuecents: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  contactId: string;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  contactId: string;
  type: string;
  description: string | null;
  metadata: string | null;
  createdAt: string;
}

export interface Contact {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  businessName: string | null;
  industry: string | null;
  city: string | null;
  state: string | null;
  website: string | null;
  linkedinUrl: string | null;
  stage: string;
  source: string;
  tags: string | null;
  notes: Note[];
  activities: Activity[];
  products: ContactProduct[];
  createdAt: string;
  updatedAt: string;
}

export type CampaignType = "email" | "linkedin" | "call";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  subject: string;
  body: string;
  status: string;
  sentCount: number;
  createdAt: string;
  updatedAt: string;
}
