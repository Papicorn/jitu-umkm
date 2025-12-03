import NavtopDashboard from "@/components/dashboard/NavtopDashboard"
import Welcomer from "@/components/dashboard/Welcomer"
import NavigationDashboard from "@/components/dashboard/NavigationDashboard"
import GrafikPenjualanDashboard from "@/components/dashboard/GrafikPenjualan"
import RecentTransaction from "@/components/dashboard/RecentTransction"
import ConsigneeProduct from "@/components/dashboard/ConsigneeProduct"
import NavBot from "@/components/partials/NavBot"

export default function Dashboard() {
  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Beranda" />
      <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
        <Welcomer />
        <NavigationDashboard />
        <GrafikPenjualanDashboard />
        <RecentTransaction />
        <ConsigneeProduct />
      </div>
      <NavBot />
    </main>
  )
}
