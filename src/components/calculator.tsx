"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Info from "./info"
import { DownloadIcon } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

const CHUNK_SIZE = 400000 
const STANDARD_DEDUCTION = 75000

const calculateTax = (
  income: number
): {
  calculation: string
  totalTax: number
} => {
  const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION)
  let remainingIncome = taxableIncome
  let calculation = ""
  let totalTax = 0

  // First 4L (0%)
  const chunk0 = Math.min(CHUNK_SIZE, remainingIncome)
  remainingIncome -= chunk0
  calculation += `(4L * 0%)`

  // Next 4L (5%)
  if (remainingIncome > 0) {
    const chunk5 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk5
    totalTax += chunk5 * 0.05
    calculation += ` + (4L * 5%)`
  }

  // Next 4L (10%)
  if (remainingIncome > 0) {
    const chunk10 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk10
    totalTax += chunk10 * 0.1
    calculation += ` + (4L * 10%)`
  }

  // Next 4L (15%)
  if (remainingIncome > 0) {
    const chunk15 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk15
    totalTax += chunk15 * 0.15
    calculation += ` + (${(chunk15 / 100000)}L * 15%)`
  }

  // Next 4L (20%)
  if (remainingIncome > 0) {
    const chunk20 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk20
    totalTax += chunk20 * 0.2
    calculation += ` + (${(chunk20 / 100000)}L * 20%)`
  }
  
  // Next 4L (25%)
  if (remainingIncome > 0) {
    const chunk25 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk25
    totalTax += chunk25 * 0.25
    calculation += ` + (${(chunk25 / 100000)}L * 25%)`
  }



  // Remaining Amount (30%)
  if (remainingIncome > 0) {
    const chunk30 = remainingIncome
    remainingIncome -= chunk30
    totalTax += chunk30 * 0.3
    calculation += ` + (${(chunk30 / 100000)}L * 30%)`
  }



  // Apply rebate for income up to 12L
  if (taxableIncome <= 1200000) {
    if (taxableIncome > 800000) {
      totalTax = Math.max(0, totalTax - 80000) 
    } else if (taxableIncome > 0) {
      totalTax = Math.max(0, totalTax - 10000) 
    }
  }


  // if(taxableIncome > 1200000 && taxableIncome < 1275000){
  //   totalTax = totalTax - (taxableIncome - 1200000) * 0.04
    
  // }

  return { calculation, totalTax : (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) + (Number(totalTax) -  (Number(totalTax) - Number((taxableIncome - 1200000)))) * 0.04 : Number(totalTax) + Number(totalTax * 0.04) }
}

