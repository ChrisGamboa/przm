import React from "react";
import { JobDetailsClient } from "./JobDetailsClient";
import { getJobDetails } from "./functions";

interface JobDetailsPageProps {
  params: { id: string };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id: jobId } = params;

  // Server-side data fetching
  let job;
  let error = null;

  try {
    job = await getJobDetails(jobId);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load job details";
  }

  // Handle job not found or error state
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {error === "Job not found" ? "Job Not Found" : "Error"}
          </h1>
          <p className="text-gray-600 mb-4">
            {error || "Unable to load job details at this time."}
          </p>
          <a
            href="/jobs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </a>
        </div>
      </div>
    );
  }

  return <JobDetailsClient job={job} />;
}
