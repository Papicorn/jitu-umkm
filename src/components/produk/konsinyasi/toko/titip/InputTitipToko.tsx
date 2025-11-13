"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function InputTitipToko() {
  

  return (
    <div className="w-full">
      <form className="flex flex-col text-zinc-700 space-y-3">

        <label htmlFor="kategori" className="flex flex-col space-y-1">
          <span className="text-sm">Pilih Produk</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <select className="outline-0 w-full text-sm text-zinc-700" id="kategori" name="kategori" defaultValue="">
              <option value="" disabled>-- Tekan Untuk Memilih Produk --</option>
              <option value="makanan" selected>Keripik Ubi (Stok : 13 Pcs) | Rp35.000</option>
              <option value="makanan">Keripik Pisang (Stok : 35 Pcs) | Rp35.000</option>
              <option value="makanan">Keripik Ubi (Stok : 12 Pcs) | Rp18.000</option>
              <option value="makanan">Susu Mineral (Stok : 25 Botol) | Rp12.000</option>
            </select>
          </div>
        </label>

        <label htmlFor="detail_produk" className="flex flex-col space-y-1">
          <span className="text-sm">Detail Produk</span>
          <div className="bg-white border text-sm py-3 px-3 rounded-lg shadow-sm">
            <p>Nama Produk : <b>Keripik Ubi</b></p>
            <p>Kategori : <b>Makanan</b></p>
            <p>Satuan : <b>Pcs</b></p>
            <p>Harga Jual : <b>Rp35.000</b></p>
            <p>Stok Tersedia : <b>20</b></p>
          </div>
        </label>

        {/* Stok Jual */}
        <label htmlFor="stok_jual" className="flex flex-col space-y-1">
          <span className="text-sm">Stok Dijual</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="number" name="stok_jual" id="stok_jual" className="outline-0 w-full text-sm" placeholder="0" required />
          </div>
        </label>

        {/* Estimasi */}
        <label htmlFor="estimasi" className="flex flex-col space-y-1">
          <span className="text-sm">Estimasi</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input type="date" name="estimasi" id="estimasi" className="outline-0 w-full text-sm" placeholder="13/11/2025" required />
          </div>
        </label>

        <p className="text-xs text-red-400">Pastikan produk yang dititipkan tersedia sudah sesuai dengan stok tersedia</p>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href="/produk/konsinyasi" className="w-full">
            <button type="button" className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600">
              Batal
            </button>
          </Link>
          <button type="submit" className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm">
            Titip
          </button>
        </div>
      </form>
    </div>
  );
}
