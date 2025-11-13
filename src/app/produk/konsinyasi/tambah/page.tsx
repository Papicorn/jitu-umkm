import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import InputTokoKonTambah from "@/components/produk/konsinyasi/tambah/InputTokoKonTambah"

export default function TambahKon() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Tambah Toko" showBackButton = {true} backUrl = "/produk/konsinyasi" />
            <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-10 space-y-4">
                <InputTokoKonTambah />
            </div>
        </main>
    )
}