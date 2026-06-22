import cron from "node-cron";
import { TourBookingService, BookingService } from "@icat/services";

const DEFAULT_CLEANUP_CRON = "* * * * *";
const JOB_TIMEZONE = process.env.JOB_TIMEZONE ?? "UTC";

type LogLevel = "info" | "error";

function logJob(level: LogLevel, jobName: string, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";

  console[level](`[${timestamp}] [${jobName}] ${message}${payload}`);
}

async function deleteExpiredCarBookings() {
  const jobName = "DELETE_EXPIRED_CAR_BOOKINGS";

  try {
    logJob("info", jobName, "Starting cleanup for bookings with deleted cars");
    const bookingService = new BookingService();
    await bookingService.deleteBookingsWithDeletedCars();
    logJob("info", jobName, "Cleanup completed for bookings with deleted cars");
  } catch (error) {
    logJob("error", jobName, "Cleanup failed for bookings with deleted cars", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function deleteExpiredTourBookings() {
  const jobName = "DELETE_EXPIRED_TOUR_BOOKINGS";

  try {
    logJob("info", jobName, "Starting cleanup for bookings with deleted tours");
    const tourBookingService = new TourBookingService();
    await tourBookingService.deleteBookingsWithDeletedTours();
    logJob("info", jobName, "Cleanup completed for bookings with deleted tours");
  } catch (error) {
    logJob("error", jobName, "Cleanup failed for bookings with deleted tours", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function runCleanupJobs() {
  await Promise.all([deleteExpiredCarBookings(), deleteExpiredTourBookings()]);
}

async function startScheduler() {
  const cronExpression = process.env.CLEANUP_CRON ?? DEFAULT_CLEANUP_CRON;

  logJob(
    "info",
    "JOB_SCHEDULER",
    `Scheduling cleanup jobs with cron expression "${cronExpression}"`,
    { timezone: JOB_TIMEZONE },
  );

  cron.schedule(
    cronExpression,
    async () => {
      logJob("info", "JOB_SCHEDULER", "Running scheduled cleanup jobs");
      await runCleanupJobs();
    },
    {
      timezone: JOB_TIMEZONE,
    },
  );
}

void startScheduler();