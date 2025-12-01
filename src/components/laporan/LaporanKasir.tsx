"use client";

import { useEffect, useMemo, useState } from "react";
import { ambilSemuaTitipan, ambilTokoById, TitipanEntry } from "@/lib/konsinyasiStorage";

type TabLaporan = "keuangan" | "penjualan";
type ModeLaporan = "kasir" | "konsinyasi";
type TransaksiPOS = {
  id: number;
  items: { id: number; nama_produk: string; harga_jual: number; qty: number; kategori?: string }[];
  subtotal: number;
  totalItems: number;
  paymentMethod: string;
  created_at: string;
};

type RingkasanKeuangan = {
  pendapatan: number;
  pengeluaran: number;
  keuntungan: number;
  kerugian: number;
};

type RingkasanPenjualan = {
  transaksi: number;
  produkTerjual: number;
};

const formatRupiah = (nilai: number) => `Rp${Number(nilai || 0).toLocaleString("id-ID")}`;

function gunakanTitipanSelesai(titipan: TitipanEntry[]) {
  return titipan.filter((item) => item.status === "selesai");
}

function pakaiKategori(t: TitipanEntry) {
  return t.kategori?.trim() || "Tanpa Kategori";
}

function bacaTransaksiPOS(): TransaksiPOS[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("jitu_pos_transactions");
    return raw ? (JSON.parse(raw) as TransaksiPOS[]) : [];
  } catch (err) {
    console.error("Gagal membaca transaksi POS:", err);
    return [];
  }
}

