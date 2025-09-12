import { Suspense } from "react";
import { getJobsForUser } from "./functions";
import { JobQueueClient } from "./JobQueueClient";
import { JobQueueSkeleton } from "@/app/components/ui/JobQueueSkeleton";

/**
 * Server Component that fetches job data and renders the job queue
 */
export async function JobQueuePage() {
  try {
    const jobs = await getJobsForUser();
    
    return (
      <Suspense fallback={<JobQueueSkeleton />}>
        <JobQueueClient jobs={jobs} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading job queue:", error);
    
    return (
      <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Unable to Load Job Queue
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            There was an error loading your jobs. Please try again.
          </p>
          <button 
            // onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}
