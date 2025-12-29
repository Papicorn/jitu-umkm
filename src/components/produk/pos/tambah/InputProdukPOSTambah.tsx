"use client";

import Image from "next/image";
import Link from "next/link";

// key untuk nyimpen data produk di localStorage
const STORAGE_KEY = "jitu_products";

// ambil list produk dari localStorage
function getStoredProducts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// simpan 1 produk ke localStorage (append ke array lama)
function saveProductToLocal(data: any) {
  if (typeof window === "undefined") return;
  const list = getStoredProducts();
  list.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** optional: ubah file gambar ke base64 */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function InputProdukPOSTambah() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const nama_produk = (form.elements.namedItem("nama_produk") as HTMLInputElement)?.value.trim();
    const deskripsi = (form.elements.namedItem("deskripsi") as HTMLTextAreaElement)?.value.trim();
    const kategori = (form.elements.namedItem("kategori") as HTMLSelectElement)?.value;
    const satuan   = (form.elements.namedItem("satuan") as HTMLSelectElement)?.value;
    const harga_modal = Number((form.elements.namedItem("harga_modal") as HTMLInputElement)?.value || 0);
    const harga_jual  = Number((form.elements.namedItem("harga_jual") as HTMLInputElement)?.value || 0);
    const stok        = Number((form.elements.namedItem("stok") as HTMLInputElement)?.value || 0);
    const gambarInput = form.elements.namedItem("gambar") as HTMLInputElement | null;

    // (opsional) simpan gambar sebagai base64 kecil; skip kalau tidak dipilih
    let gambar_base64: string | null = null;
    if (gambarInput?.files && gambarInput.files[0]) {
      const file = gambarInput.files[0];
      if (file.size <= 300 * 1024) {
        gambar_base64 = await toBase64(file);
      }
    }

    if (!nama_produk || !kategori || !satuan) {
      alert("Isi minimal nama, kategori, dan satuan ya.");
      return;
    }

    const data = {
      id: Date.now(), // id sederhana
      nama_produk,
      deskripsi,
      kategori,
      satuan,
      harga_modal,
      harga_jual,
      stok,
      gambar_base64, // bisa null
      created_at: new Date().toISOString(),
    };

    try {
      saveProductToLocal(data);
      alert("✅ Produk tersimpan di data lokal (localStorage)!");
      form.reset();
    } catch (err: any) {
      console.error("Gagal simpan:", err);
      alert("❌ Gagal menyimpan ke data lokal.");
    }
  };

  return (
    <div className="w-full">
      {/* PENTING: bungkus semua input dalam <form> dan pakai onSubmit */}
      <form onSubmit={handleSubmit} className="flex flex-col text-zinc-700 space-y-3">
        {/* GAMBAR PRODUK */}
        <label htmlFor="gambar" className="flex flex-col space-y-1">
          <span className="text-sm">Gambar Produk (Optional)</span>
          <div className="bg-white py-2 px-3 rounded-lg flex items-center shadow-sm">
            <div className="bg-zinc-200 p-6 rounded-lg border border-zinc-400">
              <div className="w-6 h-6 relative">
                <Image src="/assets/image/camera.svg" alt="tambah produk" fill />
              </div>
            </div>
            <div className="w-full text-center">
              <p className="text-sm">Tambah Gambar</p>
            </div>
            <input type="file" hidden name="gambar" id="gambar" accept="image/*" />
          </div>
        </label>

        {/* Nama Produk */}
        <label htmlFor="nama_produk" className="flex flex-col space-y-1">
          <span className="text-sm">Nama Produk</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <input
              type="text"
              name="nama_produk"
              id="nama_produk"
              className="outline-0 w-full text-sm"
              placeholder="Masukkan nama produk"
              required
            />
          </div>
        </label>

        {/* Kategori */}
        <label htmlFor="kategori" className="flex flex-col space-y-1">
          <span className="text-sm">Kategori</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <select
              className="outline-0 w-full text-sm text-zinc-700"
              id="kategori"
              name="kategori"
              defaultValue=""
            >
              <option value="" disabled>Pilih Produk</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="pakaian">Pakaian</option>
              <option value="elektronik">Alat Elektronik</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </label>

        {/* Satuan */}
        <label htmlFor="satuan" className="flex flex-col space-y-1">
          <span className="text-sm">Satuan</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
            <select
              className="outline-0 w-full text-sm text-zinc-700"
              id="satuan"
              name="satuan"
              defaultValue=""
            >
              <option value="" disabled>Pilih Satuan</option>
              <option value="pcs">Pcs</option>
              <option value="kg">KG</option>
              <option value="pack">Pack</option>
              <option value="liter">Liter</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </label>

        

        {/* Harga Jual */}
        <label htmlFor="harga_jual" className="flex flex-col space-y-1">
          <span className="text-sm">Harga Jual</span>
          <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
            <p className="text-sm">Rp</p>
            <input
              type="number"
              name="harga_jual"
              id="harga_jual"
              className="outline-0 w-full text-sm"
              placeholder="10000"
              min="0"
              step="1"
            />
          </div>
        </label>

        {/* Stok */}
        <label htmlFor="stok" className="flex flex-col space-y-1">
          <span className="text-sm">Kelola Stok</span>
          <div className="bg-white w-full py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
            <input
              type="number"
              name="stok"
              id="stok"
              className="outline-0 w-full text-sm"
              placeholder="Masukkan Stok"
              min="0"
              step="1"
            />
          </div>
        </label>

        <div className="grid grid-cols-2 gap-7 mt-3">
          <Link href="/produk/pos" className="w-full">
            <button
              type="button"
              className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