export default function LaporanKasir({ mode = "kasir" }: { mode?: ModeLaporan }) {
  const [tabAktif, setTabAktif] = useState<TabLaporan>("keuangan");
  const [titipan, setTitipan] = useState<TitipanEntry[]>([]);
  const [transaksiPOS, setTransaksiPOS] = useState<TransaksiPOS[]>([]);
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");

  useEffect(() => {
    if (mode === "konsinyasi") {
      setTitipan(ambilSemuaTitipan());
    } else {
      setTransaksiPOS(bacaTransaksiPOS());
    }
  }, [mode]);

  const titipanSelesai = useMemo(() => gunakanTitipanSelesai(titipan), [titipan]);

  const dalamRentang = (tanggalIso?: string) => {
    if (!tanggalIso) return true;
    const ts = new Date(tanggalIso).getTime();
    if (Number.isNaN(ts)) return true;
    const tsMulai = mulai ? new Date(mulai).getTime() : null;
    const tsSelesai = selesai ? new Date(`${selesai}T23:59:59`).getTime() : null;
    if (tsMulai && ts < tsMulai) return false;
    if (tsSelesai && ts > tsSelesai) return false;
    return true;
  };

  const dataTransaksiKasir = useMemo(() => {
    if (mode !== "kasir") return [];
    return transaksiPOS.filter((trx) => dalamRentang(trx.created_at));
  }, [mode, transaksiPOS, mulai, selesai]);

  const titipanTerfilter = useMemo(() => {
    if (mode !== "konsinyasi") return [];
    return titipanSelesai.filter((t) => dalamRentang(t.updated_at || t.created_at));
  }, [mode, titipanSelesai, mulai, selesai]);

  const ringkasanKeuangan: RingkasanKeuangan = useMemo(() => {
    if (mode === "kasir") {
      const pendapatan = dataTransaksiKasir.reduce((sum, trx) => sum + (trx.subtotal || 0), 0);
      const pengeluaran = 0;
      const keuntungan = pendapatan;
      const kerugian = 0;
      return { pendapatan, pengeluaran, keuntungan, kerugian };
    }
    const pendapatan = titipanTerfilter.reduce((sum, item) => sum + (item.grossRevenue ?? 0), 0);
    const pengeluaran = titipanTerfilter.reduce((sum, item) => sum + (item.komisiAmount ?? 0), 0);
    const keuntungan = titipanTerfilter.reduce(
      (sum, item) =>
        sum +
        (item.netRevenue ?? Math.max(0, (item.grossRevenue ?? 0) - (item.komisiAmount ?? 0))),
      0
    );
    const kerugian = titipanTerfilter.reduce((sum, item) => {
      const sisa = item.remainingStock ?? 0;
      const harga = item.hargaJual ?? 0;
      return sum + Math.max(0, sisa * harga);
    }, 0);
    return { pendapatan, pengeluaran, keuntungan, kerugian };
  }, [titipanTerfilter, dataTransaksiKasir, mode]);

  const ringkasanPenjualan: RingkasanPenjualan = useMemo(() => {
    if (mode === "kasir") {
      const produkTerjual = dataTransaksiKasir.reduce(
        (sum, trx) => sum + (trx.totalItems ?? 0),
        0
      );
      return { transaksi: dataTransaksiKasir.length, produkTerjual };
    }
    const produkTerjual = titipanTerfilter.reduce((sum, item) => sum + (item.soldQuantity ?? 0), 0);
    return { transaksi: titipanTerfilter.length, produkTerjual };
  }, [titipanTerfilter, dataTransaksiKasir, mode]);

  const grafikBulan = useMemo(() => {
    const perBulan: Record<string, { pemasukan: number; pengeluaran: number }> = {};
    if (mode === "kasir") {
      dataTransaksiKasir.forEach((trx) => {
        const label = new Date(trx.created_at).toLocaleString("id-ID", { month: "short" });
        if (!perBulan[label]) perBulan[label] = { pemasukan: 0, pengeluaran: 0 };
        perBulan[label].pemasukan += trx.subtotal ?? 0;
      });
    } else {
      titipanTerfilter.forEach((item) => {
        const label = new Date(item.updated_at || item.created_at).toLocaleString("id-ID", { month: "short" });
        if (!perBulan[label]) perBulan[label] = { pemasukan: 0, pengeluaran: 0 };
        perBulan[label].pemasukan += item.netRevenue ?? 0;
        perBulan[label].pengeluaran += item.komisiAmount ?? 0;
      });
    }
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return monthOrder
      .map((label) => {
        const found = perBulan[label];
        return found ? { label, ...found } : null;
      })
      .filter((v): v is { label: string; pemasukan: number; pengeluaran: number } => Boolean(v));
  }, [titipanTerfilter, dataTransaksiKasir, mode]);

  const grafikKategori = useMemo(() => {
    const hasil: Record<string, number> = {};
    if (mode === "kasir") {
      dataTransaksiKasir.forEach((trx) => {
        trx.items.forEach((itm) => {
          const key = itm.kategori?.trim() || "Tanpa Kategori";
          hasil[key] = (hasil[key] || 0) + (itm.qty ?? 0);
        });
      });
    } else {
      titipanTerfilter.forEach((item) => {
        const key = ambilTokoById(item.storeId)?.nama_toko || "Tanpa Toko";
        hasil[key] = (hasil[key] || 0) + (item.soldQuantity ?? 0);
      });
    }
    return Object.entries(hasil);
  }, [titipanTerfilter, dataTransaksiKasir, mode]);

  const listRingkasanKategori = useMemo(() => {
    const hasil: Record<string, number> = {};
    if (mode === "kasir") {
      dataTransaksiKasir.forEach((trx) => {
        trx.items.forEach((itm) => {
          const key = itm.kategori?.trim() || "Tanpa Kategori";
          const jumlah = tabAktif === "keuangan" ? (itm.qty ?? 0) * (itm.harga_jual ?? 0) : itm.qty ?? 0;
          hasil[key] = (hasil[key] || 0) + jumlah;
        });
      });
    } else {
      titipanTerfilter.forEach((item) => {
        const key = ambilTokoById(item.storeId)?.nama_toko || "Tanpa Toko";
        const jumlah = tabAktif === "keuangan" ? item.netRevenue ?? 0 : item.soldQuantity ?? 0;
        hasil[key] = (hasil[key] || 0) + jumlah;
      });
    }
    return Object.entries(hasil);
  }, [titipanTerfilter, dataTransaksiKasir, tabAktif, mode]);

  const adaData = mode === "kasir" ? dataTransaksiKasir.length > 0 : titipanTerfilter.length > 0;

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="rounded-2xl space-y-3">
        <div className="grid grid-cols-2 bg-white rounded-lg p-1 text-sm font-semibold shadow-[inset_0_1px_6px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            onClick={() => setTabAktif("keuangan")}
            className={`py-2 rounded-lg transition ${
              tabAktif === "keuangan" ? "bg-[#FFCA40] shadow font-semibold text-zinc-700" : "text-zinc-700"
            }`}
          >
            Keuangan
          </button>
          <button
            type="button"
            onClick={() => setTabAktif("penjualan")}
            className={`py-2 rounded-lg transition ${
              tabAktif === "penjualan" ? "bg-[#FFCA40] shadow font-semibold text-zinc-700" : "text-zinc-500"
            }`}
          >
            Penjualan
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-800">Priode</p>
          <div className="bg-white rounded-lg px-3 py-3 flex items-center justify-between text-sm text-zinc-700 shadow-sm border border-zinc-100 gap-2">
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-zinc-500">Mulai</label>
              <input
                type="date"
                value={mulai}
                onChange={(e) => setMulai(e.target.value)}
                className="text-sm text-zinc-700 outline-none"
              />
            </div>
            <span className="text-xs text-zinc-400 mt-5">-</span>
            <div className="flex flex-col w-full">
              <label className="text-[11px] text-zinc-500">Sampai</label>
              <input
                type="date"
                value={selesai}
                onChange={(e) => setSelesai(e.target.value)}
                className="text-sm text-zinc-700 outline-none"
              />
            </div>
            {/* <button
              type="button"
              onClick={() => {
                setMulai("");
                setSelesai("");
              }}
              className="w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center bg-[#F7F8FF] text-xs text-zinc-600"
              title="Reset priode"
            >
            </button> */}
          </div>
        </div>

        {tabAktif === "keuangan" ? (
          <div className="grid grid-cols-2 gap-3">
            <KartuStat judul="Total Pendapatan" nilai={formatRupiah(ringkasanKeuangan.pendapatan)} bold />
            <KartuStat judul="Total Pengeluaran" nilai={formatRupiah(ringkasanKeuangan.pengeluaran)} />
            <KartuStat judul="Total Keuntungan" nilai={formatRupiah(ringkasanKeuangan.keuntungan)} />
            <KartuStat judul="Total Kerugian" nilai={formatRupiah(ringkasanKeuangan.kerugian)} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <KartuStat judul="Jumlah Transaksi" nilai={ringkasanPenjualan.transaksi.toString()} />
            <KartuStat judul="Total Produk Terjual" nilai={ringkasanPenjualan.produkTerjual.toString()} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-3 space-y-3 border border-zinc-100">
          <p className="text-sm font-semibold text-zinc-800">
            {mode === "konsinyasi" ? "Grafik Penjualan Toko" : tabAktif === "keuangan" ? "Grafik Penjualan Toko" : "Grafik Penjualan Kategori"}
          </p>
        {adaData ? (
          tabAktif === "keuangan" ? (
            <GrafikBar data={grafikBulan} />
          ) : (
            <GrafikDonut data={grafikKategori} />
          )
        ) : (
          <p className="text-xs text-zinc-500">
            {mode === "kasir" ? "Belum ada transaksi POS pada rentang ini." : "Belum ada titipan selesai pada rentang ini."}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow border border-zinc-100">
        <div className="border-b px-3 py-2 text-sm font-semibold text-zinc-800 rounded-t-lg">
          Ringkasan
        </div>
        <div className="grid grid-cols-2 text-xs font-semibold text-zinc-500 px-3 py-2 border-b">
          <span>{mode === "konsinyasi" ? "Nama Toko" : "Nama Kategori"}</span>
          <span className="text-right">{tabAktif === "keuangan" ? "Jumlah" : "Produk"}</span>
        </div>
        <div className="divide-y text-sm text-zinc-700">
          {listRingkasanKategori.length === 0 ? (
            <p className="px-3 py-2 text-xs text-zinc-500">Belum ada data.</p>
          ) : (
            listRingkasanKategori.map(([kategori, jumlah]) => (
              <div key={kategori} className="flex items-center justify-between px-3 py-2">
                <span>{kategori}</span>
                <span className="font-semibold">
                  {tabAktif === "keuangan" ? formatRupiah(jumlah) : jumlah}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function KartuStat({ judul, nilai, bold }: { judul: string; nilai: string; bold?: boolean }) {
  return (
    <div className="bg-white border border-zinc-100 shadow-sm rounded-lg p-3 space-y-1">
      <p className="text-xs text-zinc-500">{judul}</p>
      <p className={`text-zinc-800 ${bold ? "font-bold text-base" : "font-semibold"}`}>{nilai}</p>
    </div>
  );
}

function GrafikBar({ data }: { data: { label: string; pemasukan: number; pengeluaran: number }[] }) {
  if (!data.length) {
    return <p className="text-xs text-zinc-500">Belum ada data grafik.</p>;
  }

  const max = Math.max(...data.map((v) => Math.max(v.pemasukan, v.pengeluaran)), 1);
  const chartWidth = 320;
  const chartHeight = 220;
  const paddingLeft = 60;
  const paddingBottom = 34;
  const barAreaWidth = chartWidth - paddingLeft - 20;
  const barWidth = data.length ? Math.max(18, Math.min(32, (barAreaWidth / data.length) * 0.45)) : 20;
  const ticks = 5;
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round((max / ticks) * i));

  return (
    <div className="bg-[#F4F7FE] rounded-xl p-3 border border-zinc-100">
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

        {data.map((item, idx) => {
          const slot = barAreaWidth / data.length;
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
    </div>
  );
}

function GrafikDonut({ data }: { data: [string, number][] }) {
  const total = data.reduce((sum, [, val]) => sum + val, 0) || 1;
  const warna = ["#E57373", "#FFD54F", "#4FC3F7", "#81C784", "#BA68C8", "#FFB74D"];

  if (!data.length) {
    return <p className="text-xs text-zinc-500">Belum ada data grafik.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 42 42" className="w-full h-full">
          <circle cx="21" cy="21" r="15.9155" fill="white" stroke="#e5e7eb" strokeWidth="6" />
          {data.map(([_, value], idx) => {
            const startPercent = data.slice(0, idx).reduce((sum, [, val]) => sum + val, 0) / total;
            const sizePercent = value / total;
            const dashArray = `${sizePercent * 100} ${100 - sizePercent * 100}`;
            const dashOffset = 25 - startPercent * 100;
            return (
              <circle
                key={idx}
                cx="21"
                cy="21"
                r="15.9155"
                fill="transparent"
                stroke={warna[idx % warna.length]}
                strokeWidth="6"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map(([label, value], idx) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: warna[idx % warna.length] }} />
              <span className="text-zinc-700">{label}</span>
            </div>
            <span className="font-semibold text-zinc-800">
              {value} ({Math.round((value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
