"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function InputTokoKonTambah() {
  // init DB sekali di mount (optional, sekadar memastikan)
  

  return (
    <div className="w-full">
      {/* PENTING: bungkus semua input dalam <form> dan pakai onSubmit */}
      <form className="flex flex-col text-zinc-700 space-y-3">

        {/* Nama Produk */}
        <label htmlFor="nama_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="nama_toko" id="nama_toko" className="outline-0 w-full text-sm" placeholder="Masukkan nama toko" required />
          </div>
        </label>

        {/* Deskripsi */}
        <label htmlFor="lokasi_toko" className="flex flex-col space-y-1">
          <span className="text-sm">Lokasi Toko</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <textarea name="lokasi_toko" id="lokasi_toko" className="text-sm w-full outline-0" rows={4} placeholder="Masukkan Lokasi Toko"></textarea>
          </div>
        </label>

        {/* Pemilik */}
        <label htmlFor="pemilik" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Pemilik</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="pemilik" id="pemilik" className="outline-0 w-full text-sm" placeholder="Masukkan Nama Pemilik Toko" required />
          </div>
        </label>

        {/* Kontak */}
        <label htmlFor="kontak" className="flex flex-col space-y-1">
          <span className="text-sm">Kontak</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="text" name="kontak" id="kontak" className="outline-0 w-full text-sm" placeholder="Masukkan Kontak" required />
          </div>
        </label>

        {/* Komisi */}
        <label htmlFor="harga_modal" className="flex flex-col space-y-1">
          <span className="text-sm">Komisi (Pilih salah satu)</span>
          <div className="grid grid-cols-2 gap-7">
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                <p className="text-sm">Rp</p>
                <input type="number" name="harga_modal" id="harga_modal" className="outline-0 w-full text-sm text-center" placeholder="2500" min="0" step="1" />
            </div>
            <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                <input type="number" name="harga_modal" id="harga_modal" className="outline-0 w-full text-sm text-center" placeholder="10" min="0" step="1" />
                <p className="text-sm">%</p>
            </div>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href="/produk/konsinyasi" className="w-full">
            <button type="button" className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600">
              Batal
            </button>
          </Link>
          <button type="submit" className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
