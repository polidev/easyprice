export default function PriceInput({ label, value, onChange, placeholder }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </label>
  );
}
