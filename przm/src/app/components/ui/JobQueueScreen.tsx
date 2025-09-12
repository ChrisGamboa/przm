"use client";

import React, { useState } from "react";
import { JobCard } from "./JobCard";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { 
  Filter, 
  SortAsc, 
  RefreshCw, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle2 
} from "lucide-react";
import { Job, JobStatus } from "@/app/types/job";
import { cn } from "@/app/lib/utils";

interface JobQueueScreenProps {
  jobs: Job[];
  onViewDetails?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string) => void;
  onRefresh?: () => void;
  className?: string;
}

const statusFilters: { value: JobStatus | "all"; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All", icon: <Filter className="h-4 w-4" /> },
  { value: "waiting", label: "Waiting", icon: <Clock className="h-4 w-4" /> },
  { value: "dispatched", label: "Dispatched", icon: <MapPin className="h-4 w-4" /> },
  { value: "en_route", label: "En Route", icon: <MapPin className="h-4 w-4" /> },
  { value: "on_scene", label: "On Scene", icon: <AlertTriangle className="h-4 w-4" /> },
  { value: "towing", label: "Towing", icon: <MapPin className="h-4 w-4" /> },
  { value: "completed", label: "Completed", icon: <CheckCircle2 className="h-4 w-4" /> },
];

export function JobQueueScreen({ 
  jobs, 
  onViewDetails, 
  onUpdateStatus, 
  onRefresh,
  className 
}: JobQueueScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<JobStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"created" | "priority" | "status">("created");

  // Filter jobs based on selected status
  const filteredJobs = jobs.filter(job => 
    selectedFilter === "all" || job.status === selectedFilter
  );

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    // Default: sort by created time (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Get status counts
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<JobStatus, number>);

  const urgentJobs = jobs.filter(job => job.priority === "urgent").length;
  const activeJobs = jobs.filter(job => 
    ["waiting", "dispatched", "en_route", "on_scene", "towing"].includes(job.status)
  ).length;

  return (
    <div className={cn("flex flex-col h-screen bg-gray-50", className)}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Job Queue</h1>
            <p className="text-sm text-gray-600">
              {activeJobs} active • {jobs.length} total jobs
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">Urgent</span>
            </div>
            <div className="text-lg font-bold text-red-900">{urgentJobs}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Active</span>
            </div>
            <div className="text-lg font-bold text-blue-900">{activeJobs}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {statusFilters.map((filter) => {
              const count = filter.value === "all" ? jobs.length : statusCounts[filter.value as JobStatus] || 0;
              const isActive = selectedFilter === filter.value;
              
              return (
                <Button
                  key={filter.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap",
                    isActive && "shadow-sm"
                  )}
                >
                  {filter.icon}
                  {filter.label}
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-1 text-xs",
                      isActive ? "bg-white/20 text-white" : "bg-gray-100"
                    )}
                  >
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Sort Options */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex gap-1">
            {[
              { value: "created", label: "Time" },
              { value: "priority", label: "Priority" },
              { value: "status", label: "Status" },
            ].map((sort) => (
              <Button
                key={sort.value}
                variant={sortBy === sort.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy(sort.value as any)}
                className="text-xs h-7"
              >
                {sort.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedJobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No jobs found
              </h3>
              <p className="text-sm text-gray-600">
                {selectedFilter === "all" 
                  ? "No jobs available at the moment" 
                  : `No ${selectedFilter} jobs found`
                }
              </p>
            </div>
          ) : (
            sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={onViewDetails}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
