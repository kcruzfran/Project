
import React, { useState, useMemo, useCallback } from 'react';
import { CalculatorInputs, CalculationResults, ProductUnit } from './types';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    productUnits: [
      { id: crypto.randomUUID(), name: 'FidgiPop Classic', sellingPrice: 15, unitsSold: 100, costPerUnit: 5 }
    ],
    shippingCosts: 50,
    taxRate: 20,
  });

  const handleUnitChange = useCallback((index: number, field: keyof Omit<ProductUnit, 'id'>, value: string | number) => {
    setInputs(prev => {
      const newUnits = [...prev.productUnits];
      const unitToUpdate = { ...newUnits[index] };
      (unitToUpdate as any)[field] = value;
      newUnits[index] = unitToUpdate;
      return { ...prev, productUnits: newUnits };
    });
  }, []);

  const handleAddUnit = useCallback(() => {
    setInputs(prev => ({
      ...prev,
      productUnits: [
        ...prev.productUnits,
        { id: crypto.randomUUID(), name: 'New Product', sellingPrice: 10, unitsSold: 50, costPerUnit: 3 }
      ]
    }));
  }, []);

  const handleRemoveUnit = useCallback((index: number) => {
    setInputs(prev => ({
      ...prev,
      productUnits: prev.productUnits.filter((_, i) => i !== index),
    }));
  }, []);

  const handleGlobalInputChange = useCallback((field: 'shippingCosts' | 'taxRate', value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const results: CalculationResults = useMemo(() => {
    const revenue = inputs.productUnits.reduce((acc, unit) => acc + unit.sellingPrice * unit.unitsSold, 0);
    const cogs = inputs.productUnits.reduce((acc, unit) => acc + unit.costPerUnit * unit.unitsSold, 0);
    
    const grossProfit = revenue - cogs;
    const netProfitBeforeTax = grossProfit - inputs.shippingCosts;
    const incomeTaxAmount = netProfitBeforeTax > 0 ? (netProfitBeforeTax * inputs.taxRate) / 100 : 0;
    const netProfitAfterTax = netProfitBeforeTax - incomeTaxAmount;

    return {
      revenue,
      cogs,
      grossProfit,
      netProfitBeforeTax,
      incomeTax: incomeTaxAmount,
      netProfitAfterTax,
    };
  }, [inputs]);

  return (
    <div className="bg-slate-900 min-h-screen text-white antialiased">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: 'url(https://picsum.photos/seed/fidgipopbg/1920/1080)'}}
      ></div>
      <div className="relative isolate min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
        <Header />
        <main className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm 
              inputs={inputs} 
              onUnitChange={handleUnitChange}
              onAddUnit={handleAddUnit}
              onRemoveUnit={handleRemoveUnit}
              onGlobalInputChange={handleGlobalInputChange} 
            />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay results={results} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
