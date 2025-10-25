import InputRegister from "@/components/auth/register/InputRegister"
import Logo from "@/components/auth/register/Logo"

export default function Register() {
  return (
    <main className="min-h-dvh bg-[#FFCA40]">
        <div className="w-full max-w-sm mx-auto flex-col pb-5">
        <Logo />
        <InputRegister />
      </div>
    </main>
  )
}