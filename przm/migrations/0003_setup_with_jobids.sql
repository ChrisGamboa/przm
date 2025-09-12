-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TowJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobNumber" TEXT,
    "towerId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "vehicleYear" INTEGER,
    "vehicleColor" TEXT,
    "licensePlate" TEXT,
    "vin" TEXT,
    "pickupLocation" TEXT NOT NULL,
    "pickupLatitude" REAL,
    "pickupLongitude" REAL,
    "dropoffLocation" TEXT,
    "dropoffLatitude" REAL,
    "dropoffLongitude" REAL,
    "distance" TEXT,
    "estimatedTime" TEXT,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "description" TEXT,
    "estimatedCost" REAL,
    "actualCost" REAL,
    "driverName" TEXT,
    "truckName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "scheduledAt" DATETIME,
    "completedAt" DATETIME,
    CONSTRAINT "TowJob_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TowJob" ("actualCost", "completedAt", "createdAt", "customerName", "customerPhone", "description", "dropoffLatitude", "dropoffLocation", "dropoffLongitude", "estimatedCost", "id", "licensePlate", "pickupLatitude", "pickupLocation", "pickupLongitude", "scheduledAt", "status", "towerId", "updatedAt", "vehicleColor", "vehicleMake", "vehicleModel", "vehicleYear") SELECT "actualCost", "completedAt", "createdAt", "customerName", "customerPhone", "description", "dropoffLatitude", "dropoffLocation", "dropoffLongitude", "estimatedCost", "id", "licensePlate", "pickupLatitude", "pickupLocation", "pickupLongitude", "scheduledAt", "status", "towerId", "updatedAt", "vehicleColor", "vehicleMake", "vehicleModel", "vehicleYear" FROM "TowJob";
DROP TABLE "TowJob";
ALTER TABLE "new_TowJob" RENAME TO "TowJob";
CREATE INDEX "TowJob_towerId_idx" ON "TowJob"("towerId");
CREATE INDEX "TowJob_status_idx" ON "TowJob"("status");
CREATE INDEX "TowJob_priority_idx" ON "TowJob"("priority");
CREATE INDEX "TowJob_createdAt_idx" ON "TowJob"("createdAt");
CREATE INDEX "TowJob_jobNumber_idx" ON "TowJob"("jobNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
