"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  getStoreById,
  getTitipanByStore,
  TitipanEntry,
  updateStore,
  updateTitipanStatus,
} from "@/lib/konsinyasiStorage";

type Props = {
  storeId?: string;
};

export default function DetailTokoKon({ storeId }: Props) {
  const searchParams = useSearchParams();
  const resolvedStoreId = storeId ?? searchParams.get("id") ?? undefined;

  const [formState, setFormState] = useState({
    nama_toko: "",
    lokasi_toko: "",
    pemilik: "",
    kontak: "",
    komisi_nominal: "",
    komisi_persen: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [titipanList, setTitipanList] = useState<TitipanEntry[]>([]);
  const [notFound, setNotFound] = useState(false);

  const refreshData = (targetId?: string) => {
    if (!targetId) {
      setNotFound(true);
      return;
    }
    const store = getStoreById(targetId);
    if (!store) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setFormState({
      nama_toko: store.nama_toko,
      lokasi_toko: store.lokasi_toko,
      pemilik: store.pemilik,
      kontak: store.kontak,
      komisi_nominal: store.komisi_nominal != null ? String(store.komisi_nominal) : "",
      komisi_persen: store.komisi_persen != null ? String(store.komisi_persen) : "",
    });
    setTitipanList(getTitipanByStore(targetId));
  };

  useEffect(() => {
    refreshData(resolvedStoreId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedStoreId]);

  const activeTitipan = useMemo(
    () => titipanList.filter((item) => item.status === "aktif"),
    [titipanList]
  );
  const selesaiTitipan = useMemo(
    () => titipanList.filter((item) => item.status === "selesai"),
    [titipanList]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resolvedStoreId) return;
    setIsSaving(true);

    try {
      updateStore(resolvedStoreId, {
        nama_toko: formState.nama_toko.trim(),
        lokasi_toko: formState.lokasi_toko,
        pemilik: formState.pemilik,
        kontak: formState.kontak,
        komisi_nominal: formState.komisi_nominal
          ? Number(formState.komisi_nominal)
          : null,
        komisi_persen: formState.komisi_persen
          ? Number(formState.komisi_persen)
          : null,
      });
      alert("✅ Data toko diperbarui.");
      refreshData(resolvedStoreId);
    } catch (err) {
      console.error("Gagal memperbarui data toko:", err);
      alert("❌ Tidak bisa menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkSelesai = (id: string) => {
    if (!resolvedStoreId) return;
    updateTitipanStatus(id, "selesai");
    setTitipanList(getTitipanByStore(resolvedStoreId));
  };

  if (notFound) {
    return (
      <div className="bg-white text-sm text-center p-4 rounded-lg shadow-sm">
        <p className="text-red-500 mb-2">Toko tidak ditemukan.</p>
        <Link href="/produk/konsinyasi" className="text-blue-500 underline">
          Kembali ke daftar toko
        </Link>
      </div>
    );
  }

  const titipUrl = resolvedStoreId
    ? `/produk/konsinyasi/toko/titip?id=${resolvedStoreId}`
    : "/produk/konsinyasi";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col text-zinc-700 space-y-3">
        <label htmlFor="nama_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input
              type="text"
              name="nama_toko"
              id="nama_toko"
              className="outline-0 w-full text-sm"
              placeholder="Masukkan nama toko"
              value={formState.nama_toko}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <label htmlFor="lokasi_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Lokasi Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <textarea
              name="lokasi_toko"
              id="lokasi_toko"
              className="text-sm w-full outline-0"
              rows={4}
              placeholder="Masukkan Lokasi Toko"
              value={formState.lokasi_toko}
              onChange={handleChange}
            ></textarea>
          </div>
        </label>

        <label htmlFor="pemilik" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Pemilik</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input
              type="text"
              name="pemilik"
              id="pemilik"
              className="outline-0 w-full text-sm"
              placeholder="Masukkan Nama Pemilik Toko"
              value={formState.pemilik}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <label htmlFor="kontak" className="flex flex-col space-y-1">
          <span className="text-sm">Kontak</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input
              type="text"
              name="kontak"
              id="kontak"
              className="outline-0 w-full text-sm"
              placeholder="Masukkan Kontak"
              value={formState.kontak}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <label htmlFor="komisi_nominal" className="flex flex-col space-y-1">
          <span className="text-sm">Komisi (Pilih salah satu)</span>
          <div className="grid grid-cols-2 gap-7">
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
              <p className="text-sm">Rp</p>
              <input
                type="number"
                name="komisi_nominal"
                id="komisi_nominal"
                className="outline-0 w-full text-sm text-center"
                placeholder="2500"
                min="0"
                step="1"
                value={formState.komisi_nominal}
                onChange={handleChange}
              />
            </div>
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
              <input
                type="number"
                name="komisi_persen"
                id="komisi_persen"
                className="outline-0 w-full text-sm text-center"
                placeholder="10"
                min="0"
                step="1"
                value={formState.komisi_persen}
                onChange={handleChange}
              />
              <p className="text-sm">%</p>
            </div>
          </div>
        </label>

        <div className="flex flex-col space-y-4">
          {resolvedStoreId && (
            <Link href={titipUrl}>
              <div className="bg-[#FFCA40] rounded-lg text-sm shadow-sm p-3 text-center">
                <p>Titip Barang Baru +</p>
              </div>
            </Link>
          )}

          <div className="bg-white p-3 text-sm rounded-lg shadow-sm space-y-3">
            <p className="text-green-500 font-semibold text-center">Aktif</p>
            {activeTitipan.length === 0 ? (
              <p className="text-zinc-400 text-center">Tidak Ada Data</p>
            ) : (
              activeTitipan.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 text-xs flex flex-col space-y-1"
                >
                  <p className="font-semibold text-zinc-700">{item.produkNama}</p>
                  <p>Jumlah : {item.stokTitip}</p>
                  <p>Estimasi : {item.estimasi}</p>
                  <button
                    type="button"
                    onClick={() => handleMarkSelesai(item.id)}
                    className="mt-2 text-[11px] text-white bg-green-500 rounded py-1"
                  >
                    Tandai selesai
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-3 text-sm rounded-lg shadow-sm space-y-3">
            <p className="text-red-500 font-semibold text-center">Selesai</p>
            {selesaiTitipan.length === 0 ? (
              <p className="text-zinc-400 text-center">Tidak Ada Data</p>
            ) : (
              selesaiTitipan.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 text-xs space-y-1">
                  <p className="font-semibold text-zinc-700">{item.produkNama}</p>
                  <p>Jumlah : {item.stokTitip}</p>
                  <p>Estimasi : {item.estimasi}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href="/produk/konsinyasi" className="w-full">
            <button
              type="button"
              className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
