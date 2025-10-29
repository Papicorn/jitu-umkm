import Image from "next/image"

export default function ProdukProdukPOS() {
    return (
        <>
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
                    <div className="w-full relative aspect-square">
                        <Image src="/assets/image/ubi-ungu.jpg" className="object-cover" alt="Keripik Ubi Ungu" fill />
                        <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                            20
                        </div>
                    </div>
                    <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                        <p className="text-zinc-700 leading-4">Keripik Ubi Ungu</p>
                        <p className="font-bold text-zinc-700">Rp35.000</p>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
                    <div className="w-full relative aspect-square">
                        <Image src="/assets/image/keripik-singkong.jpg" className="object-cover" alt="Keripik Ubi Ungu" fill />
                        <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                            12
                        </div>
                    </div>
                    <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                        <p className="text-zinc-700 leading-4">Keripik Singkong</p>
                        <p className="font-bold text-zinc-700">Rp35.000</p>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-sm h-full overflow-hidden flex flex-col">
                    <div className="w-full relative aspect-square">
                        <Image src="/assets/image/basreng.jpg" className="object-cover" alt="Keripik Ubi Ungu" fill />
                        <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                            20
                        </div>
                    </div>
                    <div className="py-2 px-2 space-y-1 text-sm flex grow flex-wrap">
                        <p className="text-zinc-700 leading-4">Basreng</p>
                        <p className="font-bold text-zinc-700 place-self-end">Rp58.000</p>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
                    <div className="w-full relative aspect-square">
                        <Image src="/assets/image/keripik_pisang.jpg" className="object-cover" alt="Keripik Ubi Ungu" fill />
                        <div className="absolute top-2 left-2 bg-white text-xs text-zinc-700 rounded p-1">
                            20
                        </div>
                    </div>
                    <div className="py-2 px-2 space-y-1 flex flex-wrap grow text-sm">
                        <p className="text-zinc-700 leading-4">Keripik Pisang</p>
                        <p className="font-bold text-zinc-700">Rp12.000</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}