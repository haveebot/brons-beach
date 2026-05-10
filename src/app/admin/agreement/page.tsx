import Link from "next/link";
import AgreementGenerator from "./AgreementGenerator";

export const dynamic = "force-dynamic";

/**
 * Bron's rental agreement generator — operator surface.
 *
 * Form takes per-booking data; renders a printable agreement merging
 * Bron's verified liability framework (sourced verbatim from
 * bronsbeachcarts.com/policies-%26-regulations on 2026-05-09). Fill the
 * form → agreement renders inline → Print/Save-as-PDF in 30 seconds.
 */
export default function AgreementPage() {
  return (
    <main className="min-h-screen bg-[#f5efe2] text-[#1a3a52]">
      <header className="bg-[#1a3a52] text-white border-b-4 border-[#e8654a] print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="text-xs text-white/70 hover:text-[#f5b35a]"
          >
            ← Back to dashboard
          </Link>
          <p className="font-display font-bold">Rental Agreement Generator</p>
          <span className="text-[11px] text-[#f5b35a] hidden sm:inline">
            Admin
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <AgreementGenerator />
      </div>
    </main>
  );
}
