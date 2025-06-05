import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateTask = (task: string) => {
  const result = {
    isValid: true,
    error: null as string | null
  };

  // Check for empty task
  if (!task.trim()) {
    result.isValid = false;
    result.error = 'Task cannot be empty';
    return result;
  }

  // Check for minimum length
  if (task.trim().length < 3) {
    result.isValid = false;
    result.error = 'Task must be at least 3 characters long';
    return result;
  }

  // Check for maximum length
  if (task.length > 255) {
    result.isValid = false;
    result.error = 'Task cannot be longer than 255 characters';
    return result;
  }

  // Check for blacklisted words 
  const blacklist = ['spam', 'advertisement', 'promotion'];
  const containsBlacklistedWord = blacklist.some(word => 
    task.toLowerCase().includes(word)
  );

  if (containsBlacklistedWord) {
    result.isValid = false;
    result.error = 'Task contains invalid content';
    return result;
  }

  return result;
};
