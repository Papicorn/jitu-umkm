import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import DetailTokoKon from "@/components/produk/konsinyasi/toko/DetailTokoKon";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: {
    id?: string;
  };
};

export default function DetailKon({ searchParams }: Props) {
  const storeId = searchParams?.id;

  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard title="Detail Toko" showBackButton={true} backUrl="/produk/konsinyasi" />
      <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-10 space-y-4">
        <DetailTokoKon storeId={storeId} />
      </div>
    </main>
  );
}
