"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

interface Produk {
  id: number;
  nama_produk: string;
  deskripsi?: string;
  kategori?: string;
  satuan?: string;
  harga_modal?: number;
  harga_jual: number;
  stok: number;
  gambar_base64?: string | null;
}

const STORAGE_KEY = "jitu_products";

export default function ProdukProdukPOS() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produk | null>(null);
  const [formState, setFormState] = useState<Produk | null>(null);

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

  const handleCardClick = (produk: Produk) => {
    setSelectedProduct(produk);
    setFormState({ ...produk });
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setFormState(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formState) return;
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]:
        name === "harga_jual" ||
        name === "harga_modal" ||
        name === "stok"
          ? Number(value)
          : value,
    });
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState) return;
    const updatedList = produkList.map((item) =>
      item.id === formState.id ? { ...item, ...formState } : item
    );
    setProdukList(updatedList);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    }
    closeModal();
  };

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
            <button
              key={p.id}
              type="button"
              onClick={() => handleCardClick(p)}
              className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  Rp{Number(p.harga_jual || 0).toLocaleString("id-ID")}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="text-sm text-center text-zinc-400 col-span-3 py-4">
            Tidak ada produk.
          </div>
        )}
      </div>

      {selectedProduct && formState && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-40 px-3 pb-6">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 text-sm text-zinc-700">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-base">Detail Produk</p>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-zinc-500"
              >
                Tutup
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-zinc-100">
                <Image
                  src={selectedProduct.gambar_base64 || "/assets/image/ubi-ungu.jpg"}
                  alt={selectedProduct.nama_produk}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-zinc-600 space-y-1">
                <p className="font-semibold text-zinc-800">{selectedProduct.nama_produk}</p>
                <p>Kategori: {selectedProduct.kategori || "-"}</p>
                <p>Satuan: {selectedProduct.satuan || "-"}</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-sm">
              <label className="flex flex-col space-y-1">
                <span>Nama Produk</span>
                <input
                  type="text"
                  name="nama_produk"
                  className="bg-[#F4F7FE] rounded-lg px-3 py-2 outline-0"
                  value={formState.nama_produk}
                  onChange={handleChange}
                />
              </label>

              <label className="flex flex-col space-y-1">
                <span>Deskripsi</span>
                <textarea
                  name="deskripsi"
                  rows={3}
                  className="bg-[#F4F7FE] rounded-lg px-3 py-2 outline-0"
                  value={formState.deskripsi || ""}
                  onChange={handleChange}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col space-y-1">
                  <span>Kategori</span>
                  <input
                    type="text"
                    name="kategori"
                    className="bg-[#F4F7FE] rounded-lg px-3 py-2 outline-0"
                    value={formState.kategori || ""}
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col space-y-1">
                  <span>Satuan</span>
                  <input
                    type="text"
                    name="satuan"
                    className="bg-[#F4F7FE] rounded-lg px-3 py-2 outline-0"
                    value={formState.satuan || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col space-y-1">
                  <span>Harga Jual</span>
                  <div className="bg-[#F4F7FE] rounded-lg px-3 py-2 flex items-center">
                    <span className="text-xs mr-1">Rp</span>
                    <input
                      type="number"
                      min={0}
                      name="harga_jual"
                      className="flex-1 bg-transparent outline-0 text-right"
                      value={formState.harga_jual}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <label className="flex flex-col space-y-1">
                  <span>HPP</span>
                  <div className="bg-[#F4F7FE] rounded-lg px-3 py-2 flex items-center">
                    <span className="text-xs mr-1">Rp</span>
                    <input
                      type="number"
                      min={0}
                      name="harga_modal"
                      className="flex-1 bg-transparent outline-0 text-right"
                      value={formState.harga_modal || 0}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>

              <label className="flex flex-col space-y-1">
                <span>Stok</span>
                <input
                  type="number"
                  min={0}
                  name="stok"
                  className="bg-[#F4F7FE] rounded-lg px-3 py-2 outline-0"
                  value={formState.stok}
                  onChange={handleChange}
                />
              </label>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-red-500 text-red-500 rounded-lg py-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#FFCA40] border border-zinc-900 rounded-lg py-2 font-semibold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
