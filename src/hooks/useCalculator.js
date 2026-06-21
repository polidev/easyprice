import { useState } from "react";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const INITIAL = { workDays: "", budgetPerDay: "" };

export function useCalculator() {
  const [inputs, setInputs] = useState(INITIAL);
  const [results, setResults] = useState(null);

  const setWorkDays = (value) =>
    setInputs((prev) => ({ ...prev, workDays: value }));

  const setBudgetPerDay = (value) =>
    setInputs((prev) => ({ ...prev, budgetPerDay: value }));

  const calculate = () => {
    const days = Number(inputs.workDays);
    const rate = Number(inputs.budgetPerDay);

    if (!days || !rate) return;

    const basePrice = days * rate;
    const isr = basePrice * 0.35;
    const subtotal = basePrice + isr;
    const iva = subtotal * 0.16;
    const finalPrice = subtotal + iva;

    setResults({
      workDays: days,
      budgetPerDay: rate,
      basePrice: currency.format(basePrice),
      isr: currency.format(isr),
      subtotal: currency.format(subtotal),
      iva: currency.format(iva),
      finalPrice: currency.format(finalPrice),
      raw: { basePrice, isr, subtotal, iva, finalPrice },
    });
  };

  const reset = () => {
    setInputs(INITIAL);
    setResults(null);
  };

  return {
    ...inputs,
    setWorkDays,
    setBudgetPerDay,
    results,
    calculate,
    reset,
  };
}
