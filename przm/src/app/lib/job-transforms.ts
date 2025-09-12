import { TowJob, $Enums } from "@generated/prisma";
import { Job } from "@/app/types/job";
import { JobStatus as UIJobStatus, JobPriority as UIJobPriority } from "@/app/types/job";

type DBJobStatus = $Enums.JobStatus;
type DBJobPriority = $Enums.JobPriority;

/**
 * Maps database JobStatus enum to UI JobStatus type
 */
export function mapDBStatusToUI(dbStatus: DBJobStatus): UIJobStatus {
  const statusMap: Record<DBJobStatus, UIJobStatus> = {
    ['WAITING']: "waiting",
    ['DISPATCHED']: "dispatched", 
    ['EN_ROUTE']: "en_route",
    ['ON_SCENE']: "on_scene",
    ['TOWING']: "towing",
    ['COMPLETED']: "completed",
    ['CANCELLED']: "cancelled",
  };
  
  return statusMap[dbStatus];
}

/**
 * Maps UI JobStatus type to database JobStatus enum
 */
export function mapUIStatusToDB(uiStatus: UIJobStatus): DBJobStatus {
  const statusMap: Record<UIJobStatus, DBJobStatus> = {
    waiting: 'WAITING',
    dispatched: 'DISPATCHED',
    en_route: 'EN_ROUTE',
    on_scene: 'ON_SCENE',
    towing: 'TOWING',
    completed: 'COMPLETED',
    cancelled: 'CANCELLED',
  };
  
  return statusMap[uiStatus];
}

/**
 * Maps database JobPriority enum to UI JobPriority type
 */
export function mapDBPriorityToUI(dbPriority: DBJobPriority): UIJobPriority {
  const priorityMap: Record<DBJobPriority, UIJobPriority> = {
    ['LOW']: "low",
    ['NORMAL']: "normal",
    ['HIGH']: "high",
    ['URGENT']: "urgent",
  };
  
  return priorityMap[dbPriority];
}

/**
 * Maps UI JobPriority type to database JobPriority enum
 */
export function mapUIPriorityToDB(uiPriority: UIJobPriority): DBJobPriority {
  const priorityMap: Record<UIJobPriority, DBJobPriority> = {
    low: 'LOW',
    normal: 'NORMAL',
    high: 'HIGH',
    urgent: 'URGENT',
  };
  
  return priorityMap[uiPriority];
}

/**
 * Transforms a TowJob database model to a Job UI interface
 */
export function transformTowJobToJob(towJob: TowJob): Job {
  return {
    id: towJob.id,
    jobNumber: towJob.jobNumber || `JOB-${towJob.id.slice(-6)}`, // Fallback if null
    status: mapDBStatusToUI(towJob.status),
    priority: mapDBPriorityToUI(towJob.priority),
    
    // Customer info
    customerName: towJob.customerName,
    customerPhone: towJob.customerPhone,
    
    // Vehicle info
    vehicleMake: towJob.vehicleMake,
    vehicleModel: towJob.vehicleModel,
    vehicleYear: towJob.vehicleYear || 0, // Default to 0 if null
    vehicleColor: towJob.vehicleColor || undefined,
    licensePlate: towJob.licensePlate || undefined,
    vin: towJob.vin || undefined,
    keysAvailable: undefined, // This field isn't in the database yet
    
    // Location info
    pickupLocation: towJob.pickupLocation,
    destination: towJob.dropoffLocation || undefined,
    distance: towJob.distance || undefined,
    estimatedTime: towJob.estimatedTime || undefined,
    
    // Timing
    createdAt: towJob.createdAt,
    scheduledAt: towJob.scheduledAt || undefined,
    estimatedCost: towJob.estimatedCost || undefined,
    
    // Additional details
    description: towJob.description || undefined,
    driverName: towJob.driverName || undefined,
    truckName: towJob.truckName || undefined,
  };
}

/**
 * Transforms an array of TowJob database models to Job UI interfaces
 */
export function transformTowJobsToJobs(towJobs: TowJob[]): Job[] {
  return towJobs.map(transformTowJobToJob);
}

/**
 * Transforms a Job UI interface to TowJob database model data (for creating/updating)
 */
export function transformJobToTowJobData(job: Job, towerId: string): Omit<TowJob, 'id' | 'createdAt' | 'updatedAt' | 'tower'> {
  return {
    jobNumber: job.jobNumber,
    towerId,
    customerName: job.customerName,
    customerPhone: job.customerPhone,
    vehicleMake: job.vehicleMake,
    vehicleModel: job.vehicleModel,
    vehicleYear: job.vehicleYear,
    vehicleColor: job.vehicleColor || null,
    licensePlate: job.licensePlate || null,
    vin: null, // VIN not provided in Job interface
    pickupLocation: job.pickupLocation,
    pickupLatitude: null, // Coordinates not provided in Job interface
    pickupLongitude: null,
    dropoffLocation: job.destination || null,
    dropoffLatitude: null,
    dropoffLongitude: null,
    distance: job.distance || null,
    estimatedTime: job.estimatedTime || null,
    status: mapUIStatusToDB(job.status),
    priority: mapUIPriorityToDB(job.priority),
    description: job.description || null,
    estimatedCost: job.estimatedCost || null,
    actualCost: null, // Actual cost not provided in Job interface
    driverName: job.driverName || null,
    truckName: job.truckName || null,
    scheduledAt: job.scheduledAt || null,
    completedAt: null, // Completion time not provided in Job interface
  };
}
