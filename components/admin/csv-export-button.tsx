"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CsvExportButton() {
  return (
    <Button
      variant="gold"
      size="sm"
      onClick={() => {
        window.location.href = "/api/inquiries/export";
      }}
    >
      <Download size={15} />
      Export CSV
    </Button>
  );
}
