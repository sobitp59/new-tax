import Calculator from "@/components/calculator"
import Navbar from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container w-full lg:max-w-[900px] mx-auto py-6 px-4">
        <Calculator />
      </main>
    </div>
  )
}

