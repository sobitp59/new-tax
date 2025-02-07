"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChangeEvent, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"


export function HRACalculator() {

    const [hraData, setHraData] = useState({
        basic: '',
        dearness: '',
        hra: '',
        rent: '',
        isTierOneCities : true,
    })

     const hraDetails = [
        { 
          name: "Gross income", 
          value: hraData.basic,  
          htmlFor : 'basic', 
          placeholder: 'Enter your gross income from salary', 
          handleChange : (e :  ChangeEvent<HTMLInputElement>) => setHraData({...hraData, basic: e.target.value})
        },
        { 
          name: "Dear Allowance Recieved ", 
          value: hraData.dearness,  
          htmlFor : 'dearness', 
          placeholder: 'Enter your dear allowance', 
          handleChange : (e :  ChangeEvent<HTMLInputElement>) => setHraData({...hraData, dearness: e.target.value})
        },
        { 
          name: "HRA Recieved ", 
          value: hraData.hra,  
          htmlFor : 'hra', 
          placeholder: 'Enter your HRA',
          handleChange : (e :  ChangeEvent<HTMLInputElement>) => setHraData({...hraData, hra: e.target.value})
        },
        { 
          name: "Total Rent Paid ", 
          value: hraData.rent,  
          htmlFor : 'rent', 
          placeholder: 'Enter your total rent paid',
          handleChange : (e :  ChangeEvent<HTMLInputElement>) => setHraData({...hraData, rent: e.target.value})
        },
      ]


      console.log('HRA DETAILS', hraData);

    //   function to calculate hra
    const CalculateHRA = (basicSalary: number, dearness: number, hra: number, rent: number, isTierOneCities: boolean) => {
        const basicSalaryReceived = Number(basicSalary);
        const dearnessReceived = Number(dearness);
        const hraReceived = Number(hra);
        const rentPaid = Number(rent);

        // if(!basicSalaryReceived || !hraReceived || !rentPaid){
        if(!basicSalaryReceived){
            return {
                salaryBasedOnTierOfCities: 0, 
                salaryPercentageBasedOnTierOfCities: 0,
                totalRentPaid: 0, 
                totalDearness: 0,
                totalBasicSalary: 0,
                totalHra: 0,
                hraChargeableOfTax : 0,
                exmptedHra: 0,
                rentPaidInExcessOf10PercentOfSalary: 0,
            };
        }

        const salaryPercentage = Number(hraData.isTierOneCities ? basicSalaryReceived * 0.5 : basicSalaryReceived * 0.4); 
        const rentPaidInExcessOf10PercentOfSalary = Math.max(0, rentPaid - (basicSalaryReceived * 0.1));

        
        const exemptedHra = Math.min(hra, salaryPercentage, rentPaidInExcessOf10PercentOfSalary);
        const hraChargeableOfTax = Math.min(hra, salaryPercentage, rentPaidInExcessOf10PercentOfSalary);


        // setHra((prev : any ) => ({...prev, hraUs1013A : hra - hraChargeableOfTax}));

        return {
            salaryBasedOnTierOfCities: salaryPercentage, 
            salaryPercentageBasedOnTierOfCities: salaryPercentage,
            totalRentPaid: rentPaid, 
            totalDearness: dearnessReceived,
            totalBasicSalary: basicSalaryReceived,
            totalHra: hraReceived,
            hraChargeableOfTax : hra -  hraChargeableOfTax,
            exmptedHra: exemptedHra,
            rentPaidInExcessOf10PercentOfSalary: 10000,
        };
    }

    const  {
        salaryBasedOnTierOfCities, 
        totalRentPaid, 
        totalDearness,
        totalBasicSalary,
        totalHra,
        hraChargeableOfTax,
        exmptedHra,
        rentPaidInExcessOf10PercentOfSalary
    } = CalculateHRA(Number(hraData.basic) || 0, Number(hraData.dearness) || 0, Number(hraData.hra) || 0, Number(hraData.rent) || 0, hraData.isTierOneCities);  

    return (
        <Sheet >
            <SheetTrigger asChild>
                <p className="text-xs cursor-pointer border-[1px] border-gray-200 border-b-2 rounded-sm p-1 hover:bg-gray-100">Calculate HRA</p>
            </SheetTrigger>



                <SheetContent side={'bottom'} className="h-[70vh]  w-full  items-start gap-10">
            <ScrollArea className="h-full w-full">
        
                    <div className="w-full ">
                        <SheetHeader className="mb-10">
                            <SheetTitle>Calculate Home Rate Allowance(HRA)</SheetTitle>
                            <SheetDescription className="text-sm font-normal text-gray-400">
                                Get your Home Rate Allowance(HRA) calculation details here
                            </SheetDescription>
                        </SheetHeader>
 
                        <section className="grid  lg:grid-cols-3 gap-6 justify-start">
                            <div className="col-span-3 lg:col-span-1 gap-4 py-4 border-[1.5px] border-gray-200 border-b-4 rounded-lg px-4">
                                {hraDetails.map(({ name, value, htmlFor, handleChange, placeholder }) => (
                                    <div className="grid gap-2 py-2" key={name}>
                                        <section className="flex justify-between items-center">
                                            <Label htmlFor={htmlFor}>{name} (in ₹)</Label>
                                        </section>
                                        <Input
                                            id={htmlFor}
                                            type="number"
                                            value={value}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                                            min={0}
                                        />
                                    </div>
                                ) )}

                                <div className="grid gap-2" key={'city'}>
                                    <section className="flex justify-between items-center py-2">
                                        <Label htmlFor={'city'}>Do you live in Delhi, Mumbai, Kolkata or Chennai?</Label>
                                    </section>
                                    <RadioGroup defaultValue="yes" className="flex mt-2 gap-10" onValueChange={(value) => setHraData({...hraData, isTierOneCities: value === 'yes'})}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="option-one" />
                                            <Label htmlFor="yes">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="option-two" />
                                            <Label htmlFor="no">No</Label>
                                        </div>
                                    </RadioGroup>

                                </div>
                            </div>


                            <div className="w-full col-span-3 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 h-[100%] p-6 col-span-2 border-[1.5px] border-gray-200 border-b-4 rounded-lg">
                                <section>
                                    <h1 className="text-lg font-semibold">HRA Report</h1>
                                    <p className="text-sm font-normal text-gray-400">Taxable HRA is the minimum of your HRA, 50% or 40% (based on your location) of your salary and total rent paid minus 10% of your salary.</p>
                                    <HRAChart exemption={Number(exmptedHra)} taxable={Number(hraChargeableOfTax)} />
                                </section>

                                {/* const hraChargeableOfTax = Math.min(hra, salaryPercentage, rentPaidInExcessOf10PercentOfSalary); */}


                                <section className="mt-10">
                                    <section className="w-full mt-6 grid grid-cols-2 gap-4 justify-between items-center">
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">Actual HRA Received (in ₹)</h3>
                                            <p className="text-lg font-semibold">₹{Number(totalHra).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">{hraData.isTierOneCities ? '50%' : '40%'} of Basic Salary</h3>
                                            <p className="text-lg font-semibold">₹{Number(salaryBasedOnTierOfCities).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">Rent Paid in excess of 10% of salary</h3>
                                            <p className="text-lg font-semibold">₹{Number(rentPaidInExcessOf10PercentOfSalary).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">Total rent paid</h3>
                                            <p className="text-lg font-semibold">₹{Number(totalRentPaid).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">Amount of exempted HRA</h3>
                                            <p className="text-lg font-semibold">₹{Number(exmptedHra).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                                            <h3 className="text-sm">HRA Chargeable of Tax</h3>
                                            <p className="text-lg font-semibold">₹{Number(hraChargeableOfTax).toLocaleString('en-IN')}</p>
                                        </div>

                                    </section>
                                </section>
                            </div>
                        </section>
                    </div>



            </ScrollArea>
                </SheetContent>
        </Sheet>
    )
}














const chartData = [
    { hra: "Home Rate Allowance", exemption: 180000, taxable: 120000 },
]

const chartConfig = {
    exemption: {
        label: "Exempted HRA",
        color: "black",
    },
    taxable: {
        label: "Taxable HRA",
        color: "gray",
    },
} satisfies ChartConfig


interface HRAChartProps {
    exemption: number;
    taxable: number;
}

export function HRAChart({exemption, taxable} : HRAChartProps) {
    return (
        <ChartContainer config={chartConfig} className="h-full w-full p-3 lg:p-10">
            <BarChart accessibilityLayer data={[{ hra: "Home Rate Allowance", exemption: exemption, taxable: taxable }]}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="hra"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                //   tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="exemption" fill="var(--color-exemption)" radius={4} />
                <Bar dataKey="taxable" fill="var(--color-taxable)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
