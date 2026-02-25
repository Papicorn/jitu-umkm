import Link from "next/link"
import Image from "next/image"

export default function ButtonNavigation() {
    return (
        <>
            <div className="w-full">
                <div className="space-y-2 flex flex-col">
                    <Link href="/profile/kasir">
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-4 py-4 text-sm text-zinc-800">
                        <div className="flex flex-row">
                            <div className="relative w-5.5 mr-3">
                                <Image src="/assets/image/profiles.png" alt="Profile icon" fill />
                            </div>
                            Profil
                        </div>
                    </div>
                    </Link>
                    <Link href="/laporan/konsinyasi">
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-4 py-4 text-sm text-zinc-800">
                        <div className="flex flex-row">
                            <div className="relative w-5.5 mr-3">
                                <Image src="/assets/image/bahan-baku.svg" alt="Bahan Baku icon" fill />
                            </div>
                            Bahan Baku
                        </div>
                    </div>
                    </Link>
                    <Link href="/laporan/konsinyasi">
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 px-4 py-4 text-sm text-zinc-800">
                        <div className="flex flex-row">
                            <div className="relative w-5.5 mr-3">
                                <Image src="/assets/image/settings.svg" alt="Pengatuan icon" fill />
                            </div>
                            Pengaturan
                        </div>
                    </div>
                    </Link>
                    <Link href="/">
                    <div className="bg-white rounded-lg shadow-sm border border-[#F92424] px-4 py-4 text-sm text-zinc-800">
                        <div className="flex flex-row">
                            <div className="relative w-5.5 mr-3">
                                <Image src="/assets/image/leave.svg" alt="Leave icon" className="shadow" fill />
                            </div>
                            <span className="text-[#F92424]">Keluar</span>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </>
    )
}