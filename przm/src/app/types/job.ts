export type JobStatus = 
  | "waiting" 
  | "dispatched" 
  | "en_route" 
  | "on_scene" 
  | "towing" 
  | "completed" 
  | "cancelled";

export type JobPriority = "low" | "normal" | "high" | "urgent";

export interface Job {
  id: string;
  jobNumber: string;
  status: JobStatus;
  priority: JobPriority;
  
  // Customer info
  customerName: string;
  customerPhone: string;
  
  // Vehicle info
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor?: string;
  licensePlate?: string;
  vin?: string;
  keysAvailable?: boolean;
  
  // Location info
  pickupLocation: string;
  destination?: string;
  distance?: string;
  estimatedTime?: string;
  
  // Timing
  createdAt: Date;
  scheduledAt?: Date;
  estimatedCost?: number;
  
  // Additional details
  description?: string;
  driverName?: string;
  truckName?: string;
}