export default function Calculator() {
  const [income, setIncome] = useState<string>("")

  const numericIncome = Number(income) || 0
  const { calculation, totalTax } = calculateTax(numericIncome)

  const chartData = [
    { name: "Taxable Income", value: Number(income) - STANDARD_DEDUCTION },
    { name: "Payable Tax", value: totalTax },
  ]

  return (
    <main className="container w-full py-6 px-4 flex gap-8">
      <Tabs defaultValue="newregime" className="w-full h-100 rounded-xl ">
        <TabsList className="grid w-full grid-cols-2 p-2 h-100 rounded-xl bg-white border-2 border-gray-200 border-b-4 ">
          <TabsTrigger value="newregime" className="p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">New Regime ✨</TabsTrigger>
          <TabsTrigger value="oldregime" className="p-4  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Old Regime 🏦</TabsTrigger>
        </TabsList>

        <TabsContent value="newregime" className="mt-6">
            <Card className="border-b-4 border-gray-200 rounded-lg">
            <CardHeader>
              <CardTitle>Income Tax Calculator (New Regime) ✨</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="income">Annual Income (in ₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter your annual income"
                    className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="salaried" checked={isSalaried} onCheckedChange={setIsSalaried} />
                  <Label htmlFor="salaried">I am a salaried individual</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oldregime" className="mt-6">
        <Card className="border-b-4 border-gray-200 rounded-lg">
          <CardHeader>
              <CardTitle>Income Tax Calculator (Old Regime) 🏦</CardTitle>
            </CardHeader>



            <CardContent className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white p-1 mb-10 rounded-t-lg rounded-b-none">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-transparent p-4 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-b-none"
              >
                Basic 
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="data-[state=active]:bg-transparent p-4 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-b-none"
              >
                Income 
              </TabsTrigger>
              <TabsTrigger
                value="deductions"
                className="data-[state=active]:bg-transparent p-4 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-b-none"
              >
                Deductions
              </TabsTrigger>
             
              <TabsTrigger
                value="tax-paid"
                className="data-[state=active]:bg-transparent p-4 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-b-none"
              >
                Tax Paid
              </TabsTrigger>
            </TabsList>

            {/* BASIC DETAILS */}
              <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age Group</Label>
                    <Select>
                      <SelectTrigger className="w-full border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>My Age Group is</SelectLabel> 
                            <SelectItem value="59">Below 60 Years</SelectItem>
                            <SelectItem value="60+">60 Years and below 80 Years</SelectItem>
                            <SelectItem value="80+">Above 80 Years</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              {/* INCOME DETAILS */}
              <TabsContent value="income" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="income">Annual Income (in ₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your annual income"
                      className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="income">Income from Intereset (in ₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your annual income"
                      className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                    />
                  </div>
                </div>


                {/*  */}
                
                <div className="space-y-4">
                  <div className="grid gap-2">

                  <section className="flex justify-between items-center">
                    <Label htmlFor="income">Rental Income Recieved (in ₹)</Label>
                    <Info
                      content="30% Deduction on Total Rental Income is applicable to cover renovation/repair expenses"
                    />
                  </section>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your annual income"
                      className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="income">Income From Other Sources (Interest, Dividend, etc.) (in ₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your annual income"
                      className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                    />
                  </div>
                </div>


              </TabsContent>


              {/* DEDUCTIONS */}
              <TabsContent value="deductions">
                
                {/*  */}
                <ScrollArea className="h-[400px] w-full">

                    <section className="space-y-4">
                      <h2 className="text-lg font-bold ">Under 80C</h2>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="income">Life Insurance Premium (in ₹)</Label>
                            <Input
                              id="income"
                              type="number"
                              value={income}
                              onChange={(e) => setIncome(e.target.value)}
                              placeholder="Enter your annual income"
                              className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                            />
                          </div>
                        </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Public Provident Fund (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Contribution to Provident Fund (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Tax Saving Fixed Deposit (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Repayment of Principal on Housing Loan (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">ULIP/ Tax Saving Investment Plans (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Equity Linked Savings Schemes (ELSS) (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Employee Contribution to NPS u/s 80CCD(1) (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Tuition Fees (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                    </section>


                    <section className="space-y-4">
                      <h2 className="text-lg font-bold mt-6">Under 80D</h2>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="income">For Self and Family (in ₹)</Label>
                            <Input
                              id="income"
                              type="number"
                              value={income}
                              onChange={(e) => setIncome(e.target.value)}
                              placeholder="Enter your annual income"
                              className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                            />
                          </div>
                        </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Preventive Checkup (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">For Parents below 60 Years (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">For Parents above 60 Years (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>


                    </section>
                  
                    <section className="space-y-4">
                      <h2 className="text-lg font-bold mt-6">Other Deductions</h2>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="income">HRA u/s 10 (13A) (in ₹)</Label>
                            <Input
                              id="income"
                              type="number"
                              value={income}
                              onChange={(e) => setIncome(e.target.value)}
                              placeholder="Enter your annual income"
                              className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                            />
                          </div>
                        </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Employee Contribution to NPS u/s 80CCD(1B) (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Interest on Housing Loan Section 24 (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>
                      
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Savings Account Interest (Section 80TTA) (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Professional Tax (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Donation u/s 80G (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">Others (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>


                    </section>
                </ScrollArea>



                  



              </TabsContent>

              {/* TAX PAID */}
              <TabsContent value="tax-paid" className="space-y-4">
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="income">TDS (in ₹)</Label>
                              <Input
                                id="income"
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your annual income"
                                className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                              />
                            </div>
                          </div>

                            <div className="space-y-4">
                              <div className="grid gap-2">
                                <Label htmlFor="income">Advance Tax (in ₹)</Label>
                                <Input
                                  id="income"
                                  type="number"
                                  value={income}
                                  onChange={(e) => setIncome(e.target.value)}
                                  placeholder="Enter your annual income"
                                  className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="grid gap-2">
                                <Label htmlFor="income">Self Assessment Tax (in ₹)</Label>
                                <Input
                                  id="income"
                                  type="number"
                                  value={income}
                                  onChange={(e) => setIncome(e.target.value)}
                                  placeholder="Enter your annual income"
                                  className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                                />
                              </div>
                            </div>
                      
              </TabsContent>
            </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="w-full border-2 bg-white border-gray-200 border-b-4 rounded-lg p-2">
        <CardHeader className="w-full flex flex-row justify-between items-center">
          <CardTitle>Your Tax Calculation Report </CardTitle>
          <Button variant={'ghost'} className="bg-white border-2 w-12 h-12 border-b-4 border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 ">
            <DownloadIcon color="grey" fontWeight={'bolder'} />
          </Button>          
        </CardHeader>


      {/* NEW REGIME DATA */}
      {/* {numericIncome > 0 && ( */}
      <CardContent className="flex flex-col gap-4 p-4 bg-white border-[1.5px] border-b-4 mt-6  border-gray-200 rounded-lg w-full">  

        
            <h3>Your Tax Calculation</h3>
            <section className="flex flex-col gap-4 p-4 bg-white border-[1.5px] border-b-4  border-gray-200 rounded-lg w-full">
                  <div >
                    <h3 className="font-semibold mb-2">New Regime</h3>
                    <div className="space-y-2">
                      <p className="text-sm">{calculation}</p>
                      <p className="text-sm">Taxable Income : ₹{Number(income) - STANDARD_DEDUCTION}</p>
                      <p className="text-lg font-semibold">Total Payable Tax: <span className="text-2xl">₹{totalTax.toLocaleString()}</span></p>
                    </div>
                  </div>

                  <div className="h-[300px] w-full ">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} className="p-6">
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill={totalTax < Number(income) ? "#22c55e" : "#ef4444"} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              {/* )} */}



          {/* OLD REGIME DATA */}
          {/* {numericIncome > 0 && ( */}
          <section className="flex flex-col gap-4 p-4 bg-white border-[1.5px] border-b-4 mt-6  border-gray-200 rounded-lg w-full">
          <div >
                      <h3 className="font-semibold mb-2">Old Regime </h3>
                      <div className="space-y-2">
                        <p className="text-sm">{calculation}</p>
                        <p className="text-sm">Taxable Income : ₹{Number(income) - STANDARD_DEDUCTION}</p>
                        <p className="text-lg font-semibold">Total Payable Tax: <span className="text-2xl">₹{totalTax.toLocaleString()}</span></p>
                      </div>
                    </div>

                    <div className="h-[300px] w-full ">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} className="p-6">
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Bar dataKey="value" fill={totalTax < Number(income) ? "#22c55e" : "#ef4444"} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                {/* )} */}
      </CardContent>
      </div>
      </main>
  )
}


// {numericIncome > 0 && (
//   <>
//     <div className="p-4 bg-white border-[1.5px] border-b-4 border-gray-200 rounded-lg">
//       <h3 className="font-semibold mb-2">Your Tax Calculation</h3>
//       <div className="space-y-2">
//         <p className="text-sm">{calculation}</p>
//         <p className="text-sm">Taxable Income : ₹{Number(income) - STANDARD_DEDUCTION}</p>
//         <p className="text-lg font-semibold">Total Payable Tax: <span className="text-2xl">₹{totalTax.toLocaleString()}</span></p>
//       </div>
//     </div>

//     <div className="h-[300px] w-full ">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={chartData} className="p-6">
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Bar dataKey="value" fill={totalTax < Number(income) ? "#22c55e" : "#ef4444"} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   </>
// )}
