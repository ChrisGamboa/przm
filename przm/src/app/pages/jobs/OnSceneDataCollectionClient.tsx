"use client";

import React from "react";
import { OnSceneDataCollectionScreen } from "@/app/components/ui/OnSceneDataCollectionScreen";
import { Job } from "@/app/types/job";
import { submitOnSceneData } from "./functions";

interface OnSceneDataCollectionClientProps {
  job: Job;
}

interface OnSceneData {
  vin: string;
  licensePlate: string;
  vehiclePhoto: File | null;
  notes?: string;
}

export function OnSceneDataCollectionClient({ job }: OnSceneDataCollectionClientProps) {
  const handleBack = () => {
    // Navigate back to the job details page
    if (typeof window !== "undefined") {
      window.location.href = `/jobs/${job.id}`;
    }
  };

  const handleSubmit = async (data: OnSceneData) => {
    try {
      // Generate a mock photo URL to simulate cloud storage upload
      let vehiclePhotoUrl: string | undefined;
      
      if (data.vehiclePhoto) {
        // Simulate photo upload with a mock URL
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        vehiclePhotoUrl = `https://storage.example.com/vehicle-photos/${job.id}/${timestamp}-${randomId}.jpg`;
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Submit the data to the server
      await submitOnSceneData(job.id, {
        vin: data.vin.trim(),
        licensePlate: data.licensePlate.trim(),
        vehiclePhotoUrl,
        notes: data.notes?.trim() || undefined,
      });
      
      alert("Data collected successfully! Job status updated to 'Towing'.");
      
      // Navigate back to job details
      window.location.href = `/jobs/${job.id}`;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error; // Re-throw to let the component handle it
    }
  };

  return (
    <OnSceneDataCollectionScreen
      job={job}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}
