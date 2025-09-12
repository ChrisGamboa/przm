"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Separator } from "@/app/components/ui/separator";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User,
  ArrowLeft,
  AlertTriangle
} from "lucide-react";
import { Job, JobStatus } from "@/app/types/job";
import { cn } from "@/app/lib/utils";
import { GoogleMap } from "@/app/components/ui/GoogleMap";

interface JobDetailsScreenProps {
  job: Job;
  onBack?: () => void;
  onUpdateStatus?: (jobId: string, newStatus: JobStatus) => void;
  onCollectOnSceneData?: (jobId: string) => void;
  onProcessDropoff?: (jobId: string) => void;
  className?: string;
}

const statusConfig: Record<JobStatus, { label: string; color: string; bgColor: string; textColor: string }> = {
  waiting: { 
    label: "Waiting", 
    color: "bg-orange-500", 
    bgColor: "bg-orange-50", 
    textColor: "text-orange-700" 
  },
  dispatched: { 
    label: "Dispatched", 
    color: "bg-blue-500", 
    bgColor: "bg-blue-50", 
    textColor: "text-blue-700" 
  },
  en_route: { 
    label: "En route", 
    color: "bg-green-500", 
    bgColor: "bg-green-50", 
    textColor: "text-green-700" 
  },
  on_scene: { 
    label: "On Scene", 
    color: "bg-purple-500", 
    bgColor: "bg-purple-50", 
    textColor: "text-purple-700" 
  },
  towing: { 
    label: "Towing", 
    color: "bg-indigo-500", 
    bgColor: "bg-indigo-50", 
    textColor: "text-indigo-700" 
  },
  completed: { 
    label: "Completed", 
    color: "bg-gray-500", 
    bgColor: "bg-gray-50", 
    textColor: "text-gray-700" 
  },
  cancelled: { 
    label: "Cancelled", 
    color: "bg-red-500", 
    bgColor: "bg-red-50", 
    textColor: "text-red-700" 
  },
};

const statusOrder: JobStatus[] = ["waiting", "dispatched", "en_route", "on_scene", "towing", "completed"];

export function JobDetailsScreen({ 
  job, 
  onBack, 
  onUpdateStatus, 
  onCollectOnSceneData,
  onProcessDropoff,
  className 
}: JobDetailsScreenProps) {
  const statusInfo = statusConfig[job.status];
  
  // Calculate progress percentage based on status
  const currentStatusIndex = statusOrder.indexOf(job.status);
  const progressPercentage = currentStatusIndex >= 0 ? ((currentStatusIndex + 1) / statusOrder.length) * 100 : 0;

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getNextStatus = (currentStatus: JobStatus): JobStatus | null => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
      return statusOrder[currentIndex + 1];
    }
    return null;
  };

  const nextStatus = getNextStatus(job.status);

  return (
    <div className={cn("min-h-screen bg-gray-50 flex flex-col", className)}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Job #{job.jobNumber}</h1>
            <Badge 
              className={cn(
                "px-2 py-1 text-xs font-medium border-0",
                statusInfo.bgColor,
                statusInfo.textColor
              )}
            >
              <div className={cn("w-2 h-2 rounded-full mr-1.5", statusInfo.color)} />
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Route Map - Takes up 40% of viewport height */}
        <div className="h-[40vh] bg-white flex-shrink-0">
          <GoogleMap
            pickupLocation={job.pickupLocation}
            destination={job.destination}
            className="h-full w-full"
          />
        </div>

        {/* Location & Vehicle Info Section */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Pickup Location</div>
                  <div className="text-sm text-gray-600">{job.pickupLocation}</div>
                </div>
                
                {job.destination && (
                  <div>
                    <div className="text-sm font-medium text-gray-900">Destination</div>
                    <div className="text-sm text-gray-600">{job.destination}</div>
                  </div>
                )}

                {(job.distance || job.estimatedTime) && (
                  <div className="flex gap-4 text-sm text-gray-600">
                    {job.distance && <span>Distance: {job.distance}</span>}
                    {job.estimatedTime && <span>Est. Time: {job.estimatedTime}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle & Customer Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle & Customer
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Vehicle</div>
                  <div className="text-sm text-gray-600">
                    {job.vehicleYear} {job.vehicleMake} {job.vehicleModel}
                    {job.vehicleColor && ` • ${job.vehicleColor}`}
                  </div>
                </div>

                {job.licensePlate && (
                  <div>
                    <div className="text-sm font-medium text-gray-900">License Plate</div>
                    <div className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                      {job.licensePlate}
                    </div>
                  </div>
                )}

                {job.vin && (
                  <div>
                    <div className="text-sm font-medium text-gray-900">VIN</div>
                    <div className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                      {job.vin}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {job.keysAvailable !== undefined ? (
                      <>
                        {job.keysAvailable ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm text-gray-600">
                          Keys {job.keysAvailable ? "Available" : "Not Available"}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">Keys availability: Unknown</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Customer</div>
                    <div className="text-sm text-gray-600">{job.customerName}</div>
                    <div className="text-sm text-gray-600">{job.customerPhone}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => window.open(`tel:${job.customerPhone}`)}
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details - Collapsed section */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Job Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{formatTime(job.createdAt)}</span>
                </div>
                
                {job.scheduledAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scheduled:</span>
                    <span className="font-medium">{formatTime(job.scheduledAt)}</span>
                  </div>
                )}

                {job.estimatedCost && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Cost:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(job.estimatedCost)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Assignment</h3>
              <div className="space-y-2 text-sm">
                {job.driverName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driver:</span>
                    <span className="font-medium">{job.driverName}</span>
                  </div>
                )}
                {job.truckName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Truck:</span>
                    <span className="font-medium">{job.truckName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {job.description && (
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-700">{job.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Update Status Button - Show for most statuses except completed/cancelled */}
            {job.status !== "completed" && job.status !== "cancelled" && nextStatus && (
            <Button 
              className="w-full"
              onClick={() => onUpdateStatus?.(job.id, nextStatus)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Update Status to {statusConfig[nextStatus].label}
            </Button>
            )}

            {/* On Scene Data Collection */}
            {job.status === "on_scene" && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => onCollectOnSceneData?.(job.id)}
              >
                <Car className="h-4 w-4 mr-2" />
                Collect VIN, Photos & Verify Plate
              </Button>
            )}

            {/* Towing Dropoff */}
            {job.status === "towing" && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => onProcessDropoff?.(job.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Process Dropoff & Payment
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar - Bottom of page */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Job Progress</h3>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Waiting</span>
            <span>Dispatched</span>
            <span>En Route</span>
            <span>On Scene</span>
            <span>Towing</span>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
