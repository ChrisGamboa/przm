import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { JobStatus } from "../../generated/prisma/enums";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM TowJob;
    DELETE FROM User;
    `);
    // DELETE FROM sqlite_sequence;

  // Create a test tower user
  const testUser = await db.user.create({
    data: {
      id: "test-tower-1",
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      towCompany: "Reliable Towing LLC",
    },
  });

  console.log("👤 Created test user:", testUser.username);

  // Create 4 test tow jobs with different statuses
  const towJobs = [
    {
      id: "job-1",
      towerId: testUser.id,
      customerName: "Sarah Johnson",
      customerPhone: "(555) 123-4567",
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYear: 2018,
      vehicleColor: "Silver",
      licensePlate: "ABC123",
      vin: "4T1BF1FK5JU123456",
      pickupLocation: "123 Main St, Downtown",
      pickupLatitude: 40.7128,
      pickupLongitude: -74.0060,
      dropoffLocation: "Auto Repair Shop, 456 Oak Ave",
      dropoffLatitude: 40.7589,
      dropoffLongitude: -73.9851,
      status: JobStatus.PENDING,
      description: "Vehicle won't start, battery appears dead",
      estimatedCost: 125.00,
      scheduledAt: new Date("2025-01-15T10:00:00Z"),
    },
    {
      id: "job-2", 
      towerId: testUser.id,
      customerName: "Mike Rodriguez",
      customerPhone: "(555) 987-6543",
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      vehicleYear: 2020,
      vehicleColor: "Blue",
      licensePlate: "XYZ789",
      vin: "19XFC2F59KE987654",
      pickupLocation: "Highway 101, Mile Marker 45",
      pickupLatitude: 40.6892,
      pickupLongitude: -74.0445,
      dropoffLocation: "Johnson's Auto Body, 789 Pine St",
      dropoffLatitude: 40.7505,
      dropoffLongitude: -73.9934,
      status: JobStatus.EN_ROUTE,
      description: "Rear-ended in traffic accident, vehicle not drivable",
      estimatedCost: 200.00,
      actualCost: 185.00,
      scheduledAt: new Date("2025-01-15T14:30:00Z"),
    },
    {
      id: "job-3",
      towerId: testUser.id,
      customerName: "Emily Chen",
      customerPhone: "(555) 456-7890",
      vehicleMake: "Ford",
      vehicleModel: "F-150",
      vehicleYear: 2019,
      vehicleColor: "Red",
      licensePlate: "TRUCK99",
      vin: "1FTEW1E54KFA56789",
      pickupLocation: "City Mall Parking Lot, Level 2",
      pickupLatitude: 40.7831,
      pickupLongitude: -73.9712,
      dropoffLocation: "Owner's residence, 321 Elm Drive",
      dropoffLatitude: 40.7282,
      dropoffLongitude: -74.0776,
      status: JobStatus.COMPLETED,
      description: "Flat tire, customer needs vehicle moved to safe location",
      estimatedCost: 100.00,
      actualCost: 95.00,
      scheduledAt: new Date("2025-01-14T16:00:00Z"),
      completedAt: new Date("2025-01-14T17:15:00Z"),
    },
    {
      id: "job-4",
      towerId: testUser.id,
      customerName: "David Wilson",
      customerPhone: "(555) 321-0987",
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: 2021,
      vehicleColor: "Black",
      licensePlate: "LUX2021",
      vin: "5UXCR6C05M9A12345",
      pickupLocation: "Downtown Business District, 5th & Broadway",
      pickupLatitude: 40.7614,
      pickupLongitude: -73.9776,
      dropoffLocation: "BMW Service Center, 555 Motor Pkwy",
      dropoffLatitude: 40.7749,
      dropoffLongitude: -73.9442,
      status: JobStatus.IN_PROGRESS,
      description: "Engine overheating, steam visible from hood",
      estimatedCost: 175.00,
      scheduledAt: new Date("2025-01-15T11:45:00Z"),
    },
  ];

  // Create all tow jobs
  for (const jobData of towJobs) {
    const job = await db.towJob.create({
      data: jobData,
    });
    console.log(`🚗 Created tow job: ${job.id} (${job.status})`);
  }

  console.log("🌱 Finished seeding with 1 user and 4 tow jobs");
});
