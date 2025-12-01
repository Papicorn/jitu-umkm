"use client";

export type KonsinyasiStore = {
  id: string;
  nama_toko: string;
  lokasi_toko: string;
  pemilik: string;
  kontak: string;
  komisi_nominal?: number | null;
  komisi_persen?: number | null;
  created_at: string;
  updated_at: string;
};

export type TitipanStatus = "aktif" | "selesai";

export type TitipanEntry = {
  id: string;
  storeId: string;
  produkId?: string | number | null;
  produkNama: string;
  kategori?: string | null;
  satuan?: string | null;
  hargaJual?: number | null;
  stokTitip: number;
  estimasi: string;
  status: TitipanStatus;
  soldQuantity?: number;
  grossRevenue?: number;
  netRevenue?: number;
  komisiAmount?: number;
  remainingStock?: number;
  created_at: string;
  updated_at: string;
};

type PosProduct = { id: string | number; stok?: number; [key: string]: any };

const KUNCI_TOKO = "jitu_consignment_stores";
const KUNCI_TITIPAN = "jitu_consignment_titipan";
const KUNCI_PRODUK_POS = "jitu_products";
const adaWindow = typeof window !== "undefined";

const penyimpanan = {
  baca<T>(kunci: string, cadangan: T): T {
    if (!adaWindow) return cadangan;
    try {
      const mentah = window.localStorage.getItem(kunci);
      return mentah ? (JSON.parse(mentah) as T) : cadangan;
    } catch (err) {
      console.error("Gagal baca localStorage:", err);
      return cadangan;
    }
  },
  tulis<T>(kunci: string, nilai: T) {
    if (!adaWindow) return;
    window.localStorage.setItem(kunci, JSON.stringify(nilai));
  },
};

const waktuSekarang = () => new Date().toISOString();
const buatId = () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

function ubahItem<T extends { id: string }>(
  kunci: string,
  id: string,
  mutator: (item: T) => T
): T | null {
  const daftar = penyimpanan.baca<T[]>(kunci, []);
  const posisi = daftar.findIndex((item) => item.id === id);
  if (posisi === -1) return null;
  const diperbarui = mutator(daftar[posisi]);
  daftar[posisi] = diperbarui;
  penyimpanan.tulis(kunci, daftar);
  return diperbarui;
}

function tambahItem<T>(kunci: string, item: T): T {
  const daftar = penyimpanan.baca<T[]>(kunci, []);
  daftar.push(item);
  penyimpanan.tulis(kunci, daftar);
  return item;
}

export const ambilSemuaToko = () => penyimpanan.baca<KonsinyasiStore[]>(KUNCI_TOKO, []);
export const ambilTokoById = (id?: string | null) =>
  id ? ambilSemuaToko().find((toko) => toko.id === id) || null : null;

export type TambahTokoPayload = Omit<KonsinyasiStore, "id" | "created_at" | "updated_at">;

export function tambahToko(payload: TambahTokoPayload): KonsinyasiStore {
  const tokoBaru: KonsinyasiStore = {
    ...payload,
    id: buatId(),
    created_at: waktuSekarang(),
    updated_at: waktuSekarang(),
    komisi_nominal: payload.komisi_nominal ?? null,
    komisi_persen: payload.komisi_persen ?? null,
  };
  return tambahItem(KUNCI_TOKO, tokoBaru);
}

export function ubahToko(id: string, payload: Partial<TambahTokoPayload>) {
  return ubahItem<KonsinyasiStore>(KUNCI_TOKO, id, (toko) => ({
    ...toko,
    ...payload,
    komisi_nominal:
      payload.komisi_nominal !== undefined ? payload.komisi_nominal : toko.komisi_nominal ?? null,
    komisi_persen:
      payload.komisi_persen !== undefined ? payload.komisi_persen : toko.komisi_persen ?? null,
    updated_at: waktuSekarang(),
  }));
}

export const ambilSemuaTitipan = () => penyimpanan.baca<TitipanEntry[]>(KUNCI_TITIPAN, []);
export const ambilTitipanPerToko = (storeId?: string | null) =>
  storeId ? ambilSemuaTitipan().filter((titipan) => titipan.storeId === storeId) : [];

export type TambahTitipanPayload = Omit<
  TitipanEntry,
  "id" | "status" | "created_at" | "updated_at"
>;

export function tambahTitipan(payload: TambahTitipanPayload): TitipanEntry {
  const titipanBaru: TitipanEntry = {
    ...payload,
    id: buatId(),
    status: "aktif",
    created_at: waktuSekarang(),
    updated_at: waktuSekarang(),
  };
  return tambahItem(KUNCI_TITIPAN, titipanBaru);
}

export const ubahStatusTitipan = (id: string, status: TitipanStatus) =>
  ubahItem<TitipanEntry>(KUNCI_TITIPAN, id, (titipan) => ({
    ...titipan,
    status,
    updated_at: waktuSekarang(),
  }));

export type SelesaikanTitipanPayload = {
  soldQuantity: number;
  grossRevenue: number;
  netRevenue: number;
  komisiAmount: number;
};

export function selesaikanTitipan(id: string, payload: SelesaikanTitipanPayload) {
  return ubahItem<TitipanEntry>(KUNCI_TITIPAN, id, (titipan) => ({
    ...titipan,
    status: "selesai",
    soldQuantity: payload.soldQuantity,
    grossRevenue: payload.grossRevenue,
    netRevenue: payload.netRevenue,
    komisiAmount: payload.komisiAmount,
    remainingStock: Math.max(0, titipan.stokTitip - payload.soldQuantity),
    updated_at: waktuSekarang(),
  }));
}

export function kurangiStokProdukPOS(produkId?: string | number | null, jumlah = 0) {
  if (!produkId || jumlah <= 0) return;
  const daftarProduk = penyimpanan.baca<PosProduct[]>(KUNCI_PRODUK_POS, []);
  const posisi = daftarProduk.findIndex((produk) => String(produk.id) === String(produkId));
  if (posisi === -1) return;
  const produk = daftarProduk[posisi];
  daftarProduk[posisi] = { ...produk, stok: Math.max(0, Number(produk.stok ?? 0) - jumlah) };
  penyimpanan.tulis(KUNCI_PRODUK_POS, daftarProduk);
}

// alias lama supaya komponen lain tetap jalan jika belum diganti
export const getStores = ambilSemuaToko;
export const getStoreById = ambilTokoById;
export type AddStorePayload = TambahTokoPayload;
export const addStore = tambahToko;
export const updateStore = ubahToko;
export const getTitipan = ambilSemuaTitipan;
export const getTitipanByStore = ambilTitipanPerToko;
export type AddTitipanPayload = TambahTitipanPayload;
export const addTitipan = tambahTitipan;
export const updateTitipanStatus = ubahStatusTitipan;
export type CompleteTitipanPayload = SelesaikanTitipanPayload;
export const completeTitipan = selesaikanTitipan;
export const decreasePosProductStock = kurangiStokProdukPOS;
