import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/", 
  "/user/login", 
  "/user/logout", 
  "/jobs",
  "/jobs/queue",
  "/jobs/:id",
  "/job-queue",
  "/job-queue-demo"
]);
