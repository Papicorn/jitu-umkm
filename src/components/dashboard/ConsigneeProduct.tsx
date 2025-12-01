"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ambilSemuaTitipan, ambilTokoById, TitipanEntry } from "@/lib/konsinyasiStorage";

export default function ConsigneeProduct() {
  const [titipan, setTitipan] = useState<TitipanEntry[]>([]);

  useEffect(() => {
    setTitipan(ambilSemuaTitipan().filter((t) => t.status === "aktif"));
  }, []);

  const cards = useMemo(() => titipan.slice(0, 4), [titipan]);

  if (!cards.length) {
    return (
      <div className="w-full">
        <p className="text-lg font-bold text-zinc-700 mb-1">Titipan Anda</p>
        <div className="bg-white rounded-lg py-4 px-3 shadow-sm text-sm text-zinc-500 text-center">
          Belum ada titipan aktif.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="text-lg font-bold text-zinc-700 mb-1">Titipan Anda</p>
      <div className="grid grid-cols-1 gap-3">
        {cards.map((item) => {
          const toko = ambilTokoById(item.storeId);
          return (
            <div key={item.id} className="bg-white rounded-lg py-4 px-3 shadow-sm space-y-3">
              <p className="text-zinc-700 font-semibold">{toko?.nama_toko ?? "Tanpa Toko"}</p>
              <div className="flex justify-between gap-3">
                <table className="table-auto">
                  <tbody className="text-zinc-700 text-sm">
                    <tr>
                      <td>Produk</td>
                      <td className="pl-3">:</td>
                      <td className="font-bold">{item.produkNama}</td>
                    </tr>
                    <tr>
                      <td>Total Produk</td>
                      <td className="pl-3">:</td>
                      <td className="font-bold">{item.stokTitip}</td>
                    </tr>
                    <tr>
                      <td>Estimasi</td>
                      <td className="pl-3">:</td>
                      <td className="font-bold">{item.estimasi}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="pl-3 pr-1">:</td>
                      <td className="font-bold text-green-500 capitalize">{item.status}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="relative w-20 h-20">
                  <Image
                    src="/assets/image/ubi-ungu.jpg"
                    className="object-cover rounded-lg"
                    alt={item.produkNama}
                    fill
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
