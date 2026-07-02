export default function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
