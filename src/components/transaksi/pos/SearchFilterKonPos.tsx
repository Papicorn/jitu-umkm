"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";

const SEARCH_EVENT = "pos-search-term";

export default function SearchFilterKonPos() {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent<string>(SEARCH_EVENT, { detail: nextValue })
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-sm rounded-lg py-3 px-4 flex justify-between space-x-2">
        <input
          type="text"
          className="w-100 focus:outline-0 text-zinc-500"
          name="search"
          id="search"
          placeholder="Telusuri"
          value={value}
          onChange={handleChange}
        />
        <div className="w-5 h-5 relative">
          <Image src="/assets/image/filter.svg" fill alt="filter image" />
        </div>
      </div>
    </div>
  );
}
