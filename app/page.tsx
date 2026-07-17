import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { MaterialsGrid } from "@/components/materials-grid";
import { ContactSection } from "@/components/contact-section";
import { InquiryForm } from "@/components/inquiry-form";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <MaterialsGrid />
      <ContactSection />
      <InquiryForm />
    </>
  );
}
