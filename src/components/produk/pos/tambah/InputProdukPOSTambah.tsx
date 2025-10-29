import Image from "next/image"
import Link from "next/link"

export default function InputProdukPOSTambah() {
    return (
        <>
        <div className="w-full">
            <div className="flex flex-col text-zinc-700 space-y-3">
                
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
                        <input type="file" hidden name="gambar" id="gambar" className="w-auto mx-auto bg-red-400" />
                    </div>
                </label>

                {/* Nama Produk */}
                <label htmlFor="nama_produk" className="flex flex-col space-y-1">
                    <span className="text-sm">Nama Produk</span>
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
                        <input type="text" name="nama_produk" id="nama_produk" className="outline-0 w-full text-sm" placeholder="Masukkan nama produk" />
                    </div>
                </label>

                {/* Deskripsi */}
                <label htmlFor="deskripsi" className="flex flex-col space-y-1">
                    <span className="text-sm">Deskripsi</span>
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm">
                        {/* <input type="text" name="deskripsi" id="deskripsi" className="outline-0 text-sm" placeholder="Masukkan deskripsi" /> */}
                        <textarea name="deskripsi" id="deskripsi" className="text-sm w-full outline-0" rows={4} placeholder="Masukkan deskripsi"></textarea>
                    </div>
                </label>

                {/* Kategori */}
                <label htmlFor="kategori" className="flex flex-col space-y-1">
                    <span className="text-sm">Kategori</span>
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm active:ring-1">
                        <select className="outline-0 w-full border-0 text-sm text-zinc-700" id="kategori" name="kategori">
                            <option value="" disabled selected>Pilih Produk</option>
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
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm active:ring-1">
                        <select className="outline-0 w-full border-0 text-sm text-zinc-700" id="kategori" name="kategori">
                            <option value="" disabled selected>Pilih Satuan</option>
                            <option value="makanan">Pcs</option>
                            <option value="minuman">KG</option>
                            <option value="pakaian">Pack</option>
                            <option value="elektronik">Liter</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>
                </label>

                {/* Harga Modal */}
                <label htmlFor="harga_modal" className="flex flex-col space-y-1">
                    <span className="text-sm">Harga (HPP)</span>
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                        <p className="text-sm">Rp</p>
                        <input type="number" name="harga_modal" id="harga_modal" className="outline-0 w-full text-sm" placeholder="8.000"/>
                    </div>
                </label>

                {/* Harga Jual */}
                <label htmlFor="harga_jual" className="flex flex-col space-y-1">
                    <span className="text-sm">Harga Jual</span>
                    <div className="bg-white py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                        <p className="text-sm">Rp</p>
                        <input type="number" name="harga_jual" id="harga_jual" className="outline-0 w-full text-sm" placeholder="10.000" />
                    </div>
                </label>

                {/* Stok */}
                <label htmlFor="stok" className="flex flex-col space-y-1">
                    <span className="text-sm">Kelola Stok</span>
                    <div className="bg-white w-full py-3 px-3 rounded-lg flex items-center shadow-sm space-x-1">
                        <input type="number" name="stok" id="stok" className="outline-0 w-full text-sm" placeholder="Masukkan Stok" />
                    </div>
                </label>

                <div className="grid grid-cols-2 gap-7 mt-3">
                    <Link href="/produk/pos" className="w-full">
                        <button className="bg-transparent border w-full active:bg-[#ffc9c9] active:text-zinc-600 border-red-600 rounded py-3 text-sm shadow-sm text-red-600">Batal</button>
                    </Link>
                    <button type="submit" className="bg-[#FFCA40] active:bg-[#fbbd21] border border-zinc-600 rounded py-3 text-sm shadow-sm">Simpan</button>
                </div>

            </div>
        </div>
        </>
    )
}