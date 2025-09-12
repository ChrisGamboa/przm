import { route } from "rwsdk/router";
import { JobQueuePage } from "./JobQueuePage";

/**
 * Job-related routes
 */
export const jobRoutes = [
  // Main job queue page
  route("/", JobQueuePage),
  
  // Alternative route for job queue (for backwards compatibility)
  route("/queue", JobQueuePage),
];
