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

interface CartItem {
  id: number;
  nama_produk: string;
  harga_jual: number;
  qty: number;
}

const STORAGE_KEY = "jitu_products";

export default function ProdukProdukPOS() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // ambil data produk dari localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      setProdukList(JSON.parse(raw));
    } catch (e) {
      console.error("Gagal membaca localStorage:", e);
    }
  }, []);

  const isInCart = (id: number) => cart.some((c) => c.id === id);

  const toggleCartItem = (p: Produk) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === p.id);
      if (exist) {
        // kalau sudah ada → remove
        return prev.filter((item) => item.id !== p.id);
      }
      // kalau belum ada → add dengan qty 1
      return [
        ...prev,
        {
          id: p.id,
          nama_produk: p.nama_produk,
          harga_jual: p.harga_jual,
          qty: 1,
        },
      ];
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const hasData = produkList.length > 0;

  const totalHarga = cart.reduce(
    (sum, item) => sum + item.qty * item.harga_jual,
    0
);

  return (
    <div className="w-full space-y-4">
      {!hasData && (
        <p className="text-sm text-zinc-500 mb-3">
          Belum ada produk tersimpan. Tambahkan produk di halaman input.
        </p>
      )}

      {/* GRID PRODUK */}
      <div className="grid grid-cols-3 gap-4">
        {hasData &&
          produkList.map((p) => (
            <label key={p.id} htmlFor={`produk-${p.id}`} className="block">
              {/* checkbox hidden, tapi jadi "peer" buat styling card */}
              <input
                type="checkbox"
                id={`produk-${p.id}`}
                name="transaksi"
                className="peer hidden"
                checked={isInCart(p.id)}
                onChange={() => toggleCartItem(p)}
              />

              <div
                className="
                  rounded-md shadow-sm overflow-hidden flex flex-col
                  bg-white border border-transparent
                peer-checked:border-amber-500
                  transition
                "
              >
                <div className="w-full relative aspect-square">
                  <Image
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
            </label>
          ))}
      </div>

      {/* LIST ITEM TERPILIH (CART) */}
      {cart.length > 0 && (
        <div className="mt-4 bg-[#FFCA40] rounded-xl fixed bottom-18 right-0 left-0 pt-3 pb-7 px-3 space-y-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg px-3 py-2 flex items-center justify-between text-sm"
            >
              {/* nama + tombol hapus */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 flex items-center text-zinc-800 justify-center rounded bg-zinc-100 text-xs"
                >
                  ✕
                </button>
                <span className="font-medium text-zinc-800">
                  {item.nama_produk}
                </span>
              </div>

              {/* kontrol qty */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => changeQty(item.id, -1)}
                  className="w-8 h-8 flex items-center text-zinc-800 justify-center rounded bg-zinc-100 text-xs"
                >
                  −
                </button>
                <span className="w-6 text-center text-zinc-800 text-xs">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => changeQty(item.id, 1)}
                  className="w-8 h-8 flex items-center text-zinc-800 justify-center rounded bg-zinc-100 text-xs"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg p-3 text-right font-bold text-zinc-800">
            Total: Rp{totalHarga.toLocaleString("id-ID")} {'>'}
          </div>
        </div>
      )}
    </div>
  );
}
