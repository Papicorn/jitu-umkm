"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { kurangiStokProdukPOS } from "@/lib/konsinyasiStorage";

interface Produk {
  id: number;
  nama_produk: string;
  harga_jual: number;
  stok: number;
  gambar_base64?: string | null;
  kategori?: string;
}

interface CartItem {
  id: number;
  nama_produk: string;
  harga_jual: number;
  qty: number;
  kategori?: string;
}

type Step = "idle" | "detail" | "payment" | "success";
type PaymentMethod = "tunai" | "transfer";

interface Receipt {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  paymentMethod: PaymentMethod;
}

type PosTransaksi = {
  id: number;
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  paymentMethod: PaymentMethod;
  created_at: string;
};

const STORAGE_KEY = "jitu_products";
const POS_TRANSAKSI_KEY = "jitu_pos_transactions";
const SEARCH_EVENT = "pos-search-term";

const formatCurrency = (value: number) =>
  `Rp${Number(value || 0).toLocaleString("id-ID")}`;

export default function ProdukTransaksiPOS() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("idle");
  const [lastReceipt, setLastReceipt] = useState<Receipt | null>(null);

  const loadProduk = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setProdukList([]);
        return;
      }
      setProdukList(JSON.parse(raw));
    } catch (e) {
      console.error("Gagal membaca localStorage:", e);
    }
  };

  useEffect(() => {
    loadProduk();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setSearchTerm((custom.detail || "").toLowerCase());
    };
    window.addEventListener(SEARCH_EVENT, handler);
    return () => window.removeEventListener(SEARCH_EVENT, handler);
  }, []);

  useEffect(() => {
    if (cart.length === 0 && currentStep !== "success") {
      setCurrentStep("idle");
    }
  }, [cart.length, currentStep]);

  const filteredProdukList = useMemo(() => {
    if (!searchTerm) return produkList;
    return produkList.filter((p) =>
      p.nama_produk.toLowerCase().includes(searchTerm)
    );
  }, [produkList, searchTerm]);

  const isInCart = (id: number) => cart.some((c) => c.id === id);

  const toggleCartItem = (p: Produk) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === p.id);
      if (exist) {
        return prev.filter((item) => item.id !== p.id);
      }
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
        .map((item) => {
          if (item.id !== id) return item;
          const produk = produkList.find((p) => p.id === id);
          const stok = produk?.stok ?? Number.MAX_SAFE_INTEGER;
          const nextQty = Math.min(stok, Math.max(0, item.qty + delta));
          return nextQty === 0 ? null : { ...item, qty: nextQty };
        })
        .filter((item): item is CartItem => Boolean(item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * (item.harga_jual || 0),
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const hasData = filteredProdukList.length > 0;

  const handleProceedToDetail = () => {
    if (cart.length === 0) return;
    setCurrentStep("detail");
  };

  const handleOpenPayment = () => {
    if (cart.length === 0) return;
    setCurrentStep("payment");
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    if (cart.length === 0) return;
    const transaksi: PosTransaksi = {
      id: Date.now(),
      items: cart.map((item) => {
        const produk = produkList.find((p) => p.id === item.id);
        return {
          ...item,
          kategori: produk?.kategori ?? "Tanpa Kategori",
        };
      }),
      subtotal,
      totalItems,
      paymentMethod: method,
      created_at: new Date().toISOString(),
    };
    simpanTransaksiPOS(transaksi);
    cart.forEach((item) => kurangiStokProdukPOS(item.id, item.qty));
    loadProduk();
    setLastReceipt({
      items: transaksi.items.map(({ kategori, ...rest }) => rest),
      subtotal: transaksi.subtotal,
      totalItems: transaksi.totalItems,
      paymentMethod: transaksi.paymentMethod,
    });
    setCurrentStep("success");
    setCart([]);
  };

  const handleResetTransaction = () => {
    setLastReceipt(null);
    setCurrentStep("idle");
  };

  const paymentLabel = (method: PaymentMethod) =>
    method === "tunai" ? "Tunai" : "Transfer/Kredit";

const orderList = (items: CartItem[]) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div
        key={item.id}
          className="flex items-center justify-between text-sm text-zinc-800"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-100">
              <Image
                src={
                  produkList.find((p) => p.id === item.id)?.gambar_base64 ||
                  "/assets/image/ubi-ungu.jpg"
                }
                alt={item.nama_produk}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold leading-5">{item.nama_produk}</p>
              <p className="text-xs text-zinc-500">
                {formatCurrency(item.harga_jual)} × {item.qty}
              </p>
            </div>
          </div>
          <p className="font-semibold">
            {formatCurrency(item.harga_jual * item.qty)}
          </p>
        </div>
      ))}
  </div>
);

