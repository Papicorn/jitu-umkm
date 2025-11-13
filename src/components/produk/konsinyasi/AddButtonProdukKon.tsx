import Image from "next/image"
import Link from "next/link"

export default function AddButtonProdukKon() {
    return (
        <>
        <Link href='/produk/konsinyasi/tambah' className="fixed bottom-33 right-5">
            <div className="bg-white rounded-4xl active:bg-[rgba(22,22,22,0.05)] shadow-lg p-4 text-zinc-800">
                <div className="w-7 relative h-7">
                    <Image src="/assets/image/plus.svg" alt="add" fill className="object-cover" />
                </div>
            </div>
        </Link>
        </>
    )
}