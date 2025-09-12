"use server";

import { db } from "@/db";
import { transformTowJobsToJobs, mapUIStatusToDB } from "@/app/lib/job-transforms";
import { JobStatus } from "@/app/types/job";

// Fixed test user ID for demo purposes
const TEST_USER_ID = "test-tower-1";

/**
 * Fetches all tow jobs for the test user
 */
export async function getJobsForUser() {
  try {
    const towJobs = await db.towJob.findMany({
      where: {
        towerId: TEST_USER_ID,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transformTowJobsToJobs(towJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
}

/**
 * Updates the status of a specific job
 */
export async function updateJobStatus(jobId: string, newStatus: JobStatus) {
  try {
    // Verify the job belongs to the test user
    const existingJob = await db.towJob.findFirst({
      where: {
        id: jobId,
        towerId: TEST_USER_ID,
      },
    });

    if (!existingJob) {
      throw new Error("Job not found");
    }

    // Update the job status
    const updatedJob = await db.towJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: mapUIStatusToDB(newStatus),
        updatedAt: new Date(),
        // Set completedAt if status is completed
        ...(newStatus === "completed" && { completedAt: new Date() }),
      },
    });

    return transformTowJobsToJobs([updatedJob])[0];
  } catch (error) {
    console.error("Error updating job status:", error);
    throw new Error("Failed to update job status");
  }
}

/**
 * Gets detailed information for a specific job
 */
export async function getJobDetails(jobId: string) {
  try {
    const towJob = await db.towJob.findFirst({
      where: {
        id: jobId,
        towerId: TEST_USER_ID,
      },
      include: {
        tower: {
          select: {
            firstName: true,
            lastName: true,
            towCompany: true,
          },
        },
      },
    });

    if (!towJob) {
      throw new Error("Job not found");
    }

    return {
      ...transformTowJobsToJobs([towJob])[0],
      towerInfo: {
        name: `${towJob.tower.firstName} ${towJob.tower.lastName}`,
        company: towJob.tower.towCompany,
      },
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw new Error("Failed to fetch job details");
  }
}

/**
 * Refreshes job data (essentially a wrapper around getJobsForUser for explicit refresh)
 */
export async function refreshJobs() {
  return getJobsForUser();
}

/**
 * Accepts a dispatched job and moves it to en_route status
 */
export async function acceptJob(jobId: string) {
  try {
    // Verify the job exists and is in dispatched status
    const existingJob = await db.towJob.findFirst({
      where: {
        id: jobId,
        towerId: TEST_USER_ID,
        status: 'DISPATCHED',
      },
    });

    if (!existingJob) {
      throw new Error("Job not found or not in dispatched status");
    }

    // Update the job status to EN_ROUTE
    const updatedJob = await db.towJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'EN_ROUTE',
        updatedAt: new Date(),
      },
    });

    return transformTowJobsToJobs([updatedJob])[0];
  } catch (error) {
    console.error("Error accepting job:", error);
    throw new Error("Failed to accept job");
  }
}

/**
 * Declines a dispatched job and moves it to cancelled status
 */
export async function declineJob(jobId: string) {
  try {
    // Verify the job exists and is in dispatched status
    const existingJob = await db.towJob.findFirst({
      where: {
        id: jobId,
        towerId: TEST_USER_ID,
        status: 'DISPATCHED',
      },
    });

    if (!existingJob) {
      throw new Error("Job not found or not in dispatched status");
    }

    // Update the job status to CANCELLED
    const updatedJob = await db.towJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });

    return transformTowJobsToJobs([updatedJob])[0];
  } catch (error) {
    console.error("Error declining job:", error);
    throw new Error("Failed to decline job");
  }
}

/**
 * Gets job statistics for the test user
 */
export async function getJobStats() {
  try {
    const [total, waiting, dispatched, enRoute, onScene, towing, completed, cancelled] = await Promise.all([
      db.towJob.count({ where: { towerId: TEST_USER_ID } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'WAITING' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'DISPATCHED' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'EN_ROUTE' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'ON_SCENE' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'TOWING' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'COMPLETED' } }),
      db.towJob.count({ where: { towerId: TEST_USER_ID, status: 'CANCELLED' } }),
    ]);

    const urgent = await db.towJob.count({ 
      where: { 
        towerId: TEST_USER_ID, 
        priority: 'URGENT' 
      } 
    });

    const active = enRoute + onScene + towing;
    const inProgress = enRoute + onScene + towing;

    return {
      total,
      active,
      urgent,
      inProgress,
      statusBreakdown: {
        waiting,
        dispatched,
        en_route: enRoute,
        on_scene: onScene,
        towing,
        completed,
        cancelled,
      },
    };
  } catch (error) {
    console.error("Error fetching job stats:", error);
    throw new Error("Failed to fetch job statistics");
  }
}
