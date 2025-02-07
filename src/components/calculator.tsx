"use client"

import { ChangeEvent, useState } from "react"
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
import dynamic from "next/dynamic"
import { HRACalculator } from "./hra-calculator"
// import DownloadReport from "./download-report"

const DownloadReport = dynamic(() => import("@/components/download-report"), { ssr: false, loading: () => <p>Loading...</p>, })

const CHUNK_SIZE = 400000
const STANDARD_DEDUCTION = 75000

const STANDARD_DEDUCTION_NEW_REGIME = 75000
const STANDARD_DEDUCTION_OLD_REGIME = 50000

// types
interface IncomeDetails {
  annual: string;
  interest: string;
  rental: string;
  others: string;
}

interface DeductionDetails {
  lifeInsurancePremium: string;
  publicProvidentFund: string;
  contributionToProvidentFund: string;
  taxSavingFixedDeposit: string;
  repaymentOfPrincipalOnHousingLoan: string;
  ulipTaxSavingInvestmentPlans: string;
  equityLinkedSavingsSchemes: string;
  employeeContributionToNpsUs80ccd1: string;
  tuitionFees: string;
  selfAndFamily: string;
  preventiveCheckup: string;
  parentsBelow60Years: string;
  parentsAbove60Years: string;
  hraUs1013A: string;
  employeeContributionToNpsUs80ccd1B: string;
  interestOnHousingLoanSection24: string;
  savingsAccountInterestSection80tta: string;
  professionalTax: string;
  donationUs80G: string;
  others: string;
}

interface TaxPaidDetails {
  tds: string;
  advanceTax: string;
  selfAssessmentTax: string;
}



// FY : 2024-25



// FY : 2025-26

const calculateTaxNewRegime = (income: Number) => {
  const taxableIncome = Math.max(0, Number(income) - STANDARD_DEDUCTION_NEW_REGIME)


  if (taxableIncome < 0 ||  taxableIncome <= 1200000) {
    return { calculation: "", totalTax: 0,  standardDeduction : STANDARD_DEDUCTION_NEW_REGIME, taxableIncome }
  }

  
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

  return { calculation, cessAmount : Number(totalTax * 0.04) , standardDeduction : STANDARD_DEDUCTION_NEW_REGIME, taxableIncome, totalTax:  (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) + (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) * 0.04 : Number(totalTax) + Number(totalTax * 0.04) }

}

const calculateTaxOldRegime = (income: Number) => {
  const taxableIncome = Math.max(0, Number(income) - STANDARD_DEDUCTION_OLD_REGIME)

  if(taxableIncome < 0 || taxableIncome < 400000){

  }
  
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

  // totalTaxWithoutCess
// totalTaxWithCess
// newTaxableIncome
// standardDeduction
// gross income
// totadeductioin

// relief
// profit

// return {
//   calculation, 
//   totalTaxWithCess: (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) + (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) * 0.04 : Number(totalTax) + Number(totalTax * 0.04),
//   totalTaxWithoutCess: (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) : Number(totalTax),
//   newTaxableIncome: taxableIncome,
//   standardDeduction: STANDARD_DEDUCTION_OLD_REGIME,
//   grossIncome: Number(income),
//   // totadeductiion: Number(grossIncome) - STANDARD_DEDUCTION_OLD_REGIME,
//   // relief: Number(grossIncome) - STANDARD_DEDUCTION_OLD_REGIME,
//   // profit: Number(grossIncome) - STANDARD_DEDUCTION_OLD_REGIME,
// }


  return { calculation, totalTax: (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) + (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) * 0.04 : Number(totalTax) + Number(totalTax * 0.04) }
}




const calculateTax = (
  income: number
): {
  calculation: string
  totalTax: number
} => {

  console.log('income', income);

  // Need to calculate for old regime and new regime
  const taxableIncomeNewRegime = Math.max(0, income - STANDARD_DEDUCTION_NEW_REGIME)
  const taxableIncomeOldRegime = Math.max(0, income - STANDARD_DEDUCTION_OLD_REGIME)

  console.log('taxableIncomeNewRegime', taxableIncomeNewRegime);
  console.log('taxableIncomeOldRegime', taxableIncomeOldRegime);

  // Need to calculate for new regime

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

  return { calculation, totalTax: (taxableIncome > 1200000 && taxableIncome < 1275000) ? (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) + (Number(totalTax) - (Number(totalTax) - Number((taxableIncome - 1200000)))) * 0.04 : Number(totalTax) + Number(totalTax * 0.04) }
}

