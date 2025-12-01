"use client";

import Link from "next/link";

export default function LaporanHome() {
  return (
    <div className="w-full">
      <div className="space-y-2 flex flex-col">
        <Link href="/laporan/kasir">
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-4 py-4 text-sm font-semibold text-zinc-800">
            Laporan Kasir
          </div>
        </Link>
        <Link href="/laporan/konsinyasi">
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-4 py-4 text-sm font-semibold text-zinc-800">
            Laporan Penitipan
          </div>
        </Link>
      </div>
      <p className="text-xs text-orange-500 italic mt-2">
        *Mode offline aktif, data akan disinkronkan saat koneksi kembali.
      </p>
    </div>
  );
}
