import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import Link from "next/link";

export default function PengaturanPage() {
  const items = [
    { label: "Atur Kata Sandi", href: "/lainnya/pengaturan/password" },
    { label: "Metode Pembayaran", href: "/lainnya/pengaturan/metode" },
    { label: "Hapus Akun", href: "/lainnya/pengaturan/hapus" },
  ];

  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Pengaturan" showBackButton backUrl="/lainnya" />
      <div className="w-full max-w-sm mx-auto px-4 pt-4 pb-24 space-y-3">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-800">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      <NavBot />
    </main>
  );
}
