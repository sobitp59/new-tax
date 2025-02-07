import Calculator from "@/components/calculator"
import Navbar from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <main className="container w-full lg:max-w-[1200]  mx-auto py-6 px-4">
        <Calculator />


        <span className="absolute bottom-10 right-10 border-[1.5px] border-2 border-gray-400 border-b-4 rounded-lg py-1 px-4 text-sm bg-black text-white">Financial Year 2024-25</span>
      </main>
    </div>
  )
}

