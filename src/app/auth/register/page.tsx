import InputRegister from "@/components/auth/register/InputRegister"
import Logo from "@/components/auth/register/Logo"

export default function Register() {
  return (
    <main className="min-h-screen bg-[#FFCA40]">
      <div className="mx-auto flex min-h-screen w-full md:max-w-[412px] max-w-xl flex-col pb-5">
        <Logo />
        <InputRegister />
        {/* komponen lain */}
      </div>
    </main>
  )
}
