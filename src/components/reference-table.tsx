import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const INCOME_LEVELS = [
  { income: 13, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (1L * 15%)", tax: 75000 },
  { income: 14, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (2L * 15%)", tax: 90000 },
  { income: 15, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (3L * 15%)", tax: 105000 },
  { income: 16, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%)", tax: 120000 },
  { income: 17, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (1L * 20%)", tax: 140000 },
  { income: 18, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (2L * 20%)", tax: 160000 },
  { income: 19, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (3L * 20%)", tax: 180000 },
  { income: 20, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%)", tax: 200000 },
  { income: 21, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%) + (1L * 25%)", tax: 225000 },
  { income: 22, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%) + (2L * 25%)", tax: 250000 },
  { income: 23, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%) + (3L * 25%)", tax: 275000 },
  { income: 24, calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%) + (4L * 25%)", tax: 300000 },
  {
    income: 25,
    calculation: "(4L * 0%) + (4L * 5%) + (4L * 10%) + (4L * 15%) + (4L * 20%) + (4L * 25%) + (1L * 30%)",
    tax: 330000,
  },
]

export default function ReferenceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Reference Table (New Regime)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Income (₹ Lakh)</TableHead>
              <TableHead>Tax Calculation</TableHead>
              <TableHead className="text-right">Total Tax (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INCOME_LEVELS.map((level) => (
              <TableRow key={level.income}>
                <TableCell>{level.income} L</TableCell>
                <TableCell className=" text-sm">{level.calculation}</TableCell>
                <TableCell className="text-right">₹{level.tax.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

