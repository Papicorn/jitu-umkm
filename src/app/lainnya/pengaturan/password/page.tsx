 "use client";

import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import { useState } from "react";

export default function UbahPasswordPage() {
  const [baru, setBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baru || !konfirmasi) {
      alert("Isi kedua kolom kata sandi.");
      return;
    }
    if (baru !== konfirmasi) {
      alert("Kata sandi tidak sama.");
      return;
    }
    alert("Kata sandi diperbarui (dummy).");
  };

  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Pengaturan" showBackButton backUrl="/lainnya/pengaturan" />
      <div className="w-full max-w-sm mx-auto px-4 pt-4 pb-24">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-3 space-y-1">
            <p className="text-xs text-zinc-500">Kata Sandi Baru</p>
            <input
              type="password"
              value={baru}
              onChange={(e) => setBaru(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-zinc-700"
              placeholder="Masukkan Kata Sandi Baru"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-3 space-y-1">
            <p className="text-xs text-zinc-500">Konfirmasi Kata Sandi</p>
            <input
              type="password"
              value={konfirmasi}
              onChange={(e) => setKonfirmasi(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-zinc-700"
              placeholder="Konfirmasi Kata Sandi"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFCA40] border border-zinc-400 rounded-xl py-3 text-sm font-semibold text-zinc-800"
          >
            Simpan
          </button>
        </form>
      </div>
      <NavBot />
    </main>
  );
}