function simpanTransaksiPOS(transaksi: PosTransaksi) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(POS_TRANSAKSI_KEY);
    const list = raw ? (JSON.parse(raw) as PosTransaksi[]) : [];
    list.push(transaksi);
    localStorage.setItem(POS_TRANSAKSI_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Gagal menyimpan transaksi POS:", err);
  }
}

  return (
    <div className="w-full space-y-4 pb-32">
      {!hasData && (
        <p className="text-sm text-zinc-500 mb-3">
          Belum ada produk tersimpan. Tambahkan produk di halaman input.
        </p>
      )}

      {hasData && filteredProdukList.length === 0 && (
        <p className="text-sm text-zinc-500 mb-3">
          Produk tidak ditemukan. Coba kata kunci lain.
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {filteredProdukList.map((p) => (
          <label key={p.id} htmlFor={`produk-${p.id}`} className="block">
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
                bg-white border border-transparent peer-checked:border-amber-500
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
                  {formatCurrency(p.harga_jual)}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-25 left-0 right-0 px-3 z-20">
          <div className="bg-[#FFCA40] rounded-3xl p-3 space-y-3 shadow-lg">
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg px-3 py-2 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-700"
                    >
                      x
                    </button>
                    <span className="font-medium text-zinc-800">
                      {item.nama_produk}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-700"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-zinc-800 text-xs">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-700">{totalItems} Item</p>
                <p className="text-xl font-semibold text-zinc-900">
                  {formatCurrency(subtotal)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleProceedToDetail}
                className="bg-zinc-900 text-white rounded-full px-6 py-2 text-sm font-semibold"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === "detail" && cart.length > 0 && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center z-30 px-3 pb-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm text-zinc-700">Rincian Pesanan</p>
              <button
                type="button"
                onClick={() => setCurrentStep("idle")}
                className="text-sm text-zinc-500"
              >
                Tutup
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg px-3 py-2 flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-semibold text-zinc-800">
                      {item.nama_produk}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatCurrency(item.harga_jual)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-700"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-zinc-800 text-xs">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 text-xs text-zinc-700"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-xs text-red-500"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-zinc-800">
              <span>{totalItems} Item</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <button
              type="button"
              onClick={handleOpenPayment}
              className="w-full bg-[#FFCA40] rounded-xl border border-zinc-900 py-3 font-semibold text-sm"
            >
              Bayar
            </button>
          </div>
        </div>
      )}

      {currentStep === "payment" && cart.length > 0 && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-40 px-3 pb-6">
          <div className="w-full max-w-sm space-y-4">
            <div className="bg-white rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Rincian Pesanan</p>
                <button
                  type="button"
                  onClick={() => setCurrentStep("detail")}
                  className="text-sm text-zinc-500"
                >
                  Kembali
                </button>
              </div>
              {orderList(cart)}
              <div className="flex items-center justify-between text-sm font-semibold text-zinc-800 pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-4 space-y-3">
              <p className="text-sm font-semibold text-center">
                Metode Pembayaran
              </p>
              <button
                type="button"
                onClick={() => handleSelectPayment("tunai")}
                className="w-full border rounded-xl py-3 px-4 text-left text-sm font-semibold text-zinc-800"
              >
                Tunai
              </button>
              <button
                type="button"
                onClick={() => handleSelectPayment("transfer")}
                className="w-full border rounded-xl py-3 px-4 text-left text-sm font-semibold text-zinc-800"
              >
                Transfer/Kredit
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === "success" && lastReceipt && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 text-sm text-zinc-700">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl text-green-600">
              ✓
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-zinc-800">Detail Transaksi</p>
              <p className="text-xs text-zinc-500">Transaksi POS Berhasil</p>
            </div>
            {orderList(lastReceipt.items)}
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(lastReceipt.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Metode Pembayaran</span>
                <span>{paymentLabel(lastReceipt.paymentMethod)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-zinc-900">
                <span>Total Bayar</span>
                <span>{formatCurrency(lastReceipt.subtotal)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetTransaction}
              className="w-full bg-[#FFCA40] border border-zinc-900 rounded-xl py-3 font-semibold"
            >
              Transaksi Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
