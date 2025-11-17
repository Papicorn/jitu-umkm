import Image from "next/image"

export default function SearchFilterKonPos() {
    return (
        <>
        <div className="w-full">
            <div className="bg-white shadow-sm rounded-lg py-3 px-4 flex justify-between space-x-2">
                <input type="text" className="w-100 focus:outline-0 text-zinc-500" name="search" id="search" placeholder="Telusuri" />
                <div className="w-5 h-5 relative">
                    <Image src="/assets/image/filter.svg" fill alt="filter image" />
                </div>
            </div>
        </div>
        </>
    )
}