import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  // Create tables if they don't exist
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "towCompany" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Credential" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "credentialId" TEXT NOT NULL,
        "publicKey" BLOB NOT NULL,
        "counter" INTEGER NOT NULL DEFAULT 0,
        CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "TowJob" (
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
        "vehiclePhotoUrl" TEXT,
        "keysAvailable" BOOLEAN,
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
        "paymentMethod" TEXT,
        "paymentStatus" TEXT DEFAULT 'PENDING',
        "paymentAmount" REAL,
        "paymentTransactionId" TEXT,
        "customerSignatureUrl" TEXT,
        "impoundLotSignatureUrl" TEXT,
        "dropoffNotes" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL,
        "scheduledAt" DATETIME,
        "completedAt" DATETIME,
        "dropoffCompletedAt" DATETIME,
        "paymentCompletedAt" DATETIME,
        CONSTRAINT "TowJob_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  // Create indexes
  await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");`);
  await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Credential_userId_key" ON "Credential"("userId");`);
  await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Credential_credentialId_key" ON "Credential"("credentialId");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Credential_credentialId_idx" ON "Credential"("credentialId");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Credential_userId_idx" ON "Credential"("userId");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_towerId_idx" ON "TowJob"("towerId");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_status_idx" ON "TowJob"("status");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_priority_idx" ON "TowJob"("priority");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_createdAt_idx" ON "TowJob"("createdAt");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_jobNumber_idx" ON "TowJob"("jobNumber");`);
  await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "TowJob_paymentStatus_idx" ON "TowJob"("paymentStatus");`);

  console.log("✅ Database setup complete!");
});
