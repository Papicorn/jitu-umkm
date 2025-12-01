"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tambahToko } from "@/lib/konsinyasiStorage";

export default function InputTokoKonTambah() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;
    const form = e.currentTarget;

    const nama_toko = (form.elements.namedItem("nama_toko") as HTMLInputElement)?.value.trim();
    const lokasi_toko = (form.elements.namedItem("lokasi_toko") as HTMLTextAreaElement)?.value.trim();
    const pemilik = (form.elements.namedItem("pemilik") as HTMLInputElement)?.value.trim();
    const kontak = (form.elements.namedItem("kontak") as HTMLInputElement)?.value.trim();
    const komisi_nominal_raw = (form.elements.namedItem("komisi_nominal") as HTMLInputElement)?.value;
    const komisi_persen_raw = (form.elements.namedItem("komisi_persen") as HTMLInputElement)?.value;

    if (!nama_toko) {
      alert("Nama toko wajib diisi.");
      return;
    }

    setIsSaving(true);
    try {
      const komisi_nominal = komisi_nominal_raw?.trim()
        ? Number(komisi_nominal_raw)
        : null;
      const komisi_persen = komisi_persen_raw?.trim()
        ? Number(komisi_persen_raw)
        : null;

      const newStore = tambahToko({
        nama_toko,
        lokasi_toko,
        pemilik,
        kontak,
        komisi_nominal: typeof komisi_nominal === "number" && !Number.isNaN(komisi_nominal) ? komisi_nominal : null,
        komisi_persen: typeof komisi_persen === "number" && !Number.isNaN(komisi_persen) ? komisi_persen : null,
      });

      form.reset();
      alert("✅ Toko berhasil disimpan di data lokal.");
      router.push(`/produk/konsinyasi/toko?id=${newStore.id}`);
    } catch (err) {
      console.error("Gagal menyimpan toko konsinyasi:", err);
      alert("❌ Gagal menyimpan toko. Ulangi lagi ya.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col text-zinc-700 space-y-3">

        {/* Nama Produk */}
        <label htmlFor="nama_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="nama_toko" id="nama_toko" className="outline-0 w-full text-sm" placeholder="Masukkan nama toko" required />
          </div>
        </label>

        {/* Deskripsi */}
        <label htmlFor="lokasi_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Lokasi Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <textarea name="lokasi_toko" id="lokasi_toko" className="text-sm w-full outline-0" rows={4} placeholder="Masukkan Lokasi Toko"></textarea>
          </div>
        </label>

        {/* Pemilik */}
        <label htmlFor="pemilik" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Pemilik</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="pemilik" id="pemilik" className="outline-0 w-full text-sm" placeholder="Masukkan Nama Pemilik Toko" required />
          </div>
        </label>

        {/* Kontak */}
        <label htmlFor="kontak" className="flex flex-col space-y-1">
          <span className="text-sm">Kontak</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="kontak" id="kontak" className="outline-0 w-full text-sm" placeholder="Masukkan Kontak" required />
          </div>
        </label>

        {/* Komisi */}
        <label htmlFor="harga_modal" className="flex flex-col space-y-1">
          <span className="text-sm">Komisi (Pilih salah satu)</span>
          <div className="grid grid-cols-2 gap-7">
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                <p className="text-sm">Rp</p>
                <input type="number" name="komisi_nominal" id="komisi_nominal" className="outline-0 w-full text-sm text-center" placeholder="2500" min="0" step="1" />
            </div>
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                <input type="number" name="komisi_persen" id="komisi_persen" className="outline-0 w-full text-sm text-center" placeholder="10" min="0" step="1" />
                <p className="text-sm">%</p>
            </div>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href="/produk/konsinyasi" className="w-full">
            <button type="button" className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600">
              Batal
            </button>
          </Link>
          <button type="submit" disabled={isSaving} className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
