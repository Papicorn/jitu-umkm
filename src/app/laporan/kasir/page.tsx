import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import LaporanKasir from "@/components/laporan/LaporanKasir";

export default function LaporanKasirPage() {
  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Laporan Kasir" showBackButton backUrl="/laporan" />
      <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-27 space-y-4">
        <LaporanKasir mode="kasir" />
      </div>
      <NavBot />
    </main>
  );
}
