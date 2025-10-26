export default function RecentTransaction() {
    return (
        <>
        <div className="w-full">
            <p className="text-lg font-bold text-zinc-700 mb-1">Transaksi Hari ini</p>
            <div className="grid grid-cols-2 gap-5">
                <div className="bg-white rounded-lg text-center py-3 shadow-sm">
                    <p className="mb-4 text-zinc-700 text-sm">Penjualan</p>
                    <p className="mb-0 text-zinc-700 font-bold text-lg">Rp25.000</p>
                </div>
                <div className="bg-white rounded-lg text-center py-3 shadow-sm">
                    <p className="mb-4 text-zinc-700 text-sm">Produk Terjual</p>
                    <p className="mb-0 text-zinc-700 font-bold text-lg">3</p>
                </div>
            </div>
        </div>
        </>
    )
}