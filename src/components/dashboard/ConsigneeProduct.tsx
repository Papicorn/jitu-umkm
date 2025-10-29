import Image from "next/image"

export default function ConsigneeProduct() {
    return (
        <>
        <div className="w-full">
            <p className="text-lg font-bold text-zinc-700 mb-1">Titipan Anda</p>
            <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-lg py-4 px-3 shadow-sm space-y-3">
                    <p className="text-zinc-700 font-semibold">Toko Sarapan Pagi Asih</p>
                    <div className="flex justify-between">
                        <table className="table-auto">
                            <tbody className="text-zinc-700 text-sm">
                                <tr>
                                    <td>Produk</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold">Keripik Pisang</td>
                                </tr>
                                <tr>
                                    <td>Total Produk</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold"> 30</td>
                                </tr>
                                <tr>
                                    <td>Estimasi</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold">1/11/2025</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td className="pl-3 pr-1">:</td>
                                    <td className="font-bold text-green-500">Aktif</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="relative w-25 h-25">
                            <Image src="/assets/image/keripik_pisang.jpg" className="object-cover rounded-lg" alt="Keripik Pisang" fill />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-4 px-3 shadow-sm space-y-3">
                    <p className="text-zinc-700 font-semibold">Toko Sarapan Pagi Asih</p>
                    <div className="flex justify-between">
                        <table className="table-auto">
                            <tbody className="text-zinc-700 text-sm">
                                <tr>
                                    <td>Produk</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold">Keripik Pisang</td>
                                </tr>
                                <tr>
                                    <td>Total Produk</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold"> 30</td>
                                </tr>
                                <tr>
                                    <td>Estimasi</td>
                                    <td className="pl-3">:</td>
                                    <td className="font-bold">1/11/2025</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td className="pl-3 pr-1">:</td>
                                    <td className="font-bold text-green-500">Aktif</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="relative w-25 h-25">
                            <Image src="/assets/image/keripik_pisang.jpg" className="object-cover rounded-lg" alt="Keripik Pisang" fill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}