import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import Image from "next/image";

export default function ProfilPage() {
  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Profil" showBackButton backUrl="/lainnya" />
      <div className="w-full max-w-sm mx-auto px-4 pt-4 pb-24 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-4 space-y-3">
          <p className="text-sm font-semibold text-zinc-800">Logo Toko Anda</p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#f2f4fb] border border-zinc-200 rounded-xl flex items-center justify-center">
              <Image src="/assets/image/camera.svg" alt="logo" width={22} height={22} />
            </div>
            <button className="text-sm text-blue-600 underline">Tambah Logo Toko</button>
          </div>
        </div>

        <form className="space-y-3">
          <Field label="Nama Toko Anda" defaultValue="Toko Alaa" />
          <Field label="Nama pemilik Usaha" defaultValue="Miftahul Fazra" />
          <Field label="Nomor Telepon" defaultValue="082387436427" />
          <Field label="Email" defaultValue="miftahulfazra@gmail.com" />
        </form>
      </div>
      <NavBot />
    </main>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-3 space-y-1">
      <p className="text-xs text-zinc-500">{label}</p>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full outline-none bg-transparent text-sm text-zinc-700"
      />
    </div>
  );
}
