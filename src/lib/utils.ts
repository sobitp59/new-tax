import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);

  if (isNaN(num)) {
    return "Invalid input"; 
  }

  return num.toLocaleString('en-IN'); 
};