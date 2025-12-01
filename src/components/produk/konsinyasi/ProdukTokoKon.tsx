"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ambilSemuaToko,
  ambilSemuaTitipan,
  KonsinyasiStore,
  TitipanEntry,
} from "@/lib/konsinyasiStorage";

type StoreWithStats = {
  store: KonsinyasiStore;
  totalTitipan: number;
  activeTitipan: number;
};

export default function ProdukTokoKon() {
  const [stores, setStores] = useState<KonsinyasiStore[]>([]);
  const [titipanList, setTitipanList] = useState<TitipanEntry[]>([]);

  useEffect(() => {
    setStores(ambilSemuaToko());
    setTitipanList(ambilSemuaTitipan());
  }, []);

  const data: StoreWithStats[] = useMemo(() => {
    if (!stores.length) return [];
    return stores.map((store) => {
      const titipanPerStore = titipanList.filter((item) => item.storeId === store.id);
      const active = titipanPerStore.filter((item) => item.status === "aktif").length;
      return {
        store,
        totalTitipan: titipanPerStore.length,
        activeTitipan: active,
      };
    });
  }, [stores, titipanList]);

  if (!stores.length) {
    return (
      <div className="w-full text-zinc-500 text-sm">
        Belum ada toko konsinyasi. Tekan tombol tambah untuk membuat toko baru.
      </div>
    );
  }

  return (
    <div className="w-full text-zinc-700 text-sm">
      <div className="grid grid-cols-1 gap-3">
        {data.map(({ store, totalTitipan, activeTitipan }) => (
          <Link key={store.id} href={`/produk/konsinyasi/toko?id=${store.id}`}>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex space-x-3 items-center">
                <div className="w-6 relative h-6">
                  <Image src="/assets/image/shop.svg" alt="toko konsinyasi" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold">{store.nama_toko}</p>
                  <p>Total Titipan : {totalTitipan}</p>
                  <p>
                    Status :{" "}
                    <b className={activeTitipan > 0 ? "text-green-500" : "text-zinc-500"}>
                      {activeTitipan > 0 ? "Aktif" : "Menunggu Titipan"}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
