import Link from "next/link";

const default_text = "text-2xl";
const forgot_password = "text-sm text-[#D7263D]";
const already_login = "text-sm text-zinc-600";
const all_input = "bg-[#ffffff] shadow-sm w-full text-sm text-zinc-500 py-4 rounded-lg px-6 placeholder-[#BCBEC0] focus:outline-0 xs:bg-red-400 xs:py-2"

export default function InputLogin() {
    return (
        <>
        <div className="w-full">
            <form action="" method="post" className="space-y-4 flex-col">
                <input type="text" 
                name="telp" 
                id="telp" 
                placeholder="Nomor telepon" 
                className={all_input}                
                />

                <div className="space-y-2">
                    <input type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Kata sandi" 
                    className={all_input}       
                    />

                
                    <span className={`${forgot_password} text-center w-full`}>Lupa kata sandi?</span>
                </div>

                <div>
                    <Link href="/dashboard">
                        <button type="submit" className={`active:bg-[#f3f1f1] mt-5 active:shadow-lg cursor-pointer hover:bg-[#f3f1f1] hover:shadow-lg duration-300 ease-out bg-[#ffffff] w-full text-center text-sm rounded-xl py-4 text-zinc-500 shadow-sm`}>Masuk</button>
                    </Link>
                </div>

                <div className="text-center">
                    <span className={`${already_login} text-center w-full`}>Belum punya akun?</span>
                </div>

                <Link href="/auth/register">
                    <button type="submit" className={`active:bg-[#c22237] active:shadow-lg cursor-pointer hover:bg-[#c22237] hover:shadow-lg duration-300 ease-out bg-[#D7263D] w-full text-center text-sm rounded-xl py-4 text-white shadow-sm`}>Buat Akun</button>
                </Link>

            </form>
        </div>
        </>
    )
}