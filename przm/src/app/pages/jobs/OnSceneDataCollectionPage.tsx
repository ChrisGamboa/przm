import { Suspense } from "react";
import { OnSceneDataCollectionClient } from "./OnSceneDataCollectionClient";
import { JobQueueSkeleton } from "@/app/components/ui/JobQueueSkeleton";
import { db } from "@/db";

interface OnSceneDataCollectionPageProps {
  params: {
    id: string;
  };
}

async function OnSceneDataContent({ jobId }: { jobId: string }) {
  // Fetch the job data from the database
  const job = await db.towJob.findUnique({
    where: { id: jobId },
    include: {
      tower: {
        select: {
          firstName: true,
          lastName: true,
          towCompany: true,
        },
      },
    },
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Transform the job data to match our Job type
  const transformedJob = {
    id: job.id,
    jobNumber: job.jobNumber || undefined,
    towerId: job.towerId,
    customerName: job.customerName,
    customerPhone: job.customerPhone,
    vehicleMake: job.vehicleMake,
    vehicleModel: job.vehicleModel,
    vehicleYear: job.vehicleYear || undefined,
    vehicleColor: job.vehicleColor || undefined,
    licensePlate: job.licensePlate || undefined,
    vin: job.vin || undefined,
    vehiclePhotoUrl: job.vehiclePhotoUrl || undefined,
    pickupLocation: job.pickupLocation,
    pickupLatitude: job.pickupLatitude || undefined,
    pickupLongitude: job.pickupLongitude || undefined,
    dropoffLocation: job.dropoffLocation || undefined,
    dropoffLatitude: job.dropoffLatitude || undefined,
    dropoffLongitude: job.dropoffLongitude || undefined,
    distance: job.distance || undefined,
    estimatedTime: job.estimatedTime || undefined,
    status: job.status.toLowerCase() as any,
    priority: job.priority.toLowerCase() as any,
    description: job.description || undefined,
    estimatedCost: job.estimatedCost || undefined,
    actualCost: job.actualCost || undefined,
    driverName: job.driverName || undefined,
    truckName: job.truckName || undefined,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    scheduledAt: job.scheduledAt?.toISOString() || undefined,
    completedAt: job.completedAt?.toISOString() || undefined,
    tower: job.tower ? {
      firstName: job.tower.firstName,
      lastName: job.tower.lastName,
      towCompany: job.tower.towCompany || undefined,
    } : undefined,
  };

  return <OnSceneDataCollectionClient job={transformedJob} />;
}

export default function OnSceneDataCollectionPage({ params }: OnSceneDataCollectionPageProps) {
  return (
    <Suspense fallback={<JobQueueSkeleton />}>
      <OnSceneDataContent jobId={params.id} />
    </Suspense>
  );
}
