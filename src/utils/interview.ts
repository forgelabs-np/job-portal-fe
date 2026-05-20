import { InterviewResponse } from "@/api/admin-interview";

/**
 * Check if an interview can be cancelled
 */
export const canCancelInterview = (interview: InterviewResponse): boolean => {
  const cancelableStatuses = ["SCHEDULED", "RESCHEDULED"];
  return cancelableStatuses.includes(interview.status);
};

/**
 * Check if an interview result can be set
 */
export const canSetInterviewResult = (
  interview: InterviewResponse
): boolean => {
  const completableStatuses = ["SCHEDULED", "RESCHEDULED", "COMPLETED"];
  return completableStatuses.includes(interview.status);
};

/**
 * Check if an interview can be rescheduled
 */
export const canRescheduleInterview = (
  interview: InterviewResponse
): boolean => {
  const reschedulableStatuses = ["SCHEDULED", "RESCHEDULED"];
  return reschedulableStatuses.includes(interview.status);
};

/**
 * Format interview date and time with timezone
 */
export const formatInterviewDateTime = (
  interview: InterviewResponse
): string => {
  const dateTime = new Date(interview.scheduledAt);
  return `${dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })} ${interview.timezone}`;
};

/**
 * Get status color for badge
 */
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    SCHEDULED: "blue",
    RESCHEDULED: "purple",
    COMPLETED: "green",
    CANCELLED: "red",
    NO_SHOW: "orange",
  };
  return colors[status] || "gray";
};

/**
 * Get result color for badge
 */
export const getResultColor = (result: string): string => {
  const colors: Record<string, string> = {
    PENDING: "gray",
    PASS: "green",
    FAIL: "red",
    RE_INTERVIEW: "orange",
  };
  return colors[result] || "gray";
};

/**
 * Check if interview is completed
 */
export const isInterviewCompleted = (interview: InterviewResponse): boolean => {
  return interview.status === "COMPLETED" && interview.result !== "PENDING";
};

/**
 * Get readable status label
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    SCHEDULED: "Scheduled",
    RESCHEDULED: "Rescheduled",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    NO_SHOW: "No Show",
  };
  return labels[status] || status;
};

/**
 * Get readable result label
 */
export const getResultLabel = (result: string): string => {
  const labels: Record<string, string> = {
    PENDING: "Pending",
    PASS: "Passed",
    FAIL: "Failed",
    RE_INTERVIEW: "Re-Interview Required",
  };
  return labels[result] || result;
};

/**
 * Calculate days until interview
 */
export const getDaysUntilInterview = (scheduledAt: string): number => {
  const now = new Date();
  const scheduled = new Date(scheduledAt);
  const diffTime = scheduled.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if interview is upcoming (within 7 days)
 */
export const isUpcomingInterview = (interview: InterviewResponse): boolean => {
  const daysUntil = getDaysUntilInterview(interview.scheduledAt);
  return daysUntil > 0 && daysUntil <= 7;
};

/**
 * Check if interview has passed
 */
export const hasInterviewPassed = (interview: InterviewResponse): boolean => {
  const daysUntil = getDaysUntilInterview(interview.scheduledAt);
  return (
    daysUntil < 0 ||
    interview.status === "COMPLETED" ||
    interview.status === "CANCELLED"
  );
};
