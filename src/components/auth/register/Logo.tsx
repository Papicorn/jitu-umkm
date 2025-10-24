import Image from "next/image"

export default function Logo() {
    return (
        <>
        <div className="w-full py-20 md:py-10 flex justify-center">
            <Image src="/assets/image/logo.png" alt="logo png" width={400} height={100} />
        </div>
        </>
    )
}