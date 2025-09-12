import { route } from "rwsdk/router";
import { JobQueuePage } from "./JobQueuePage";
import JobDetailsPage from "./JobDetailsPage";
import OnSceneDataCollectionPage from "./OnSceneDataCollectionPage";
import DropoffPaymentPage from "./DropoffPaymentPage";

/**
 * Job-related routes
 */
export const jobRoutes = [
  // Main job queue page
  route("/", JobQueuePage),
  
  // Alternative route for job queue (for backwards compatibility)
  route("/queue", JobQueuePage),
  
  // On-scene data collection page
  route("/:id/on-scene-data-collection", OnSceneDataCollectionPage),
  
  // Dropoff and payment processing page
  route("/:id/dropoff-payment", DropoffPaymentPage),
  
  // Job details page with dynamic ID parameter (must be last for proper matching)
  route("/:id", JobDetailsPage),
];
