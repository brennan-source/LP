import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a Growth Gap Review",
  description:
    "Book a short, complimentary Growth Gap Review with Makr. We'll identify the clearest opportunities across your website, lead follow-up and internal workflows.",
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
