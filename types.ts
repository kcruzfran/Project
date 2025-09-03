
export interface ProductUnit {
  id: string;
  name: string;
  sellingPrice: number;
  costPerUnit: number;
  unitsSold: number;
}

export interface CalculatorInputs {
  productUnits: ProductUnit[];
  shippingCosts: number;
  taxRate: number;
}

export interface CalculationResults {
  revenue: number;
  cogs: number;
  grossProfit: number;
  netProfitBeforeTax: number;
  incomeTax: number;
  netProfitAfterTax: number;
}
