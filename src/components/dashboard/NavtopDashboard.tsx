import Image from "next/image"
import Link from "next/link";

type NavtopDashboardProps = {
    title: string;
    showBackButton?: boolean;
    backUrl?: string;
};

export default function NavtopDashboard({ title, showBackButton = false, backUrl = "/", }: NavtopDashboardProps) {
    return (
        <>
        <div className="bg-[#FFCA40] w-full py-4 rounded-bl-3xl rounded-br-3xl shadow-[inset_0_-4px_9px_-1px_rgba(0,0,0,0.1)]">
            <div className="w-full max-w-sm mx-auto flex-col">
                <div className="text-center flex justify-between space-x-3 items-center">
                    {showBackButton ? (
                        <Link href={backUrl}>
                            <Image src={`/assets/image/arrow_left.svg`} width={40} height={100} alt="Profile image" />
                        </Link>
                    ) : (
                        <div className="w-[40px]" />
                    )}
                    <h2 className="text-2xl font-bold text-zinc-700 w-full items-center">{ title }</h2>
                    <Image src={`/assets/image/profile.png`} className="" width={60} height={100} alt="Profile image" />
                </div>
            </div>
        </div>
        </>
    )
}