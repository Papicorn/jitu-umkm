import InputRegister from "@/components/auth/register/InputRegister"
import Logo from "@/components/auth/register/Logo"

export default function Register() {
  return (
    <main className="min-h-dvh bg-[#FFCA40]">
        <div className="w-full max-w-[430px] px-5 sm:px-4 mx-auto flex-col pt-4 pb-27 space-y-4">
        <Logo />
        <InputRegister />
      </div>
    </main>
  )
}
