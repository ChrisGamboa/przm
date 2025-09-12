-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "towCompany" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" TEXT NOT NULL,
    "publicKey" BLOB NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "vin" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_key" ON "Credential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_credentialId_key" ON "Credential"("credentialId");

-- CreateIndex
CREATE INDEX "Credential_credentialId_idx" ON "Credential"("credentialId");

-- CreateIndex
CREATE INDEX "Credential_userId_idx" ON "Credential"("userId");

-- CreateIndex
CREATE INDEX "TowJob_towerId_idx" ON "TowJob"("towerId");

-- CreateIndex
CREATE INDEX "TowJob_status_idx" ON "TowJob"("status");

-- CreateIndex
CREATE INDEX "TowJob_createdAt_idx" ON "TowJob"("createdAt");
