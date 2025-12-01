"use client";

import { useEffect, useMemo, useState } from "react";

type PosTransaksi = {
  id: number;
  items: { qty: number }[];
  subtotal: number;
  totalItems: number;
  created_at: string;
};

const POS_TRANSAKSI_KEY = "jitu_pos_transactions";
const formatRupiah = (n: number) => `Rp${Number(n || 0).toLocaleString("id-ID")}`;

export default function RecentTransaction() {
  const [dataHariIni, setDataHariIni] = useState<PosTransaksi[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(POS_TRANSAKSI_KEY);
      const list = raw ? (JSON.parse(raw) as PosTransaksi[]) : [];
      const hariIni = list.filter((trx) => {
        const t = new Date(trx.created_at);
        const now = new Date();
        return (
          t.getFullYear() === now.getFullYear() &&
          t.getMonth() === now.getMonth() &&
          t.getDate() === now.getDate()
        );
      });
      setDataHariIni(hariIni);
    } catch (err) {
      console.error("Gagal baca transaksi POS:", err);
    }
  }, []);

  const ringkasan = useMemo(() => {
    const penjualan = dataHariIni.reduce((sum, trx) => sum + (trx.subtotal || 0), 0);
    const produkTerjual = dataHariIni.reduce((sum, trx) => sum + (trx.totalItems || 0), 0);
    return { penjualan, produkTerjual };
  }, [dataHariIni]);

  return (
    <div className="w-full">
      <p className="text-lg font-bold text-zinc-700 mb-1">Transaksi Hari ini</p>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-lg text-center py-3 shadow-sm">
          <p className="mb-2 text-zinc-700 text-sm">Penjualan</p>
          <p className="mb-0 text-zinc-700 font-bold text-lg">{formatRupiah(ringkasan.penjualan)}</p>
        </div>
        <div className="bg-white rounded-lg text-center py-3 shadow-sm">
          <p className="mb-2 text-zinc-700 text-sm">Produk Terjual</p>
          <p className="mb-0 text-zinc-700 font-bold text-lg">{ringkasan.produkTerjual}</p>
        </div>
      </div>
    </div>
  );
}