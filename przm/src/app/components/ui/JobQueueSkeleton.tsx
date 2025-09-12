import { Skeleton } from "@/app/components/ui/skeleton";
import { Card } from "@/app/components/ui/card";

/**
 * Loading skeleton for the job queue screen
 */
export function JobQueueSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-8" />
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-8" />
          </Card>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 pb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>

      {/* Sort Options Skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-12" />
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards Skeleton */}
      <div className="flex-1 p-4 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Loading skeleton for individual job cards
 */
function JobCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5" />
          <div>
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      <div className="mb-3">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </Card>
  );
}
