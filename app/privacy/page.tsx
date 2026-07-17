import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vinit Marbles",
};

export default function PrivacyPage() {
  return (
    <section className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="overline mb-4">Legal</p>
        <h1 className="mb-4 font-display text-4xl md:text-5xl">
          Privacy <span className="gold-text">Policy</span>
        </h1>
        <p className="mb-12 text-sm text-white/40">Last updated: July 2026</p>

        <div className="space-y-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] md:p-12">
          <LegalBlock title="1. Introduction">
            <p>
              Vinit Marbles (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operating from
              Plot No. 44 A, Tikri Khurd Village, Narela, New Delhi, Delhi, 110036, is committed to
              protecting the privacy of visitors to vinitmarbles.com (the &ldquo;Site&rdquo;) and
              customers who enquire about our natural stone and granite products. This policy explains
              what personal data we collect, why we collect it, and how it is handled in accordance
              with the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) and other
              applicable Indian law.
            </p>
          </LegalBlock>

          <LegalBlock title="2. Personal Data We Collect">
            <p>
              We only collect personal data that you knowingly and voluntarily provide to us, primarily
              through the enquiry form on this Site. This includes:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/60">
              <li>Your full name</li>
              <li>Your phone number</li>
              <li>Your email address</li>
              <li>Details of the project you describe to us (e.g. area, stone type, timeline)</li>
            </ul>
            <p className="mt-3">
              We do not knowingly collect sensitive personal data (such as financial account details,
              biometric data, or health information) through this Site.
            </p>
          </LegalBlock>

          <LegalBlock title="3. Purpose and Lawful Basis for Processing">
            <p>
              Under the DPDP Act, we process your personal data on the basis of your explicit consent,
              given at the point of submitting the enquiry form. We use your data solely to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/60">
              <li>Respond to your enquiry by phone, WhatsApp, or email</li>
              <li>Prepare quotations and share product or material information</li>
              <li>Maintain records of trade and retail enquiries for our internal business operations</li>
            </ul>
            <p className="mt-3">
              We do not use your data for automated decision-making, and we do not sell your personal
              data to third parties.
            </p>
          </LegalBlock>

          <LegalBlock title="4. Data Storage and Security">
            <p>
              Enquiry data submitted through this Site is stored on secure, access-controlled
              infrastructure. Access to stored enquiries is restricted to authorised personnel of Vinit
              Marbles through a protected internal dashboard. We take reasonable technical and
              organisational measures to protect your data against unauthorised access, alteration, or
              disclosure.
            </p>
          </LegalBlock>

          <LegalBlock title="5. Data Retention">
            <p>
              We retain enquiry data for as long as reasonably necessary to fulfil the purposes
              described above, or until you request its deletion, whichever is earlier. Enquiries that
              do not convert into a business relationship are periodically reviewed and may be deleted.
            </p>
          </LegalBlock>

          <LegalBlock title="6. Your Rights Under the DPDP Act">
            <p>As a Data Principal under the DPDP Act, you have the right to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/60">
              <li>Request a summary of the personal data we hold about you</li>
              <li>Request correction or updating of inaccurate or incomplete data</li>
              <li>Request erasure of your personal data, subject to our legitimate business and legal record-keeping needs</li>
              <li>Withdraw your consent at any time, without affecting the lawfulness of processing carried out before withdrawal</li>
              <li>Register a grievance regarding how your data has been handled</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="7. Third-Party Sharing">
            <p>
              We do not share your personal data with third parties for marketing purposes. Limited
              data may be shared with our logistics or delivery partners solely to coordinate delivery
              of stone material you have ordered, and only to the extent necessary for that purpose.
            </p>
          </LegalBlock>

          <LegalBlock title="8. Cookies">
            <p>
              This Site may use strictly necessary cookies to maintain basic functionality. We do not
              currently use third-party advertising or tracking cookies.
            </p>
          </LegalBlock>

          <LegalBlock title="9. Grievance Officer">
            <p>
              For any privacy-related queries, correction requests, or grievances, please contact our
              team directly using the phone numbers listed on our Contact section, or via the enquiry
              form marked &ldquo;Privacy Request&rdquo;. We aim to acknowledge grievances within a
              reasonable timeframe as required under applicable law.
            </p>
          </LegalBlock>

          <LegalBlock title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              applicable law. The &ldquo;Last updated&rdquo; date at the top of this page indicates when
              this policy was last revised.
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
