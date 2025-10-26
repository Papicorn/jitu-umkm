import Image from "next/image"

export default function NavigationDashboard() {
    return (
        <>
        <div className="w-full">
            <div className="bg-white text-sm px-3 py-4 grid grid-cols-3 gap-3 rounded-lg shadow-sm">
                <div className="text-center text-zinc-700">
                    <div className="h-8 relative mb-2">
                        <Image src={`assets/image/bahan_baku.svg`} className="mx-auto object-center" alt="bahan baku" fill /> 
                    </div>
                    Bahan Baku
                </div>
                <div className="text-center text-zinc-700">
                    <div className="h-8 relative mb-2">
                        <Image src={`assets/image/catat_keuangan.svg`} className="mx-auto object-center" alt="bahan baku" fill /> 
                    </div>
                    Catat Keuangan
                </div>
                <div className="text-center text-zinc-700">
                    <div className="h-8 relative mb-2">
                        <Image src={`assets/image/lainnya.svg`} className="mx-auto object-center" alt="bahan baku" fill /> 
                    </div>
                    Lainnya
                </div>
            </div>
        </div>
        </>
    )
}