import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import NavBot from "@/components/partials/NavBot"
import NavigationProdukKon from "@/components/produk/konsinyasi/Navigation"
import SearchFilterProdukKon from "@/components/produk/konsinyasi/SearchFilter"
import ProdukTokoKon from "@/components/produk/konsinyasi/ProdukTokoKon"
import AddButtonProdukKon from "@/components/produk/konsinyasi/AddButtonProdukKon"

export default function TransaksiKonsinyasi() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Produk" showBackButton = {true} backUrl = "/dashboard" />
            <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
                <NavigationProdukKon />
                <SearchFilterProdukKon />
                <ProdukTokoKon />
                <AddButtonProdukKon />
            </div>
            <NavBot />
        </main>
    )
}
