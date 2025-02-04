import Link from "next/link"
import { Table } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex flex-col mx-auto  gap-2 lg:gap-0 lg:flex-row items-start lg:items-center justify-start justify-between p-4">
       
        <Link href={'/'} className="flex items-center space-x-2">
        <span className="p-2 bg-black rounded-sm">
          {/* <Calculator className="h-6 w-6 text-white rotate-90" /> */}
          💵
        </span>
          
          <span className="text-xl font-bold"> Taxmate</span>
        </Link>


        <nav>
          <div className="flex items-start lg:items-center space-x-2">
            
            <Button variant="ghost" asChild>
              <Link href="/">Calculator</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link href="/how-it-works">How it works?</Link> 
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/reference">
                <Table className="h-4 w-4" />
                Reference
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

