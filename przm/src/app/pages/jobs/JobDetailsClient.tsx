"use client";

import React from "react";
import { JobDetailsScreen } from "@/app/components/ui/JobDetailsScreen";
import { Job, JobStatus } from "@/app/types/job";
import { updateJobStatus, acceptJob, declineJob } from "./functions";

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

  const handleAcceptJob = async (jobId: string) => {
    try {
      await acceptJob(jobId);
      // Refresh the page to show updated status (now "en_route")
      window.location.reload();
    } catch (error) {
      console.error("Failed to accept job:", error);
      alert("Failed to accept job. Please try again.");
    }
  };

  const handleDeclineJob = async (jobId: string) => {
    try {
      await declineJob(jobId);
      // Navigate back to the jobs list after declining
      window.location.href = "/jobs";
    } catch (error) {
      console.error("Failed to decline job:", error);
      alert("Failed to decline job. Please try again.");
    }
  };

  return (
    <JobDetailsScreen
      job={job}
      onBack={handleBack}
      onUpdateStatus={handleUpdateStatus}
      onCollectOnSceneData={handleCollectOnSceneData}
      onProcessDropoff={handleProcessDropoff}
      onAcceptJob={handleAcceptJob}
      onDeclineJob={handleDeclineJob}
    />
  );
}
