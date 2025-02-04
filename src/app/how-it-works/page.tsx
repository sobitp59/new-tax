// pages/tax-info.js
import Navbar from '@/components/navbar';
import { Card } from '@/components/ui/card';
import React from 'react';

export default function HowItWorks() {

  return (

    <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container w-full lg:max-w-[900px] mx-auto py-6 px-4">
            <Card className='p-10'>
                <h1 className="text-2xl font-bold mb-4">New Income Tax Regime</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Key Points</h2>
                    <ul className="list-disc pl-6">
                    <li>No tax up to ₹12.75 lakhs for salaried individuals (including standard deduction of ₹75,000)</li>
                    <li>No tax up to ₹12 lakhs for non-salaried individuals</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Tax Calculation (for income above the tax-free limit)</h2>
                    <p className="mb-2">The following tax rates apply to income exceeding the tax-free limit:</p>
                    <ul className="list-disc pl-6">
                    <li>First ₹4 lakh: No tax (0%)</li>
                    <li>₹4-8 lakh: 5%</li>
                    <li>₹8-12 lakh: 10%</li>
                    <li>₹12-16 lakh: 15%</li>
                    <li>₹16-20 lakh: 20%</li>
                    <li>Above ₹20 lakh: 25%</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground"><strong>Note:</strong> A standard deduction of ₹75,000 is available for salaried individuals, effectively making their tax-free limit ₹12.75 lakhs.</p>
                </div>
            </Card>
          </main>
          </div>
    // <div className="container mx-auto p-4">

     
    // </div>
  );
};

