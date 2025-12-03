import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import NavigationKonsinyasiKon from "@/components/transaksi/pos/Navigation";
import ProdukTransaksiPOS from "@/components/transaksi/pos/ProdukTransaksiPOS";
import SearchFilterKonPos from "@/components/transaksi/pos/SearchFilterKonPos";

export default function TransaksiPOS() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Transaksi" showBackButton = {false} backUrl = "/dashboard" />
            <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
                <NavigationKonsinyasiKon />
                <SearchFilterKonPos />
                <ProdukTransaksiPOS />
            </div>
            <NavBot />
        </main>
    )
}
