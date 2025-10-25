import Link from "next/link";

const default_text = "text-2xl";
const privacy_text = "text-sm text-zinc-600";
const already_login = "text-sm text-zinc-600";
const all_input = "bg-[#ffffff] shadow-sm w-full text-sm text-zinc-500 py-4 rounded-lg px-6 placeholder-[#BCBEC0] focus:outline-0 xs:bg-red-400 xs:py-2"

export default function InputRegister() {
    return (
        <>
        <div className="w-full">
            <form action="" method="post" className="space-y-4 flex-col">
                <input type="text" 
                name="nama-lengkap" 
                id="nama-lengkap" 
                placeholder="Nama lengkap" 
                className={all_input}
                />

                <input type="text" 
                name="telp" 
                id="telp" 
                placeholder="Nomor telepon" 
                className={all_input}                
                />

                <input type="email" 
                name="email" 
                id="email" 
                placeholder="Email" 
                className={all_input}       
                />

                <input type="password" 
                name="password" 
                id="password" 
                placeholder="Kata sandi" 
                className={all_input}       
                />

                <input type="password" 
                name="confirm_password" 
                id="confirm_password" 
                placeholder="Konfirmasi kata sandi" 
                className={all_input}       
                />

                <label className="py-2 flex space-x-3 items-center cursor-pointer">
                    <input
                        id="privacy"
                        type="checkbox"
                        className="hidden peer"
                    />
                    <div className="w-5 h-5 border-3 border-zinc-700 rounded-md peer-checked:bg-[#D7263D] flex items-center peer-checked:border-0 justify-center transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className={privacy_text}>Anda setuju dengan <b className="text-[#D7263D]">Syarat</b> dan <b className="text-[#D7263D]">Ketentuan</b> kami</span>
                </label>

                <button type="submit" className={`active:bg-[#f3f1f1] active:shadow-lg cursor-pointer hover:bg-[#f3f1f1] hover:shadow-lg duration-300 ease-out bg-[#ffffff] w-full text-center text-sm rounded-xl py-4 text-zinc-500 shadow-sm`}>Buat Akun</button>

                <div className="text-center">
                    <span className={`${already_login} text-center w-full`}>Sudah punya akun?</span>
                </div>

                <Link href="/auth/login">
                    <button type="submit" className={`active:bg-[#c22237] active:shadow-lg cursor-pointer hover:bg-[#c22237] hover:shadow-lg duration-300 ease-out bg-[#D7263D] w-full text-center text-sm rounded-xl py-4 text-white shadow-sm`}>Masuk</button>
                </Link>

            </form>
        </div>
        </>
    )
}