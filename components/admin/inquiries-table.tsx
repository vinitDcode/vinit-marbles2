"use client";

import { useState, useTransition } from "react";
import { Trash2, Phone, Mail, Loader2 } from "lucide-react";
import { deleteInquiry } from "@/lib/actions";
import type { TradeInquiry } from "@/lib/supabase-admin";

export function InquiriesTable({ inquiries }: { inquiries: TradeInquiry[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(inquiries);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this enquiry permanently? This cannot be undone.")) return;
    setPendingId(id);
    startTransition(async () => {
      try {
        await deleteInquiry(id);
        setRows((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        alert("Could not delete this enquiry. Please try again.");
      } finally {
        setPendingId(null);
      }
    });
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-16 text-center backdrop-blur-2xl">
        <p className="text-white/40">No enquiries yet. New leads will appear here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-widest text-white/40">
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Project Details</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="whitespace-nowrap px-6 py-5 text-white/50">
                  {new Date(row.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-5 font-medium text-white">{row.name}</td>
                <td className="px-6 py-5 text-white/60">
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-gold-light" /> {row.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-gold-light" /> {row.email}
                  </div>
                </td>
                <td className="max-w-sm px-6 py-5 text-white/60">
                  {row.project_details}
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handleDelete(row.id)}
                    disabled={isPending && pendingId === row.id}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-red-400/40 hover:text-red-400 disabled:opacity-50"
                    aria-label={`Delete enquiry from ${row.name}`}
                  >
                    {isPending && pendingId === row.id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