export default function Calculator() {
  
  const [financialYear, setFinancialYear] = useState('FY-24-25');

  const [incomeDetails, setIncomeDetails] = useState<IncomeDetails>({
    annual: '',
    interest: '',
    rental: '',
    others: '',
  });
  
  const [deductionDetails, setDeductionDetails] = useState({
    lifeInsurancePremium: '',
    publicProvidentFund: '',
    contributionToProvidentFund: '',
    taxSavingFixedDeposit: '',
    repaymentOfPrincipalOnHousingLoan: '',
    ulipTaxSavingInvestmentPlans: '',
    equityLinkedSavingsSchemes: '',
    employeeContributionToNpsUs80ccd1: '',
    tuitionFees: '',
    selfAndFamily: '',
    preventiveCheckup: '',
    parentsBelow60Years: '',
    parentsAbove60Years: '',
    hraUs1013A: '',
    employeeContributionToNpsUs80ccd1B: '',
    interestOnHousingLoanSection24: '',
    savingsAccountInterestSection80tta: '',
    professionalTax: '',
    donationUs80G: '',
    others: '',
  });

  // MAX DEDUCTIONS - 1.5L
  const [deductions80C, setDeductions80C] = useState({
    lifeInsurancePremium: '',
    publicProvidentFund: '',
    contributionToProvidentFund: '',
    taxSavingFixedDeposit: '',
    repaymentOfPrincipalOnHousingLoan: '',
    ulipTaxSavingInvestmentPlans: '',
    equityLinkedSavingsSchemes: '',
    employeeContributionToNpsUs80ccd1: '',
    tuitionFees: '',
  });

  // MAX DEDUCTIONS - 25,000 (Seniors 50,000) - 5000 (health checkup)
  const [deductions80D, setDeductions80D] = useState({
    selfAndFamily: '',
    preventiveCheckup: '',
    parentsBelow60Years: '',
    parentsAbove60Years: '',
  }); 


  // MAX DEDUCTIONS - 30,000 (Seniors 50,000) - 5000 (health checkup)
  const [deductionsOthers, setDeductionsOthers] = useState({
    hraUs1013A: '',
    employeeContributionToNpsUs80ccd1B: '',
    interestOnHousingLoanSection24: '',
    savingsAccountInterestSection80tta: '',
    professionalTax: '',
    donationUs80G: '',
    others: '',
  }); 


  

  
  const [taxPaidDetails, setTaxPaidDetails] = useState({
    tds: '',
    advanceTax: '',
    selfAssessmentTax: '',
  });


  const calculateTotalIncome = (incomeDetails: IncomeDetails) => {
    let totalIncome = 0;
    for (const key in incomeDetails) {
      const incomeValue = Number(incomeDetails[key as keyof IncomeDetails]) || 0;
      totalIncome += incomeValue;
    }
    return totalIncome;
  };


  console.log('INCOME DETAILS', calculateTotalIncome(incomeDetails));
  const calculateDeduction = (deductionDetails: DeductionDetails) => {
    let totalDeduction = 0;
    for (const key in deductionDetails) {
      const deductionValue = Number(deductionDetails[key as keyof DeductionDetails]) || 0;
      totalDeduction += deductionValue;
    }
    return totalDeduction;
  };


  const calculateTaxPaid = (taxPaidDetails: TaxPaidDetails) => {
    let totalTaxPaid = 0;
    for (const key in taxPaidDetails) {
      const taxPaidValue = Number(taxPaidDetails[key as keyof TaxPaidDetails]) || 0;
      totalTaxPaid += taxPaidValue;
    }
    return totalTaxPaid;
  };

  console.log('TAX PAID DETAILS', calculateTaxPaid(taxPaidDetails));

  const incomeT = calculateTotalIncome(incomeDetails);
  const deductionT = calculateDeduction(deductionDetails);  
  const taxPaidT = calculateTaxPaid(taxPaidDetails);

  const netIncome = incomeT - (deductionT + taxPaidT);

  const { calculation, totalTax, standardDeduction, taxableIncome, cessAmount } = calculateTaxNewRegime(incomeT)
  const {  } = calculateTaxOldRegime(netIncome)

  const chartDataNewRegime = [
    { name: "Taxable Income", value:  Number(netIncome) - STANDARD_DEDUCTION_NEW_REGIME },
    { name: "Payable Tax", value: totalTax },
  ]

  const [age, setAge] = useState<string>("individual");

  const incomeData = [
    { 
      name: "Gross Salary", 
      value: incomeDetails.annual, 
      htmlFor : 'gross', 
      placeholder: 'Enter your gross income from salary', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setIncomeDetails({...incomeDetails, annual: e.target.value})
    },
    { 
      name: "Interest", 
      value: incomeDetails.interest , 
      htmlFor : 'ineteret', 
      placeholder: 'Enter your interest', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setIncomeDetails({...incomeDetails, interest: e.target.value})
    },
    { 
      name: "Rental Income", 
      value: incomeDetails.rental, 
      htmlFor : 'rental', 
      placeholder: 'Enter your rental income', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setIncomeDetails({...incomeDetails, rental: e.target.value})
    },
    { 
      name: "Other Income", 
      value: incomeDetails.others, 
      htmlFor : 'others', 
      placeholder: 'Enter your other income', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setIncomeDetails({...incomeDetails, others: e.target.value})
    },
  ]

  const deductionData80C = [
    {
      name: "Life Insurance Premium", 
      value: deductionDetails.lifeInsurancePremium, 
      htmlFor : 'lifeInsurancePremium', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, lifeInsurancePremium: e.target.value}),
      placeholder: 'Enter amount for life insurance premium'
    },
    {
      name: "Public Provident Fund", 
      value: deductionDetails.publicProvidentFund, 
      htmlFor : 'publicProvidentFund', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, publicProvidentFund: e.target.value}),
      placeholder: 'Enter amount for public provident fund'
    },
    {
      name: "Contribution to Provident Fund", 
      value: deductionDetails.contributionToProvidentFund, 
      htmlFor : 'contributionToProvidentFund', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, contributionToProvidentFund: e.target.value}),
      placeholder: 'Enter amount for contribution to provident fund'
    },
    {
      name: "Tax Saving Fixed Deposit", 
      value: deductionDetails.taxSavingFixedDeposit, 
      htmlFor : 'taxSavingFixedDeposit', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, taxSavingFixedDeposit: e.target.value}),
      placeholder: 'Enter amount for tax saving fixed deposit'
    },
    {
      name: "Repayment of Principal on Housing Loan", 
      value: deductionDetails.repaymentOfPrincipalOnHousingLoan, 
      htmlFor : 'repaymentOfPrincipalOnHousingLoan', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, repaymentOfPrincipalOnHousingLoan: e.target.value}),
      placeholder: 'Enter amount for repayment of principal on housing loan'
    },
    {
      name: "ULIP/ Tax Saving Investment Plans", 
      value: deductionDetails.ulipTaxSavingInvestmentPlans, 
      htmlFor : 'ulipTaxSavingInvestmentPlans', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, ulipTaxSavingInvestmentPlans: e.target.value}),
      placeholder: 'Enter amount for ULIP/ Tax Saving Investment Plans'
    },
    {
      name: "Equity Linked Savings Schemes", 
      value: deductionDetails.equityLinkedSavingsSchemes, 
      htmlFor : 'equityLinkedSavingsSchemes', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, equityLinkedSavingsSchemes: e.target.value}),
      placeholder: 'Enter amount for Equity Linked Savings Schemes'
    },
    {
      name: "Employee Contribution to NPS u/s 80CCD(1)", 
      value: deductionDetails.employeeContributionToNpsUs80ccd1, 
      htmlFor : 'employeeContributionToNpsUs80ccd1', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, employeeContributionToNpsUs80ccd1: e.target.value}),
      placeholder: 'Enter amount for Employee Contribution to NPS u/s 80CCD(1)'
    },
    {
      name: "Tuition Fees", 
      value: deductionDetails.tuitionFees, 
      htmlFor : 'tuitionFees', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, tuitionFees: e.target.value}),
      placeholder: 'Enter amount for Tuition Fees'
    },
  ]

  const deductionData80D = [
    {
      name: "For Self and Family", 
      value: deductionDetails.selfAndFamily, 
      htmlFor : 'selfAndFamily', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, selfAndFamily: e.target.value}),
      placeholder: 'Enter amount for Self and Family'
    },
    {
      name: "Preventive Checkup", 
      value: deductionDetails.preventiveCheckup, 
      htmlFor : 'preventiveCheckup', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, preventiveCheckup: e.target.value}),
      placeholder: 'Enter amount for Preventive Checkup'
    },
    {
      name: "For Parents below 60 Years", 
      value: deductionDetails.parentsBelow60Years, 
      htmlFor : 'parentsBelow60Years', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, parentsBelow60Years: e.target.value}),
      placeholder: 'Enter amount for parents below 60 years'
    },
    {
      name: "For Parents above 60 Years", 
      value: deductionDetails.parentsAbove60Years, 
      htmlFor : 'parentsAbove60Years', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, parentsAbove60Years: e.target.value}),
      placeholder: 'Enter amount for parents above 60 years'
    },
  ]

  const deductionDataOthers = [
    {
      name: "HRA u/s 10 (13A)", 
      value: deductionDetails.hraUs1013A, 
      htmlFor : 'hraUs1013A', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, hraUs1013A: e.target.value}),
      placeholder: 'Enter amount for HRA u/s 10 (13A)'
    },
    {
      name: "Employee Contribution to NPS u/s 80CCD(1B)", 
      value: deductionDetails.employeeContributionToNpsUs80ccd1B, 
      htmlFor : 'employeeContributionToNpsUs80ccd1B', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, employeeContributionToNpsUs80ccd1B: e.target.value}),
      placeholder: 'Enter amount for Employee Contribution to NPS u/s 80CCD(1B)'
    },
    {
      name: "Interest on Housing Loan Section 24", 
      value: deductionDetails.interestOnHousingLoanSection24, 
      htmlFor : 'interestOnHousingLoanSection24', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, interestOnHousingLoanSection24: e.target.value}),
      placeholder: 'Enter amount for Interest on Housing Loan Section 24'
    },
    {
      name: "Savings Account Interest (Section 80TTA)", 
      value: deductionDetails.savingsAccountInterestSection80tta, 
      htmlFor : 'savingsAccountInterestSection80tta', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, savingsAccountInterestSection80tta: e.target.value}),
      placeholder: 'Enter amount for Savings Account Interest (Section 80TTA)'
    },
    {
      name: "Professional Tax", 
      value: deductionDetails.professionalTax, 
      htmlFor : 'professionalTax', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, professionalTax: e.target.value}),
      placeholder: 'Enter amount for Professional Tax'
    },
    {
      name: "Donation u/s 80G", 
      value: deductionDetails.donationUs80G, 
      htmlFor : 'donationUs80G', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, donationUs80G: e.target.value}),
      placeholder: 'Enter amount for Donation u/s 80G'
    },
    {
      name: "Others", 
      value: deductionDetails.others, 
      htmlFor : 'others', 
      handleChange : (e :  ChangeEvent<HTMLInputElement>) => setDeductionDetails({...deductionDetails, others: e.target.value}),  
      placeholder: 'Enter amount for Others'  
    }
  ]


  return (
    <main className="container  w-full py-6 px-4 grid grid-cols-1 lg:grid-cols-5 gap-8 justify-between">    
      <Card className="border-b-4 border-gray-200 rounded-lg w-full col-span-3  lg:col-span-2 w-full">
        <CardHeader>
          <CardTitle className="flex flex-col justify-start gap-1">Fill the details below to calculate your tax <br /> <span className="text-sm font-normal text-gray-400">Enter all the details carefully</span></CardTitle>
        </CardHeader>



        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full h-[100%]">
            <TabsList className="grid w-full grid-cols-3 bg-white p-1 mb-10 rounded-t-lg rounded-b-none">
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
            </TabsList>

            {/* BASIC DETAILS */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
               
               
                <div className="grid gap-2">
                  <Label htmlFor="age">Select Financial Year</Label>
                  <Select value={financialYear} onValueChange={(value) => setFinancialYear(value)}>
                    <SelectTrigger className="w-full border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5">
                      <SelectValue placeholder="Financial Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>I want to calculate my taxes for</SelectLabel>
                        <SelectItem value="FY-24-25">FY(Financial Year) 24-25</SelectItem>
                        <SelectItem value="FY-25-26">FY(Financial Year) 25-26</SelectItem> 
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="age">Age Group</Label>
                  <Select value={age} onValueChange={(value) => setAge(value)}>
                    <SelectTrigger className="w-full border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>My Age Group is</SelectLabel>
                        <SelectItem value="individual">Below 60 Years</SelectItem>
                        <SelectItem value="senior">60 Years and below 80 Years</SelectItem>
                        <SelectItem value="super-senior">Above 80 Years</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              
              
              </div>
            </TabsContent>

            {/* INCOME DETAILS */}
            <TabsContent value="income" className="space-y-4">
              <div className="space-y-4">
                {incomeData.map(({ name, value, htmlFor, handleChange, placeholder }) => (
                  <div className="grid gap-2" key={name}>
                    <Label htmlFor={htmlFor}>{name} (in ₹)</Label>
                    <Input
                      id={htmlFor}
                      type="number"
                      value={value}
                      onChange={handleChange}
                      placeholder={placeholder}
                      min={0}
                      className="border-b-4 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-black-500 py-5"
                    />
                  </div>
                ) )}
              </div>
            </TabsContent>


            {/* DEDUCTIONS */}
            <TabsContent value="deductions" >
              <ScrollArea className="h-[500px] w-full">
                <section className="space-y-4">
                  <h2 className="text-lg font-bold ">Under 80C</h2>
                  {deductionData80C.map(({ name, value, htmlFor, handleChange, placeholder }) => (
                    <div className="grid gap-2" key={name}>
                      <Label htmlFor={htmlFor}>{name} (in ₹)</Label>
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
                </section>
                
                <section className="space-y-4 mt-6">
                  <h2 className="text-lg font-bold ">Under 80D</h2>
                  {deductionData80D.map(({ name, value, htmlFor, handleChange, placeholder }) => (
                    <>
                    <div className="grid gap-2" key={name}>
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
                    </>
                  ) )}
                </section>


                <section className="space-y-4 mt-6">
                  <h2 className="text-lg font-bold">Other Deductions</h2>
                  {deductionDataOthers.map(({ name, value, htmlFor, handleChange, placeholder }) => (
                    <div className="grid gap-2" key={name}>
                      <section className="flex justify-between items-center">
                      <Label htmlFor={htmlFor}>{name} (in ₹)</Label>
                      {/* {htmlFor === 'hraUs1013A' && <HRACalculator setHra={setDeductionDetails}/>} */}
                      {htmlFor === 'hraUs1013A' && <HRACalculator />}
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
                </section>
              </ScrollArea>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-b-4 border-gray-200 rounded-lg w-full col-span-3 w-full">
        <CardHeader className="w-full flex flex-row justify-between items-center">
          <CardTitle className="flex flex-col justify-start gap-1">Your Tax Calculation Report <br /> <span className="text-sm font-normal text-gray-400">Click on the download button to download the report</span></CardTitle>
          {/* <Button variant={'ghost'} className="bg-white border-2 w-12 h-12 border-b-4 border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 ">
            <DownloadIcon color="grey" fontWeight={'bolder'} />
          </Button> */}

          <DownloadReport
            income={1000000}
            effectiveIncome={2000000}
            newRegime={{ calculation: '232323',
              totalTax: 1000
            }}
            oldRegime={{ calculation: '232323',
              totalTax: 1000
            }}
          />
        </CardHeader>


        {/* NEW REGIME DATA */}
        <div className="flex flex-col gap-4 p-4 bg-white  border-gray-200 rounded-lg w-full">

          <Tabs defaultValue="newregime" className="w-full h-100 rounded-xl ">
            <TabsList className="grid w-full grid-cols-2 p-2 h-100 rounded-xl bg-white border-2 border-gray-200 border-b-4 ">
              <TabsTrigger value="newregime" className="p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">New Regime ✨</TabsTrigger>
              <TabsTrigger value="oldregime" className="p-4  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Old Regime 🏦</TabsTrigger>
            </TabsList>

            <TabsContent value="newregime" className="mt-6">
              <section className="flex flex-col gap-4 p-4 bg-white border-[1.5px] border-b-4  border-gray-200 rounded-lg w-full">
                <div >
                <h3 className="font-semibold mb-2">New Regime <br/> 
                  <span className="text-sm font-normal text-gray-400">Lorem ipsum dolor sit amet.</span> 
                  </h3>
                  <section className="w-full grid lg:grid-cols-2 gap-4 justify-between items-center">

                    <div className="h-[300px] w-full ">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataNewRegime} className="p-6">
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) =>
                            new Intl.NumberFormat("en-IN", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(value)
                          }/>
                          <Bar dataKey="value" fill={"#22c55e"} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>


                    <section className="w-full grid grid-cols-2 gap-4 justify-between items-center">
                      <div className="flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Tax Payable</h3>
                        <p className="text-lg font-semibold">{totalTax === 0 && 'No tax to pay'} ₹{Number(totalTax).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Taxable Income</h3>
                        <p className="text-lg font-semibold">₹{taxableIncome ? Number(taxableIncome).toLocaleString('en-IN') : '0'}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Deduction</h3>
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                      <div className= "flex flex-col justify-betweenh-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Standard Deduction</h3>
                        <p className="text-lg font-semibold">₹{Number(standardDeduction).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">cess amount at 4%</h3>
                        <p className="text-lg font-semibold">₹{cessAmount ? Number(cessAmount).toLocaleString('en-IN') : '0'}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className=" text-sm">Profit</h3>
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                    </section>
                  </section>


                </div>

              </section>
            </TabsContent>

            <TabsContent value="oldregime" className="mt-6">
              <section className="flex flex-col gap-4 p-4 bg-white border-[1.5px] border-b-4 mt-6  border-gray-200 rounded-lg w-full">
                <div>
                  <h3 className="font-semibold mb-2">Old Regime <br/> 
                  <span className="text-sm font-normal text-gray-400">Lorem ipsum dolor sit amet.</span> 
                  </h3>
                 
                  <section className="w-full grid lg:grid-cols-2 gap-4 justify-between items-center">

                    <div className="h-[300px] w-full ">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataNewRegime} className="p-6">
                          <XAxis dataKey="name" />
                          <YAxis  tickFormatter={(value) =>
                            new Intl.NumberFormat("en-IN", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(value)
                          }/>
                          <Bar dataKey="value" fill={"#22c55e"} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  
                    <section className="w-full grid grid-cols-2 gap-4 justify-between items-center">
                      <div className=" flex flex-col justify-between  h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Tax Payable</h3>
                        <p className="text-lg font-semibold">₹{Number('1000000').toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Taxable Income</h3>
                        <p className="text-lg font-semibold">₹{Number('125789000').toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Total Deduction</h3>
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-betweenh-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">Standard Deduction</h3> 
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-between h-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className="text-sm">with CESS at 4%</h3>
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-col justify-betweenh-[100px] border-[1.5px] border-b-4  border-gray-200 rounded-lg p-2">
                        <h3 className=" text-sm">Profit</h3>
                        <p className="text-lg font-semibold">₹{Number(netIncome).toLocaleString('en-IN')}</p>
                      </div>
                    </section>
                 </section>
                </div>

              </section>
            </TabsContent>
          </Tabs>
        </div>
      </Card>


    </main>
  )
}

