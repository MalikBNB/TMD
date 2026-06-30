interface SummaryCardProps {
  label: string;
  value: number;
}

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
    </div>
  );
}
