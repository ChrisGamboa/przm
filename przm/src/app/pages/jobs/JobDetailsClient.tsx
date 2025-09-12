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
    if (typeof window !== "undefined") {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback to jobs page
        window.location.href = "/jobs";
      }
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
    // For now, show an alert - this will be implemented later
    alert("On-scene data collection feature coming soon!");
    // Future implementation: window.location.href = `/jobs/${jobId}/on-scene-data`;
  };

  const handleProcessDropoff = (jobId: string) => {
    // For now, show an alert - this will be implemented later
    alert("Dropoff processing feature coming soon!");
    // Future implementation: window.location.href = `/jobs/${jobId}/dropoff`;
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
