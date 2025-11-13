import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import DetailTokoKon from "@/components/produk/konsinyasi/toko/titip/InputTitipToko"

export default function TitipKon() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Titip Barang Baru" showBackButton = {true} backUrl = "/produk/konsinyasi" />
            <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-10 space-y-4">
                <DetailTokoKon />
            </div>
        </main>
    )
}