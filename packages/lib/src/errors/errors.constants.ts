export const ErrorMessages = {
  VALIDATION_ERROR: "Invalid request data",
  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "You do not have permission to access this resource",
  DUPLICATE_EMAIL: "This email address is already registered",
  NOT_FOUND: (resource: string) => `${resource} was not found`,
  INTERNAL_SERVER_ERROR: "An unexpected error occurred. Please try again later",
} as const;