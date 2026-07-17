import type { Metadata } from "next";
import { getSupabaseAdmin, type TradeInquiry } from "@/lib/supabase-admin";
import { InquiriesTable } from "@/components/admin/inquiries-table";
import { CsvExportButton } from "@/components/admin/csv-export-button";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
  title: "Vault | Vinit Marbles",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getInquiries(): Promise<TradeInquiry[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("trade_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load inquiries:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function AdminPage() {
  // Note: middleware.ts already blocks unauthenticated requests to /admin/*,
  // so by the time this Server Component renders, the session is valid.
  const inquiries = await getInquiries();

  return (
    <section className="relative min-h-screen px-6 py-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="overline mb-2">Private Vault</p>
            <h1 className="font-display text-3xl md:text-4xl">
              Trade <span className="gold-text">Enquiries</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <CsvExportButton />
            <LogoutButton />
          </div>
        </div>

        <p className="mb-6 text-sm text-white/40">
          {inquiries.length} enquir{inquiries.length === 1 ? "y" : "ies"} on record
        </p>

        <InquiriesTable inquiries={inquiries} />
      </div>
    </section>
  );
}
