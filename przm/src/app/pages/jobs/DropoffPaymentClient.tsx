"use client";

import React from "react";
import { DropoffPaymentScreen } from "@/app/components/ui/DropoffPaymentScreen";
import { Job } from "@/app/types/job";
import { DropoffPaymentFormData } from "@/app/types/payment";
import { processDropoffPayment } from "./functions";

interface DropoffPaymentClientProps {
  job: Job;
}

export function DropoffPaymentClient({ job }: DropoffPaymentClientProps) {
  const isJobCompleted = job.status === 'completed';

  const handleBack = () => {
    // Navigate back to the job details page
    if (typeof window !== "undefined") {
      window.location.href = `/jobs/${job.id}`;
    }
  };

  const handleReturnToJob = () => {
    // Navigate back to the job details page after completion
    if (typeof window !== "undefined") {
      window.location.href = `/jobs/${job.id}`;
    }
  };

  const handleComplete = async (data: DropoffPaymentFormData) => {
    try {
      // Generate mock URLs for signature storage (in a real app, these would be uploaded to cloud storage)
      const generateSignatureUrl = (signatureData: string, type: string) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        return `https://storage.example.com/signatures/${job.id}/${type}-${timestamp}-${randomId}.png`;
      };

      const customerSignatureUrl = generateSignatureUrl(
        data.customerSignature.dataUrl, 
        "customer"
      );
      const impoundLotSignatureUrl = generateSignatureUrl(
        data.dropoff.impoundLotSignature.dataUrl, 
        "impound-lot"
      );

      // Process the dropoff and payment
      await processDropoffPayment(job.id, {
        // Payment data
        paymentMethod: data.payment.method,
        paymentAmount: data.payment.amount,
        paymentTransactionId: data.payment.transactionId || `txn_${Date.now()}`,
        
        // Signature URLs (in production, these would be real uploaded URLs)
        customerSignatureUrl,
        impoundLotSignatureUrl,
        
        // Additional data
        dropoffNotes: data.dropoff.vehicleConditionNotes || data.finalNotes,
        
        // Timestamps
        dropoffCompletedAt: data.dropoff.dropoffTimestamp,
        paymentCompletedAt: data.customerSignature.timestamp,
      });

      // Note: No immediate navigation - let the completion screen show
      // The user can navigate back manually from the completion screen
    } catch (error) {
      console.error("Error processing dropoff and payment:", error);
      alert("Failed to process dropoff and payment. Please try again.");
      throw error; // Re-throw to let the component handle it
    }
  };

  return (
    <DropoffPaymentScreen
      job={job}
      onBack={handleBack}
      onComplete={handleComplete}
      onReturnToJob={handleReturnToJob}
      isReadOnly={isJobCompleted}
    />
  );
}
