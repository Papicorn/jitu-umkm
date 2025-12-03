import Logo from "@/components/auth/login/Logo"
import InputLogin from "@/components/auth/login/InputLogin"

export default function Login() {
  return (
    <main className="min-h-screen h-full bg-[#FFCA40]">
      <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
        <Logo />
        <InputLogin />
        {/* komponen lain */}
      </div>
    </main>
  )
}
