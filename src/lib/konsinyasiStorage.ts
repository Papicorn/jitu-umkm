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
  created_at: string;
  updated_at: string;
};

const STORES_KEY = "jitu_consignment_stores";
const TITIPAN_KEY = "jitu_consignment_titipan";

const isBrowser = typeof window !== "undefined";

function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error("Gagal parse localStorage:", err);
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function getStores(): KonsinyasiStore[] {
  return readStorage<KonsinyasiStore[]>(STORES_KEY, []);
}

export function getStoreById(id?: string | null): KonsinyasiStore | null {
  if (!id) return null;
  const stores = getStores();
  return stores.find((item) => item.id === id) || null;
}

export type AddStorePayload = {
  nama_toko: string;
  lokasi_toko: string;
  pemilik: string;
  kontak: string;
  komisi_nominal?: number | null;
  komisi_persen?: number | null;
};

export function addStore(payload: AddStorePayload): KonsinyasiStore {
  const now = new Date().toISOString();
  const newStore: KonsinyasiStore = {
    id: createId(),
    created_at: now,
    updated_at: now,
    ...payload,
    komisi_nominal: payload.komisi_nominal ?? null,
    komisi_persen: payload.komisi_persen ?? null,
  };

  const stores = getStores();
  stores.push(newStore);
  writeStorage(STORES_KEY, stores);
  return newStore;
}

export function updateStore(id: string, payload: Partial<AddStorePayload>): KonsinyasiStore | null {
  const stores = getStores();
  const idx = stores.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  const now = new Date().toISOString();
  const updated: KonsinyasiStore = {
    ...stores[idx],
    ...payload,
    komisi_nominal:
      payload.komisi_nominal !== undefined ? payload.komisi_nominal : stores[idx].komisi_nominal,
    komisi_persen:
      payload.komisi_persen !== undefined ? payload.komisi_persen : stores[idx].komisi_persen,
    updated_at: now,
  };
  stores[idx] = updated;
  writeStorage(STORES_KEY, stores);
  return updated;
}

export function getTitipan(): TitipanEntry[] {
  return readStorage<TitipanEntry[]>(TITIPAN_KEY, []);
}

export function getTitipanByStore(storeId?: string | null): TitipanEntry[] {
  if (!storeId) return [];
  return getTitipan().filter((item) => item.storeId === storeId);
}

export type AddTitipanPayload = {
  storeId: string;
  produkId?: string | number | null;
  produkNama: string;
  kategori?: string | null;
  satuan?: string | null;
  hargaJual?: number | null;
  stokTitip: number;
  estimasi: string;
};

export function addTitipan(payload: AddTitipanPayload): TitipanEntry {
  const now = new Date().toISOString();
  const entry: TitipanEntry = {
    id: createId(),
    status: "aktif",
    created_at: now,
    updated_at: now,
    ...payload,
  };
  const list = getTitipan();
  list.push(entry);
  writeStorage(TITIPAN_KEY, list);
  return entry;
}

export function updateTitipanStatus(id: string, status: TitipanStatus): TitipanEntry | null {
  const list = getTitipan();
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  const updated: TitipanEntry = {
    ...list[idx],
    status,
    updated_at: new Date().toISOString(),
  };
  list[idx] = updated;
  writeStorage(TITIPAN_KEY, list);
  return updated;
}
