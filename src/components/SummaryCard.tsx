interface SummaryCardProps {
  label: string;
  value: number;
  status: "total" | "todo" | "inProgress" | "done";
}

export default function SummaryCard({
  label,
  status,
  value,
}: SummaryCardProps) {
  const statusColors: Record<SummaryCardProps["status"], string> = {
    total: "text-yellow-600",
    todo: "text-gray-600",
    inProgress: "text-blue-600",
    done: "text-green-500",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <p className={`text-4xl font-bold ${statusColors[status]}`}>{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
    </div>
  );
}
