import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { $Enums } from "@generated/prisma";

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

  // Create 4 test tow jobs with different statuses and priorities
  const towJobs = [
    {
      id: "job-1",
      jobNumber: "TJ-001",
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
      distance: "5.2 mi",
      estimatedTime: "12 min",
      status: $Enums.JobStatus.DISPATCHED,
      priority: $Enums.JobPriority.HIGH,
      description: "Vehicle won't start, battery appears dead",
      estimatedCost: 125.00,
      driverName: "John Doe",
      truckName: "Truck 01",
      scheduledAt: new Date("2025-01-15T10:00:00Z"),
    },
    {
      id: "job-2", 
      jobNumber: "TJ-002",
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
      distance: "18.7 mi",
      estimatedTime: "25 min",
      status: $Enums.JobStatus.EN_ROUTE,
      priority: $Enums.JobPriority.URGENT,
      description: "Rear-ended in traffic accident, vehicle not drivable",
      estimatedCost: 200.00,
      actualCost: 185.00,
      driverName: "John Doe",
      truckName: "Truck 02",
      scheduledAt: new Date("2025-01-15T14:30:00Z"),
    },
    {
      id: "job-3",
      jobNumber: "TJ-003",
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
      distance: "8.3 mi",
      estimatedTime: "18 min",
      status: $Enums.JobStatus.COMPLETED,
      priority: $Enums.JobPriority.NORMAL,
      description: "Flat tire, customer needs vehicle moved to safe location",
      estimatedCost: 100.00,
      actualCost: 95.00,
      driverName: "John Doe",
      truckName: "Truck 03",
      scheduledAt: new Date("2025-01-14T16:00:00Z"),
      completedAt: new Date("2025-01-14T17:15:00Z"),
    },
    {
      id: "job-4",
      jobNumber: "TJ-004",
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
      distance: "12.1 mi",
      estimatedTime: "22 min",
      status: $Enums.JobStatus.TOWING,
      priority: $Enums.JobPriority.LOW,
      description: "Engine overheating, steam visible from hood",
      estimatedCost: 175.00,
      driverName: "John Doe",
      truckName: "Heavy Duty 01",
      scheduledAt: new Date("2025-01-15T11:45:00Z"),
    },
    {
      id: "job-5",
      jobNumber: "TJ-005",
      towerId: testUser.id,
      customerName: "Lisa Anderson",
      customerPhone: "(555) 654-3210",
      vehicleMake: "Nissan",
      vehicleModel: "Altima",
      vehicleYear: 2022,
      vehicleColor: "White",
      licensePlate: "NIS2022",
      vin: "1N4BL4BV9NC123456",
      pickupLocation: "Shopping Center Parking Lot, 890 Commerce Blvd",
      pickupLatitude: 40.7484,
      pickupLongitude: -73.9857,
      dropoffLocation: "Mechanic Shop, 432 Service Rd",
      dropoffLatitude: 40.7589,
      dropoffLongitude: -73.9851,
      distance: "6.8 mi",
      estimatedTime: "15 min",
      status: $Enums.JobStatus.ON_SCENE,
      priority: $Enums.JobPriority.NORMAL,
      description: "Key locked inside vehicle, customer waiting on-site",
      estimatedCost: 80.00,
      driverName: "John Doe",
      truckName: "Truck 01",
      scheduledAt: new Date("2025-01-15T13:30:00Z"),
    },
  ];

  // Create all tow jobs
  for (const jobData of towJobs) {
    const job = await db.towJob.create({
      data: jobData,
    });
    console.log(`🚗 Created tow job: ${job.id} (${job.status})`);
  }

  console.log("🌱 Finished seeding with 1 user and 5 tow jobs");
});
