import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import Link from "next/link";

type Item = { label: string; href: string; danger?: boolean; icon?: string };

const items: Item[] = [
  { label: "Profil", href: "/lainnya/profil", icon: "👤" },
  { label: "Laporan", href: "/laporan", icon: "📑" },
  { label: "Pengaturan", href: "/lainnya/pengaturan", icon: "⚙️" },
  { label: "Persediaan Produk Kasir", href: "/lainnya/persediaan", icon: "📦" },
  { label: "Kelola Toko", href: "/produk/konsinyasi", icon: "🏬" },
  { label: "Keluar", href: "/auth/logout", danger: true, icon: "↩️" },
];

export default function LainnyaPage() {
  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Lainnya" showBackButton backUrl="/dashboard" />
      <div className="w-full max-w-sm mx-auto px-4 pt-4 pb-24 space-y-3">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              className={`bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-3 text-sm flex items-center gap-2 ${
                item.danger ? "text-red-500 border-red-100" : "text-zinc-800"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
      <NavBot />
    </main>
  );
}
