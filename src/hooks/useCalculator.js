import { useState } from "react";

/** MXN currency formatter (e.g. $1,234.56) */
const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const INITIAL_INPUTS = { workDays: "", budgetPerDay: "" };

/**
 * Manages the state and logic for the price calculator.
 *
 * Accepts user inputs for work days and budget per day, then on
 * `calculate()` derives:
 *
 * | Field      | Formula                      |
 * |------------|------------------------------|
 * | Base Price | days × rate                  |
 * | ISR (35%)  | 0.35 × basePrice             |
 * | Subtotal   | basePrice + ISR              |
 * | IVA (16%)  | 0.16 × subtotal              |
 * | Final Price| subtotal + IVA               |
 *
 * @returns {{
 *   workDays: string,
 *   budgetPerDay: string,
 *   setWorkDays: (value: string) => void,
 *   setBudgetPerDay: (value: string) => void,
 *   results: null | {
 *     workDays: number,
 *     budgetPerDay: number,
 *     basePrice: string,
 *     isr: string,
 *     subtotal: string,
 *     iva: string,
 *     finalPrice: string,
 *     raw: { basePrice, isr, subtotal, iva, finalPrice }
 *   },
 *   calculate: () => void,
 *   reset: () => void,
 * }}
 */

export function useCalculator() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const [results, setResults] = useState(null);

  /** Update the work-days input value. */
  const setWorkDays = (value) =>
    setInputs((prev) => ({ ...prev, workDays: value }));

  /** Update the budget-per-day input value. */
  const setBudgetPerDay = (value) =>
    setInputs((prev) => ({ ...prev, budgetPerDay: value }));

  /**
   * Validate inputs, compute all derived values and store formatted results.
   * Does nothing when either input is missing or zero.
   */
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

  /** Clear both inputs and hide results. */
  const reset = () => {
    setInputs(INITIAL_INPUTS);
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
