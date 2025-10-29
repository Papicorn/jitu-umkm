import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import NavBot from "@/components/partials/NavBot"
import NavigationProdukPOS from "@/components/produk/pos/Navigation"
import ProdukProdukPOS from "@/components/produk/pos/ProdukProdukPOS"
import SearchFilterProdukPOS from "@/components/produk/pos/SearchFilter"
import AddButtonProdukPOS from "@/components/produk/pos/AddButtonProdukPOS"

export default function TransaksiPOS() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Produk" showBackButton = {true} backUrl = "/dashboard" />
            <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-27 space-y-4">
                <NavigationProdukPOS />
                <SearchFilterProdukPOS />
                <ProdukProdukPOS />
                <AddButtonProdukPOS />
            </div>
            <NavBot />
        </main>
    )
}