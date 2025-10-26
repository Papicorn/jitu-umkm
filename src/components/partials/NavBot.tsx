import Image from "next/image"

export default function NavBot() {
    return (
        <>
        <div className="relative">
            <div className="w-full fixed bottom-0 right-0 left-0 bg-[#FFCA40] shadow rounded-tl-2xl rounded-tr-2xl">
                <div className="grid grid-cols-4 text-zinc-700">
                    <div className="bg-white px-2 py-4 shadow rounded-tl-2xl rounded-tr-2xl">
                        <div className="flex-row text-center">
                            <div className="relative h-7 mb-2">
                                <Image src="/assets/image/beranda.svg" alt="Beranda icon" fill />
                            </div>
                            <p>Beranda</p>

                        </div>
                    </div>
                    <div className="px-2 py-4  rounded-tl-2xl rounded-tr-2xl">
                        <div className="flex-row text-center">
                            <div className="relative h-7 mb-2">
                                <Image src="/assets/image/produk.svg" alt="Produk icon" fill />
                            </div>
                            <p>Produk</p>

                        </div>
                    </div>
                    <div className="px-2 py-4 rounded-tl-2xl rounded-tr-2xl">
                        <div className="flex-row text-center">
                            <div className="relative h-7 mb-2">
                                <Image src="/assets/image/transaksi.svg" alt="Transaksi icon" fill />
                            </div>
                            <p>Transaksi</p>

                        </div>
                    </div>
                    <div className="px-2 py-4 rounded-tl-xl rounded-tr-xl">
                        <div className="flex-row text-center">
                            <div className="relative h-7 mb-2">
                                <Image src="/assets/image/report.svg" alt="Laporan icon" fill />
                            </div>
                            <p>Laporan</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}