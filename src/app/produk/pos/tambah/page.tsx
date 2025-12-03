import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import InputProdukPOSTambah from "@/components/produk/pos/tambah/InputProdukPOSTambah"

export default function TransaksiPOS() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Produk" showBackButton = {true} backUrl = "/produk/pos" />
            <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
                <InputProdukPOSTambah />
            </div>
        </main>
    )
}
