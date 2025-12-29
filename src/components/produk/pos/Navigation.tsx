import Link from "next/link"

export default function NavigationProdukPOS() {
    return (
        <>
        <div className="w-full">
            <div className="grid grid-cols-2 gap-7">
                <Link href="/produk/konsinyasi">
                <div className="bg-white rounded-xl text-center shadow-sm py-3">
                    <p className="text-zinc-700 text-sm font-bold">Titip Produk</p>
                </div>
                </Link>
                <Link href="/produk/pos">
                <div className="bg-[#FFCA40] rounded-xl text-center shadow-sm py-3">
                    <p className="text-zinc-700 text-sm font-bold">Stok Produk</p>
                </div>
                </Link>
            </div>
        </div>
        </>
    )
}