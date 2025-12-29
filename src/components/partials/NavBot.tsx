"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBot() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Prefetch utama supaya pindah tab lebih cepat di koneksi lambat
    ["/dashboard", "/produk/pos", "/transaksi/pos", "/laporan"].forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  return (
    <>
      <div className="relative">
        <div className="w-full fixed bottom-0 right-0 left-0 bg-[#FFCA40] shadow rounded-tl-2xl rounded-tr-2xl">
          <div className="grid grid-cols-4 text-zinc-700">
            <Link href="/dashboard">
              <div
                className={`${
                  pathname === "/dashboard" ? "bg-white shadow-inner" : ""
                } active:bg-[rgba(22,22,22,0.10)] px-2 py-4 rounded-tl-2xl rounded-tr-2xl`}
              >
                <div className="flex-row text-center">
                  <div className="relative h-7 mb-2">
                    <Image src="/assets/image/beranda.svg" alt="Beranda icon" fill />
                  </div>
                  <p>Beranda</p>
                </div>
              </div>
            </Link>

            <Link href="/produk/pos">
              <div
                className={` ${
                  pathname.startsWith("/produk") ? "bg-white shadow-inner" : ""
                } px-2 py-4 active:bg-[rgba(22,22,22,0.10)] rounded-tl-2xl rounded-tr-2xl`}
              >
                <div className="flex-row text-center">
                  <div className="relative h-7 mb-2">
                    <Image src="/assets/image/produk.svg" alt="Produk icon" fill />
                  </div>
                  <p>Produk</p>
                </div>
              </div>
            </Link>

            <Link href="/transaksi/pos">
              <div
                className={` ${
                  pathname.startsWith("/transaksi") ? "bg-white shadow-inner" : ""
                } px-2 py-4 active:bg-[rgba(22,22,22,0.10)] rounded-tl-2xl rounded-tr-2xl`}
              >
                <div className="flex-row text-center">
                  <div className="relative h-7 mb-2">
                    <Image src="/assets/image/transaksi.svg" alt="Transaksi icon" fill />
                  </div>
                  <p>Kasir</p>
                </div>
              </div>
            </Link>

            <Link href="/laporan">
              <div
                className={` ${
                  pathname.startsWith("/laporan") ? "bg-white shadow-inner" : ""
                } px-2 py-4 active:bg-[rgba(22,22,22,0.10)] rounded-tl-xl rounded-tr-xl`}
              >
                <div className="flex-row text-center">
                  <div className="relative h-7 mb-2">
                    <Image src="/assets/image/report.svg" alt="Laporan icon" fill />
                  </div>
                  <p>Laporan</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
