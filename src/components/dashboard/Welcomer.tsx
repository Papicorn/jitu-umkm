import Image from "next/image"

export default function Welcomer() {
    return (
        <>
            <div className="w-full">
                <div className="flex justify-between space-x-3">
                    <div className="w-full text-sm shadow-sm bg-white text-zinc-700 p-3 rounded-lg ">Halo, <b>Miftahul Fazra</b></div>
                    <div className="shadow-sm px-2 rounded-lg bg-white content-center"><Image src={`/assets/image/bell.svg`} alt="Bell" width={34} height={100} /></div>
                </div>
            </div>
        </>
    )
}