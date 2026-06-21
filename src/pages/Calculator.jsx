import { useCalculator } from "../hooks/useCalculator";
import PriceInput from "../components/PriceInput";

function ResultRow({ label, value, isTotal }) {
  return (
    <div
      className={`flex justify-between rounded-lg px-4 py-2 ${isTotal ? "bg-indigo-100 font-bold text-indigo-900" : "bg-gray-50 text-gray-800"}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function Calculator() {
  const {
    workDays,
    budgetPerDay,
    results,
    setWorkDays,
    setBudgetPerDay,
    calculate,
    reset,
  } = useCalculator();

  const hasResults = results !== null;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4">
      <div className="w-full space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Price Calculator</h1>

        <PriceInput
          label="Estimated work days"
          value={workDays}
          onChange={setWorkDays}
          placeholder="e.g. 20"
        />

        <PriceInput
          label="Budget per day"
          value={budgetPerDay}
          onChange={setBudgetPerDay}
          placeholder="e.g. 500"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Calculate
          </button>

          {hasResults && (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          )}
        </div>

        {hasResults && (
          <div className="space-y-2 border-t border-gray-200 pt-6">
            <ResultRow label="Base Price" value={results.basePrice} />
            <ResultRow label="ISR (35%)" value={results.isr} />
            <ResultRow label="Subtotal" value={results.subtotal} />
            <ResultRow label="IVA (16%)" value={results.iva} />
            <ResultRow label="Final Price" value={results.finalPrice} isTotal />
          </div>
        )}
      </div>
    </main>
  );
}
