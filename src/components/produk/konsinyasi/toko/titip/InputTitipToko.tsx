"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { addTitipan, getStoreById } from "@/lib/konsinyasiStorage";

const POS_STORAGE_KEY = "jitu_products";

type PosProduct = {
  id: number | string;
  nama_produk: string;
  kategori?: string;
  satuan?: string;
  harga_jual?: number;
  stok?: number;
};

type Props = {
  storeId?: string;
};

export default function InputTitipToko({ storeId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedStoreId = storeId ?? searchParams.get("id") ?? undefined;
  const [produkList, setProdukList] = useState<PosProduct[]>([]);
  const [selectedProdukId, setSelectedProdukId] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!resolvedStoreId) return;
    const store = getStoreById(resolvedStoreId);
    setStoreName(store?.nama_toko ?? "");
  }, [resolvedStoreId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(POS_STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as PosProduct[];
      setProdukList(data);
    } catch (err) {
      console.error("Gagal membaca data produk POS:", err);
    }
  }, []);

  const selectedProduk = useMemo(() => {
    if (!selectedProdukId) return null;
    return produkList.find((item) => String(item.id) === selectedProdukId) ?? null;
  }, [selectedProdukId, produkList]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;
    if (!resolvedStoreId) {
      alert("Toko tidak ditemukan. Kembali ke daftar toko.");
      router.push("/produk/konsinyasi");
      return;
    }
    if (!selectedProduk) {
      alert("Pilih produk yang ingin dititipkan dulu ya.");
      return;
    }

    const form = e.currentTarget;
    const stokInput = form.elements.namedItem("stok_jual") as HTMLInputElement | null;
    const estimasiInput = form.elements.namedItem("estimasi") as HTMLInputElement | null;

    const stok_jual = stokInput?.value ? Number(stokInput.value) : 0;
    if (!stok_jual || stok_jual <= 0) {
      alert("Masukkan jumlah stok yang ingin dititipkan.");
      return;
    }

    const estimasi = estimasiInput?.value;
    if (!estimasi) {
      alert("Tanggal estimasi wajib diisi.");
      return;
    }

    setIsSaving(true);
    try {
      addTitipan({
        storeId: resolvedStoreId,
        produkId: selectedProduk.id,
        produkNama: selectedProduk.nama_produk,
        kategori: selectedProduk.kategori ?? "",
        satuan: selectedProduk.satuan ?? "",
        hargaJual: selectedProduk.harga_jual ?? null,
        stokTitip: stok_jual,
        estimasi,
      });
      alert("✅ Titipan berhasil disimpan.");
      router.push(`/produk/konsinyasi/toko?id=${resolvedStoreId}`);
    } catch (err) {
      console.error("Gagal menyimpan titipan:", err);
      alert("❌ Gagal menyimpan titipan.");
    } finally {
      setIsSaving(false);
    }
  };

  const backUrl = resolvedStoreId ? `/produk/konsinyasi/toko?id=${resolvedStoreId}` : "/produk/konsinyasi";

  return (
    <div className="w-full">
      {storeName && (
        <p className="text-sm text-zinc-500 mb-2">
          Titip untuk <b>{storeName}</b>
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col text-zinc-700 space-y-3">
        <label htmlFor="produk" className="flex flex-col space-y-1">
          <span className="text-sm">Pilih Produk</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <select
              className="outline-0 w-full text-sm text-zinc-700"
              id="produk"
              name="produk"
              value={selectedProdukId}
              onChange={(event) => setSelectedProdukId(event.target.value)}
            >
              <option value="">-- Tekan Untuk Memilih Produk --</option>
              {produkList.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.nama_produk} {item.stok ? `(Stok: ${item.stok})` : ""}{" "}
                  {item.harga_jual ? `| Rp${Number(item.harga_jual).toLocaleString("id-ID")}` : ""}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label htmlFor="detail_produk" className="flex flex-col space-y-1">
          <span className="text-sm">Detail Produk</span>
          <div className="bg-white border text-sm py-3 px-3 rounded-lg shadow-sm space-y-1">
            {selectedProduk ? (
              <>
                <p>
                  Nama Produk : <b>{selectedProduk.nama_produk}</b>
                </p>
                <p>
                  Kategori : <b>{selectedProduk.kategori || "-"}</b>
                </p>
                <p>
                  Satuan : <b>{selectedProduk.satuan || "-"}</b>
                </p>
                <p>
                  Harga Jual :{" "}
                  <b>
                    {selectedProduk.harga_jual
                      ? `Rp${Number(selectedProduk.harga_jual).toLocaleString("id-ID")}`
                      : "-"}
                  </b>
                </p>
                <p>
                  Stok Tersedia : <b>{selectedProduk.stok ?? "-"}</b>
                </p>
              </>
            ) : (
              <p className="text-zinc-500">Pilih produk terlebih dahulu untuk melihat detail.</p>
            )}
          </div>
        </label>

        <label htmlFor="stok_jual" className="flex flex-col space-y-1">
          <span className="text-sm">Stok Dijual</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="number" name="stok_jual" id="stok_jual" className="outline-0 w-full text-sm" placeholder="0" min="1" required />
          </div>
        </label>

        <label htmlFor="estimasi" className="flex flex-col space-y-1">
          <span className="text-sm">Estimasi</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="date" name="estimasi" id="estimasi" className="outline-0 w-full text-sm" required />
          </div>
        </label>

        <p className="text-xs text-red-400">
          Pastikan produk yang dititipkan tersedia sudah sesuai dengan stok tersedia
        </p>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href={backUrl} className="w-full">
            <button type="button" className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600">
              Batal
            </button>
          </Link>
          <button type="submit" disabled={isSaving} className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {isSaving ? "Menyimpan..." : "Titip"}
          </button>
        </div>
      </form>
    </div>
  );
}
