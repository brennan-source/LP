import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a Business Growth Assessment",
  description:
    "Book a Business Growth Assessment with Makr: a free 20-minute call and a short written summary of where your business can win more work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <Footer />
    </>
  );
}
