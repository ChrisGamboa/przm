"use client";

import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { MapPin, Clock, Car, Phone, Navigation, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Job, JobStatus, JobPriority } from "@/app/types/job";
import { cn } from "@/app/lib/utils";

interface JobCardProps {
  job: Job;
  onViewDetails?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onDeclineJob?: (jobId: string) => void;
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

const priorityConfig: Record<JobPriority, { color: string; icon?: React.ReactNode }> = {
  low: { color: "text-gray-500" },
  normal: { color: "text-blue-500" },
  high: { color: "text-orange-500" },
  urgent: { 
    color: "text-red-500", 
    icon: <AlertTriangle className="h-4 w-4" /> 
  },
};

export function JobCard({ job, onViewDetails, onUpdateStatus, onAcceptJob, onDeclineJob, className }: JobCardProps) {
  const statusInfo = statusConfig[job.status];
  const priorityInfo = priorityConfig[job.priority];

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

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Header with Job Number, Status, and Priority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">#{job.jobNumber}</span>
            {job.priority === "urgent" && (
              <div className={cn("flex items-center gap-1", priorityInfo.color)}>
                {priorityInfo.icon}
              </div>
            )}
          </div>
          <Badge 
            className={cn(
              "px-3 py-1 text-xs font-medium border-0",
              statusInfo.bgColor,
              statusInfo.textColor
            )}
          >
            <div className={cn("w-2 h-2 rounded-full mr-2", statusInfo.color)} />
            {statusInfo.label}
          </Badge>
        </div>

        {/* Customer Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-base">{job.customerName}</span>
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

        {/* Vehicle Information */}
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            {job.vehicleYear} {job.vehicleMake} {job.vehicleModel}
            {job.vehicleColor && ` • ${job.vehicleColor}`}
          </span>
        </div>

        {job.licensePlate && (
          <div className="text-sm">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {job.licensePlate}
            </span>
          </div>
        )}

        <Separator />

        {/* Location Information */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">Pickup</div>
              <div className="text-sm text-gray-600 break-words line-clamp-2">{job.pickupLocation}</div>
            </div>
          </div>
          
          {job.dropoffLocation && (
            <div className="flex items-start gap-2">
              <Navigation className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">Destination</div>
                <div className="text-sm text-gray-600 break-words line-clamp-2">{job.dropoffLocation}</div>
              </div>
            </div>
          )}
        </div>

        {/* Timing and Distance */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(new Date(job.createdAt))}</span>
          </div>
          <div className="flex items-center gap-4">
            {job.distance && <span>{job.distance}</span>}
            {job.estimatedTime && <span>{job.estimatedTime}</span>}
          </div>
        </div>

        {/* Cost and Primary Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            {job.estimatedCost && (
              <span className="font-medium text-green-600">
                {formatCurrency(job.estimatedCost)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {/* Show Update Status button for non-dispatched, non-completed, non-cancelled jobs */}
            {job.status !== "dispatched" && job.status !== "completed" && job.status !== "cancelled" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onUpdateStatus?.(job.id)}
                className="text-xs"
              >
                UPDATE STATUS
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm"
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails(job.id);
                } else {
                  // Default navigation to job details page
                  window.location.href = `/jobs/${job.id}`;
                }
              }}
              className="text-xs"
            >
              VIEW DETAILS
            </Button>
          </div>
        </div>

        {/* Accept/Decline Actions for Dispatched Jobs */}
        {job.status === "dispatched" && (
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeclineJob?.(job.id)}
              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
            >
              <XCircle className="h-3 w-3 mr-1" />
              DECLINE
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onAcceptJob?.(job.id)}
              className="text-xs bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              ACCEPT
            </Button>
          </div>
        )}

        {/* Driver and Truck Info */}
        {(job.driverName || job.truckName) && (
          <>
            <Separator />
            <div className="flex justify-between text-xs text-gray-500">
              {job.driverName && <span>Driver: {job.driverName}</span>}
              {job.truckName && <span>Truck: {job.truckName}</span>}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
