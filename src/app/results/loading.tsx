import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-16" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-80 rounded-lg" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-80 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
