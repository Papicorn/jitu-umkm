import Logo from "@/components/auth/login/Logo"
import InputLogin from "@/components/auth/login/InputLogin"

export default function Login() {
  return (
    <main className="min-h-screen h-full bg-[#FFCA40]">
      <div className="w-full max-w-sm mx-auto flex-col pb-5">
        <Logo />
        <InputLogin />
        {/* komponen lain */}
      </div>
    </main>
  )
}
