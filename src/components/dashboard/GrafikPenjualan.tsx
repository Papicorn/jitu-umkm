"use client";

import { useEffect, useMemo, useState } from "react";
import { ambilSemuaTitipan, TitipanEntry } from "@/lib/konsinyasiStorage";

type PosTransaksi = {
  subtotal: number;
  created_at: string;
};

const POS_TRANSAKSI_KEY = "jitu_pos_transactions";

export default function GrafikPenjualanDashboard() {
  const [posData, setPosData] = useState<PosTransaksi[]>([]);
  const [titipanSelesai, setTitipanSelesai] = useState<TitipanEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(POS_TRANSAKSI_KEY);
      const list = raw ? (JSON.parse(raw) as PosTransaksi[]) : [];
      setPosData(list);
    } catch (err) {
      console.error("Gagal baca transaksi POS:", err);
    }
    try {
      const titipan = ambilSemuaTitipan().filter((t) => t.status === "selesai");
      setTitipanSelesai(titipan);
    } catch (err) {
      console.error("Gagal baca titipan:", err);
    }
  }, []);

  const perBulan = useMemo(() => {
    const agg: Record<string, { pemasukan: number; pengeluaran: number }> = {};

    posData.forEach((trx) => {
      const label = new Date(trx.created_at).toLocaleString("id-ID", { month: "short" });
      if (!agg[label]) agg[label] = { pemasukan: 0, pengeluaran: 0 };
      agg[label].pemasukan += trx.subtotal || 0;
    });

    titipanSelesai.forEach((t) => {
      const label = new Date(t.updated_at || t.created_at).toLocaleString("id-ID", { month: "short" });
      if (!agg[label]) agg[label] = { pemasukan: 0, pengeluaran: 0 };
      agg[label].pemasukan += t.netRevenue ?? 0;
      agg[label].pengeluaran += t.komisiAmount ?? 0;
    });

    return Object.entries(agg);
  }, [posData, titipanSelesai]);

  if (perBulan.length === 0) {
    return (
      <div className="w-full">
        <p className="text-lg font-bold text-zinc-700 mb-1">Grafik Penjualan</p>
        <div className="w-full text-zinc-500 text-center bg-white py-10 rounded-lg shadow-sm">
          Belum ada data penjualan.
        </div>
      </div>
    );
  }

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
  const ordered = monthOrder
    .map((label) => {
      const found = perBulan.find(([l]) => l.toLowerCase() === label.toLowerCase());
      return {
        label,
        pemasukan: found ? found[1].pemasukan : 0,
        pengeluaran: found ? found[1].pengeluaran : 0,
      };
    })
    .filter((item) => item.pemasukan > 0 || item.pengeluaran > 0);

  const max = Math.max(
    ...ordered.map((v) => Math.max(v.pemasukan, v.pengeluaran)),
    1
  );

  const chartWidth = 320;
  const chartHeight = 200;
  const paddingLeft = 60;
  const paddingBottom = 32;
  const barAreaWidth = chartWidth - paddingLeft - 20;
  const barWidth = ordered.length
    ? Math.max(18, Math.min(32, (barAreaWidth / ordered.length) * 0.45))
    : 20;
  const ticks = 5;
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round((max / ticks) * i));

  return (
    <div className="w-full">
      <p className="text-lg font-bold text-zinc-700 mb-1">Grafik Penjualan</p>
      <div className="bg-white rounded-xl shadow-sm p-3">
        {ordered.length === 0 ? (
          <div className="text-zinc-500 text-sm text-center py-10">Belum ada data penjualan.</div>
        ) : (
          <>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
              {tickValues.map((val, idx) => {
                const y = chartHeight - paddingBottom - (val / max) * (chartHeight - paddingBottom - 10);
                return (
                  <g key={idx}>
                    <line x1={paddingLeft} x2={chartWidth - 10} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#6b7280">
                      {val.toLocaleString("id-ID")}
                    </text>
                  </g>
                );
              })}

              {ordered.map((item, idx) => {
                const slot = barAreaWidth / ordered.length;
                const x = paddingLeft + idx * slot + (slot - barWidth * 2 - 6) / 2;
                const areaHeight = chartHeight - paddingBottom - 10;
                const hPemasukan = (item.pemasukan / max) * areaHeight;
                const hPengeluaran = (item.pengeluaran / max) * areaHeight;
                return (
                  <g key={item.label}>
                    <rect
                      x={x}
                      y={chartHeight - paddingBottom - hPemasukan}
                      width={barWidth}
                      height={hPemasukan}
                      rx="4"
                      fill="#2fb5bf"
                    />
                    <rect
                      x={x + barWidth + 6}
                      y={chartHeight - paddingBottom - hPengeluaran}
                      width={barWidth}
                      height={hPengeluaran}
                      rx="4"
                      fill="#f5c04f"
                    />
                    <text
                      x={x + barWidth}
                      y={chartHeight - paddingBottom + 14}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#6b7280"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-[#2fb5bf]" />
                Pemasukan
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-[#f5c04f]" />
                Pengeluaran
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
