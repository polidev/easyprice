export default function ResultRow({ label, value, isTotal }) {
  return (
    <div
      className={`flex justify-between rounded-lg px-4 py-2 ${isTotal ? "bg-indigo-100 font-bold text-indigo-900" : "bg-gray-50 text-gray-800"}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
