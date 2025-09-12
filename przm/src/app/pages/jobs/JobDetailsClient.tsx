"use client";

import React from "react";
import { JobDetailsScreen } from "@/app/components/ui/JobDetailsScreen";
import { Job, JobStatus } from "@/app/types/job";
import { updateJobStatus } from "./functions";

interface JobDetailsClientProps {
  job: Job;
}

export function JobDetailsClient({ job }: JobDetailsClientProps) {
  const handleBack = () => {
    // Always navigate back to the jobs list page
    if (typeof window !== "undefined") {
      window.location.href = "/jobs";
    }
  };

  const handleUpdateStatus = async (jobId: string, newStatus: JobStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      // Refresh the page to show updated status
      window.location.reload();
    } catch (error) {
      console.error("Failed to update job status:", error);
      alert("Failed to update job status. Please try again.");
    }
  };

  const handleCollectOnSceneData = (jobId: string) => {
    // Navigate to the on-scene data collection page
    window.location.href = `/jobs/${jobId}/on-scene-data-collection`;
  };

  const handleProcessDropoff = (jobId: string) => {
    // Navigate to the dropoff and payment processing page
    window.location.href = `/jobs/${jobId}/dropoff-payment`;
  };

  return (
    <JobDetailsScreen
      job={job}
      onBack={handleBack}
      onUpdateStatus={handleUpdateStatus}
      onCollectOnSceneData={handleCollectOnSceneData}
      onProcessDropoff={handleProcessDropoff}
    />
  );
}
