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

export default function ProdukProdukPOS() {
  const [produkList, setProdukList] = useState<Produk[]>([]);

  useEffect(() => {
    const req = indexedDB.open("jituDB", 1);

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("products", "readonly");
      const store = tx.objectStore("products");
      const getAll = store.getAll();

      getAll.onsuccess = () => {
        setProdukList(getAll.result as Produk[]);
      };

      getAll.onerror = () => {
        console.error("Gagal ambil data produk dari IndexedDB");
      };
    };

    req.onerror = () => {
      console.error("Gagal buka IndexedDB");
    };
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
                  // kalau ada gambar dari IndexedDB pakai itu, kalau tidak pakai placeholder
                  src={p.gambar_base64 || "/assets/image/ubi-ungu.jpg"}
                  className="object-cover"
                  alt={p.nama_produk}
                  fill
                />
                <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                  {p.stok ?? 0}
                </div>
              </div>
              <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                <p className="text-zinc-700 leading-4">{p.nama_produk}</p>
                <p className="font-bold text-zinc-700">
                  Rp{Number(p.harga_jual || 0).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))
        ) : (
          // fallback: bisa tampilkan produk dummy kalau mau
          <>
            <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
              <div className="w-full relative aspect-square">
                <Image
                  src="/assets/image/ubi-ungu.jpg"
                  className="object-cover"
                  alt="Keripik Ubi Ungu"
                  fill
                />
                <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                  20
                </div>
              </div>
              <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                <p className="text-zinc-700 leading-4">Keripik Ubi Ungu</p>
                <p className="font-bold text-zinc-700">Rp35.000</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
