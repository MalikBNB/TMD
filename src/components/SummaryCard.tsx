interface SummaryCardProps {
  label: string;
  status: string;
  value: number;
}

export default function SummaryCard({
  label,
  status,
  value,
}: SummaryCardProps) {
  const statusColors: Record<string, string> = {
    total: "text-blue-600",
    todo: "text-red-600",
    inProgress: "text-green-600",
    done: "text-gray-500",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <p className={`text-4xl font-bold ${statusColors[status]}`}>{value}</p>
      <p className={`text-sm font-medium ${statusColors[status]} mt-1`}>
        {label}
      </p>
    </div>
  );
}
