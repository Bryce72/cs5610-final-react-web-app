// utils/formatTime.ts

export function formatStartTime(): string {
  const date = new Date();

  // Format the date part (e.g., "Nov 29")
  const dateOptions = {
    month: "short", // Abbreviated month name
    day: "numeric", // Day of the month
  } as const; // Use 'as const' for literal types
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const datePart = dateFormatter.format(date);

  // Format the time part (e.g., "8:19am")
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const; // Use 'as const' for literal types
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  let timePart = timeFormatter.format(date);

  // Remove the space before "AM"/"PM" and convert to lowercase
  timePart = timePart.replace(" ", "").toLowerCase();

  // Combine date and time parts
  const currentTime = `${datePart} at ${timePart}`;

  return currentTime;
}
