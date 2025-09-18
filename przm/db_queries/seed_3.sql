-- Clear existing data if tables exist
DELETE FROM TowJob;
DELETE FROM User;

-- Create test tower user
INSERT INTO User (
  id, username, firstName, lastName, towCompany
) VALUES (
  'test-tower-1', 'johndoe', 'John', 'Doe', 'Reliable Towing LLC'
);

-- Create 10 test tow jobs
INSERT INTO TowJob (
  id, jobNumber, towerId, customerName, customerPhone, 
  vehicleMake, vehicleModel, vehicleYear, vehicleColor, 
  licensePlate, vin, pickupLocation, pickupLatitude, pickupLongitude,
  dropoffLocation, dropoffLatitude, dropoffLongitude, distance, estimatedTime,
  status, priority, description, estimatedCost, actualCost,
  driverName, truckName, scheduledAt, completedAt, updatedAt
) VALUES
-- Job 1
(
  'job-1', 'TJ-001', 'test-tower-1', 'Sarah Johnson', '(555) 123-4567',
  'Toyota', 'Camry', 2018, 'Silver',
  'ABC123', '4T1BF1FK5JU123456', '123 Main St, Downtown', 40.7128, -74.0060,
  'Auto Repair Shop, 456 Oak Ave', 40.7589, -73.9851, '5.2 mi', '12 min',
  'DISPATCHED', 'HIGH', 'Vehicle won''t start, battery appears dead', 125.00, NULL,
  'John Doe', 'Truck 01', '2025-01-15T10:00:00Z', NULL, '2025-01-15T09:00:00Z'
),
-- Job 2
(
  'job-2', 'TJ-002', 'test-tower-1', 'Mike Rodriguez', '(555) 987-6543',
  'Honda', 'Civic', 2020, 'Blue',
  'XYZ789', '19XFC2F59KE987654', 'Highway 101, Mile Marker 45', 40.6892, -74.0445,
  'Johnson''s Auto Body, 789 Pine St', 40.7505, -73.9934, '18.7 mi', '25 min',
  'EN_ROUTE', 'URGENT', 'Rear-ended in traffic accident, vehicle not drivable', 200.00, 185.00,
  'John Doe', 'Truck 02', '2025-01-15T14:30:00Z', NULL, '2025-01-15T14:00:00Z'
),
-- Job 3
(
  'job-3', 'TJ-003', 'test-tower-1', 'Emily Chen', '(555) 456-7890',
  'Ford', 'F-150', 2019, 'Red',
  'TRUCK99', '1FTEW1E54KFA56789', 'City Mall Parking Lot, Level 2', 40.7831, -73.9712,
  'Owner''s residence, 321 Elm Drive', 40.7282, -74.0776, '8.3 mi', '18 min',
  'COMPLETED', 'NORMAL', 'Flat tire, customer needs vehicle moved to safe location', 100.00, 95.00,
  'John Doe', 'Truck 03', '2025-01-14T16:00:00Z', '2025-01-14T17:15:00Z', '2025-01-14T17:15:00Z'
),
-- Job 4
(
  'job-4', 'TJ-004', 'test-tower-1', 'David Wilson', '(555) 321-0987',
  'BMW', 'X5', 2021, 'Black',
  'LUX2021', '5UXCR6C05M9A12345', 'Downtown Business District, 5th & Broadway', 40.7614, -73.9776,
  'BMW Service Center, 555 Motor Pkwy', 40.7749, -73.9442, '12.1 mi', '22 min',
  'TOWING', 'LOW', 'Engine overheating, steam visible from hood', 175.00, NULL,
  'John Doe', 'Heavy Duty 01', '2025-01-15T11:45:00Z', NULL, '2025-01-15T11:00:00Z'
),
-- Job 5
(
  'job-5', 'TJ-005', 'test-tower-1', 'Lisa Anderson', '(555) 654-3210',
  'Nissan', 'Altima', 2022, 'White',
  'NIS2022', '1N4BL4BV9NC123456', 'Shopping Center Parking Lot, 890 Commerce Blvd', 40.7484, -73.9857,
  'Mechanic Shop, 432 Service Rd', 40.7589, -73.9851, '6.8 mi', '15 min',
  'ON_SCENE', 'NORMAL', 'Key locked inside vehicle, customer waiting on-site', 80.00, NULL,
  'John Doe', 'Truck 01', '2025-01-15T13:30:00Z', NULL, '2025-01-15T13:00:00Z'
),
-- Job 6
(
  'job-6', 'TJ-006', 'test-tower-1', 'Robert Martinez', '(555) 789-0123',
  'Chevrolet', 'Malibu', 2017, 'Gray',
  'CHV2017', '1G1ZE5ST8HF123456', 'Airport Terminal 3, Departure Level', 40.6413, -73.7781,
  'Enterprise Car Rental, 123 Airport Rd', 40.6501, -73.7845, '3.2 mi', '8 min',
  'DISPATCHED', 'HIGH', 'Vehicle breakdown in departure zone, blocking traffic', 150.00, NULL,
  'Mike Thompson', 'Truck 02', '2025-01-15T15:45:00Z', NULL, '2025-01-15T15:15:00Z'
),
-- Job 7
(
  'job-7', 'TJ-007', 'test-tower-1', 'Jennifer Park', '(555) 234-5678',
  'Subaru', 'Outback', 2020, 'Green',
  'SUB2020', '4S4BSANC5L3123456', 'Mountain Trail Parking, Bear Creek Road', 40.8176, -74.1591,
  'Subaru Dealership, 678 Valley Rd', 40.7484, -74.0321, '22.5 mi', '35 min',
  'EN_ROUTE', 'NORMAL', 'Flat tire on hiking trail, spare tire also flat', 180.00, NULL,
  'Sarah Williams', 'Off-Road Unit 01', '2025-01-15T09:15:00Z', NULL, '2025-01-15T08:45:00Z'
),
-- Job 8
(
  'job-8', 'TJ-008', 'test-tower-1', 'Thomas Brown', '(555) 567-8901',
  'Audi', 'A4', 2019, 'Silver',
  'AUD2019', 'WAUENAF49KN123456', 'Corporate Office Complex, 1500 Business Park Dr', 40.7282, -74.0776,
  'German Auto Specialists, 234 Import Ave', 40.7749, -73.9442, '15.8 mi', '28 min',
  'ON_SCENE', 'LOW', 'Transmission issues, car stuck in parking garage', 220.00, NULL,
  'Carlos Rodriguez', 'Heavy Duty 02', '2025-01-15T12:00:00Z', NULL, '2025-01-15T11:30:00Z'
),
-- Job 9
(
  'job-9', 'TJ-009', 'test-tower-1', 'Amanda Davis', '(555) 890-1234',
  'Hyundai', 'Elantra', 2021, 'Blue',
  'HYU2021', 'KMHL14JA5MA123456', 'University Campus, Student Parking Lot C', 40.7505, -73.9934,
  'Hyundai Service Center, 890 Auto Mall Dr', 40.7831, -73.9712, '9.7 mi', '20 min',
  'TOWING', 'NORMAL', 'Engine won''t turn over, possible starter failure', 140.00, NULL,
  'Lisa Chen', 'Truck 03', '2025-01-15T08:30:00Z', NULL, '2025-01-15T08:00:00Z'
),
-- Job 10
(
  'job-10', 'TJ-010', 'test-tower-1', 'Kevin O''Connor', '(555) 345-6789',
  'Jeep', 'Wrangler', 2018, 'Orange',
  'JEEP18', '1C4HJWEG9JL123456', 'Beach Access Road, Mile 12', 40.5892, -74.1591,
  'Off-Road Recovery Shop, 567 4WD Street', 40.6413, -74.0060, '28.3 mi', '42 min',
  'COMPLETED', 'URGENT', 'Vehicle stuck in sand, axle damage from recovery attempt', 300.00, 285.00,
  'Jake Morrison', 'Heavy Duty 03', '2025-01-14T13:00:00Z', '2025-01-14T15:30:00Z', '2025-01-14T15:30:00Z'
);