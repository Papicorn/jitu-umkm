import NavtopDashboard from "@/components/dashboard/NavtopDashboard";
import InputTitipToko from "@/components/produk/konsinyasi/toko/titip/InputTitipToko";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: {
    id?: string;
  };
};

export default function TitipKon({ searchParams }: Props) {
  const storeId = searchParams?.id;
  const backUrl = storeId ? `/produk/konsinyasi/toko?id=${storeId}` : "/produk/konsinyasi";

  return (
    <main className="min-h-dvh bg-[#F4F7FE]">
      <NavtopDashboard
        title="Titip Barang Baru"
        showBackButton={true}
        backUrl={backUrl}
      />
      <div className="w-full max-w-sm mx-auto flex-col pt-4 pb-10 space-y-4">
        <InputTitipToko storeId={storeId} />
      </div>
    </main>
  );
}
