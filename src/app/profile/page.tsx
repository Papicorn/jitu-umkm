import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import NavBot from "@/components/partials/NavBot";
import ButtonNavigation from "@/components/profile/ButtonNavigation";

export default function ProfilePage() {
    return (
        <main className="min-h-dvh bg-[#F4F7FE]">
            <NavtopDashboard title="Transaksi" showBackButton = {true} backUrl = "/dashboard" />
            <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
                <ButtonNavigation />
            </div>
            <NavBot />
        </main>
    )
}
