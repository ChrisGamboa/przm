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
  jobNumber?: string;
  towerId: string;
  status: JobStatus;
  priority: JobPriority;
  
  // Customer info
  customerName: string;
  customerPhone: string;
  
  // Vehicle info
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: number;
  vehicleColor?: string;
  licensePlate?: string;
  vin?: string;
  vehiclePhotoUrl?: string;
  keysAvailable?: boolean;
  
  // Location info
  pickupLocation: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  dropoffLocation?: string;
  dropoffLatitude?: number;
  dropoffLongitude?: number;
  distance?: string;
  estimatedTime?: string;
  
  // Timing
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
  completedAt?: string;
  estimatedCost?: number;
  actualCost?: number;
  
  // Additional details
  description?: string;
  driverName?: string;
  truckName?: string;
  
  // Tower info
  tower?: {
    firstName: string;
    lastName: string;
    towCompany?: string;
  };
}
