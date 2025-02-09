"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FileDown } from "lucide-react"

// Dynamically import PDFDownloadLink with no SSR
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false, loading: () => <p>Loading...</p>, })


// Dynamically import PDF Document component
const TaxPDFDocument = dynamic(() => import("./pdf-document").then((mod) => mod.TaxPDFDocument), { ssr: false, loading: () => <p>Loading...</p>, })

interface DownloadReportProps {
  income: number
  effectiveIncome: number
  newRegime: {
    calculation: string
    totalTax: number
  }
  oldRegime: {
    calculation: string
    totalTax: number
  }
}

export default function DownloadReport(props: DownloadReportProps) {


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Button disabled>
        <FileDown className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    )
  }

  return  (

     <Button variant={'ghost'} className="bg-white border-2 w-12 h-12 border-b-4 border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 ">
            <DownloadIcon color="grey" fontWeight={'bolder'} />
          </Button> 


    // <PDFDownloadLink
    //   document={<TaxPDFDocument />}
    //   fileName={`tax-report.pdf`}
    // >
    //   {({ loading, blob, url, error }) => (
    //     <Button disabled={loading}>
    //       <FileDown className="mr-2 h-4 w-4" />
    //       {loading ? "Generating PDF..." : "Download Report"}
    //     </Button>
    //   )}
    // </PDFDownloadLink>
  )
}


