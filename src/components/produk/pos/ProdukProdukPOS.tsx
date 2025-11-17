"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Produk {
  id: number;
  nama_produk: string;
  harga_jual: number;
  stok: number;
  gambar_base64?: string | null;
}

const STORAGE_KEY = "jitu_products";

export default function ProdukProdukPOS() {
  const [produkList, setProdukList] = useState<Produk[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw);
      setProdukList(data);
    } catch (e) {
      console.error("Gagal membaca localStorage:", e);
    }
  }, []);

  const hasData = produkList.length > 0;

  return (
    <div className="w-full">
      {!hasData && (
        <p className="text-sm text-zinc-500 mb-3">
          Belum ada produk tersimpan. Tambahkan produk di halaman input.
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {hasData ? (
          produkList.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col"
            >
              <div className="w-full relative aspect-square">
                <Image
                  src={p.gambar_base64 || "/assets/image/ubi-ungu.jpg"}
                  alt={p.nama_produk}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                  {p.stok}
                </div>
              </div>
              <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                <p className="text-zinc-700 leading-4">{p.nama_produk}</p>
                <p className="font-bold text-zinc-700">
                  Rp{Number(p.harga_jual).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-center text-zinc-400 col-span-3 py-4">
            Tidak ada produk.
          </div>
        )}
      </div>
    </div>
  );
}