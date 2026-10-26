"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// The browser's print dialog offers "Save as PDF", which keeps the PDF in sync with
// the site content instead of maintaining a separate file that drifts.
export function PrintButton() {
  return (
    <Button onClick={() => window.print()} className="print:hidden">
      <Download className="h-4 w-4" />
      Download PDF
    </Button>
  );
}
