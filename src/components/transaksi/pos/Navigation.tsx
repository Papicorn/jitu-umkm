import Link from "next/link"

export default function NavigationKonsinyasiKon() {
    return (
        <>
        <div className="w-full">
            <div className="grid grid-cols-2 gap-7">
                <Link href="/transaksi/konsinyasi">
                <div className="bg-white rounded-xl text-center shadow-sm py-3">
                    <p className="text-zinc-700 text-sm font-bold">Penitipan</p>
                </div>
                </Link>
                <Link href="/transaksi/pos">
                <div className="bg-[#FFCA40] rounded-xl text-center shadow-sm py-3">
                    <p className="text-zinc-700 text-sm font-bold">Kasir</p>
                </div>
                </Link>
            </div>
        </div>
        </>
    )
}