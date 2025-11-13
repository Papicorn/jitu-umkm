import Image from "next/image"
import Link from "next/link"

export default function ProdukTokoKon() {
    return (
        <>
        <div className="w-full text-zinc-700 text-sm">
            <div className="grid grid-cols-1">
                <Link href="/produk/konsinyasi/toko">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex space-x-3 items-center">
                            <div className="w-6 relative h-6">
                                <Image src="/assets/image/shop.svg" alt="add" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="font-bold">Toko Sarapan Pagi Asih</p>
                                <p>Total Produk : 2</p>
                                <p>Status : <b className="text-green-500">Aktif</b></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        </>
    )
}