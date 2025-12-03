export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div className="bg-white rounded-xl px-6 py-5 shadow-lg flex items-center gap-3 text-zinc-800">
        <span
          className="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-[#FFCA40] border-t-transparent"
          aria-label="Memuat"
          role="status"
        />
        <div>
          <p className="font-semibold leading-tight">Memuat halaman</p>
          <p className="text-sm text-zinc-500 leading-tight">Tunggu sebentar...</p>
        </div>
      </div>
    </div>
  );
}
