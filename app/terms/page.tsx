import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vinit Marbles",
};

export default function TermsPage() {
  return (
    <section className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="overline mb-4">Legal</p>
        <h1 className="mb-4 font-display text-4xl md:text-5xl">
          Terms &amp; <span className="gold-text">Conditions</span>
        </h1>
        <p className="mb-12 text-sm text-white/40">Last updated: July 2026</p>

        <div className="space-y-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] md:p-12">
          <LegalBlock title="1. Acceptance of Terms">
            <p>
              These Terms &amp; Conditions govern all enquiries, quotations, orders, and sales made
              through vinitmarbles.com or directly with Vinit Marbles at Plot No. 44 A, Tikri Khurd
              Village, Narela, New Delhi, Delhi, 110036. By submitting an enquiry or placing an order,
              you agree to be bound by these terms.
            </p>
          </LegalBlock>

          <LegalBlock title="2. Nature of Natural Stone Products">
            <p>
              Marble and granite are natural materials formed by geological processes over millions of
              years. As such:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/60">
              <li>
                Variation in veining, colour, tone, and pattern between slabs, batches, and quarry
                lots is inherent and expected, even within the same stone category.
              </li>
              <li>
                Physical samples, photographs, and digital renderings displayed on this Site are
                representative only and do not constitute a guarantee of the exact appearance of
                material supplied.
              </li>
              <li>
                Natural stone may contain minor fissures, pitting, or mineral deposits, which are
                characteristic of the material and not considered manufacturing defects.
              </li>
              <li>
                We strongly recommend customers inspect physical slabs at our premises before bulk
                confirmation for large-format projects.
              </li>
            </ul>
            <p className="mt-3">
              Vinit Marbles shall not be liable for aesthetic dissatisfaction arising from natural
              variation that falls within the ordinary characteristics of the stone type ordered.
            </p>
          </LegalBlock>

          <LegalBlock title="3. Quotations and Orders">
            <p>
              Quotations shared via phone, WhatsApp, or the enquiry form are estimates based on
              information provided by the customer and are valid for 15 days from the date of issue
              unless stated otherwise. Final pricing is confirmed only upon physical measurement,
              slab selection, and written order confirmation.
            </p>
          </LegalBlock>

          <LegalBlock title="4. Payment Terms">
            <ul className="list-disc space-y-1.5 pl-5 text-white/60">
              <li>An advance payment, as agreed at the time of order confirmation, is required to book material and schedule fabrication or delivery.</li>
              <li>Balance payment is due prior to dispatch unless a separate written agreement specifies otherwise.</li>
              <li>Custom-cut, polished, or fabricated stone is non-returnable once payment is confirmed and cutting has commenced.</li>
              <li>All prices are quoted in Indian Rupees (INR) and are exclusive of applicable GST unless stated otherwise.</li>
              <li>Delayed payments may attract rescheduling of delivery timelines at our discretion.</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="5. Delivery Constraints">
            <ul className="list-disc space-y-1.5 pl-5 text-white/60">
              <li>Delivery timelines communicated at the time of order are estimates and may be affected by quarry availability, weather, transport conditions, or site accessibility.</li>
              <li>Customers are responsible for ensuring adequate vehicle access, unloading arrangements, and manpower at the delivery site.</li>
              <li>Risk in the goods passes to the customer upon delivery to the specified site or upon collection from our premises.</li>
              <li>Additional charges may apply for delivery locations outside our standard Delhi NCR service area, or where re-delivery is required due to site inaccessibility.</li>
              <li>Vinit Marbles is not liable for delays caused by circumstances beyond its reasonable control, including but not limited to transport strikes, natural disasters, or regulatory restrictions.</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="6. Inspection and Claims">
            <p>
              Customers must inspect delivered material at the time of delivery and report any
              transport damage or material discrepancy within 48 hours. Claims raised after this
              window, or after installation/fabrication has commenced, cannot be honoured, as
              installation is treated as acceptance of the material.
            </p>
          </LegalBlock>

          <LegalBlock title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable Indian law, Vinit Marbles&rsquo; liability
              for any claim arising out of the sale or delivery of goods shall not exceed the invoice
              value of the specific material in question. We are not liable for indirect, incidental,
              or consequential losses, including project delays attributable to third-party
              contractors.
            </p>
          </LegalBlock>

          <LegalBlock title="8. Governing Law and Jurisdiction">
            <p>
              These terms are governed by the laws of India. Any disputes arising out of or in
              connection with these terms shall be subject to the exclusive jurisdiction of the courts
              at Delhi.
            </p>
          </LegalBlock>

          <LegalBlock title="9. Changes to These Terms">
            <p>
              We may revise these Terms &amp; Conditions from time to time. Continued use of this Site
              or placement of new orders after such changes constitutes acceptance of the updated
              terms.
            </p>
          </LegalBlock>
        </div>
      </div>
    </section>
  );
}

function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-display text-xl text-white">{title}</h2>
      <div className="text-[15px] leading-relaxed text-white/70">{children}</div>
    </div>
  );
}
