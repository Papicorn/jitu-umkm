import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import LaporanHome from "@/components/laporan/LaporanHome";

export default function LaporanPage() {
  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Laporan" showBackButton={false} backUrl="/dashboard" />
      <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
        <LaporanHome />
      </div>
      <NavBot />
    </main>
  );
}
