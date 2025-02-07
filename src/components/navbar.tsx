import Link from "next/link"
import { Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WordRotate } from "./word-rotate"
import { HRACalculator } from "./hra-calculator"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex flex-col mx-auto  gap-2 lg:gap-0 lg:flex-row items-start lg:items-center justify-start justify-between p-4">

        <Link href={'/'} className="flex   items-center space-x-2">
          <span className="p-3 bg-black rounded-sm text-2xl">
            💵
          </span>

          <h2 className="text-xl flex flex-col justify-between font-bold"> Taxmate   <br /> 
            <WordRotate
              className="text-sm  text-black dark:text-white uppercase"
              words={["Simplify", "Calculate", "Save"]}
            /> 
          </h2>
        </Link>


        <nav>
          <div className="flex items-start lg:items-center space-x-2 flex-wrap">

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


            {/* <HRACalculator/> */}
          </div>
        </nav>
      </div>
    </header>
  )
}

