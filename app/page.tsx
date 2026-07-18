import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { MaterialsGrid } from "@/components/materials-grid";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { ContactSection } from "@/components/contact-section";
import { InquiryForm } from "@/components/inquiry-form";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <MaterialsGrid />
      <WhyUs />
      <HowItWorks />
      <ContactSection />
      <InquiryForm />
    </>
  );
}
