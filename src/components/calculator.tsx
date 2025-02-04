"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const CHUNK_SIZE = 400000 
const STANDARD_DEDUCTION = 75000

const calculateTax = (
  income: number,
  isSalaried: boolean,
): {
  calculation: string
  totalTax: number
} => {
  const taxableIncome = isSalaried ? Math.max(0, income - STANDARD_DEDUCTION) : income
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
    calculation += ` + (${Math.ceil(chunk15 / 100000)}L * 15%)`
  }

  // Next 4L (20%)
  if (remainingIncome > 0) {
    const chunk20 = Math.min(CHUNK_SIZE, remainingIncome)
    remainingIncome -= chunk20
    totalTax += chunk20 * 0.2
    calculation += ` + (${Math.ceil(chunk20 / 100000)}L * 20%)`
  }

  // Apply rebate for income up to 12L
  if (taxableIncome <= 1200000) {
    if (taxableIncome > 800000) {
      totalTax = Math.max(0, totalTax - 80000) 
    } else if (taxableIncome > 0) {
      totalTax = Math.max(0, totalTax - 10000) 
    }
  }

  return { calculation, totalTax }
}

export default function Calculator() {
  const [income, setIncome] = useState<string>("")
  const [isSalaried, setIsSalaried] = useState(false)

  const numericIncome = Number(income) || 0
  const { calculation, totalTax } = calculateTax(numericIncome, isSalaried)

  const chartData = [
    { name: "Taxable Income", value: Number(income) - STANDARD_DEDUCTION },
    { name: "Payable Tax", value: totalTax },
  ]

  return (
    <Card>
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

        {numericIncome > 0 && (
          <>
            <div className="p-4 bg-white border-[1.5px] border-b-4 border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Your Tax Calculation</h3>
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
          </>
        )}
      </CardContent>
    </Card>
  )
}

