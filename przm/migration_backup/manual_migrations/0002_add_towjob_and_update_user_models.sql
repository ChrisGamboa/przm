-- CreateTable
CREATE TABLE "TowJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "towerId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "vehicleYear" INTEGER,
    "vehicleColor" TEXT,
    "licensePlate" TEXT,
    "pickupLocation" TEXT NOT NULL,
    "pickupLatitude" REAL,
    "pickupLongitude" REAL,
    "dropoffLocation" TEXT,
    "dropoffLatitude" REAL,
    "dropoffLongitude" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "estimatedCost" REAL,
    "actualCost" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "scheduledAt" DATETIME,
    "completedAt" DATETIME,
    CONSTRAINT "TowJob_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "towCompany" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "id", "username") SELECT "createdAt", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "TowJob_towerId_idx" ON "TowJob"("towerId");

-- CreateIndex
CREATE INDEX "TowJob_status_idx" ON "TowJob"("status");

-- CreateIndex
CREATE INDEX "TowJob_createdAt_idx" ON "TowJob"("createdAt");
