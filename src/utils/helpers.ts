// Date utilities
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const d = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

export const isDeadlinePassed = (deadline: string): boolean => {
  return new Date(deadline) < new Date();
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatJobType = (jobType: string): string => {
  return jobType.split('_').map(word => capitalizeFirstLetter(word)).join(' ');
};

export const formatExperienceLevel = (experience: string): string => {
  const levels: Record<string, string> = {
    entry: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior Level',
    executive: 'Executive Level',
  };
  return levels[experience] || capitalizeFirstLetter(experience);
};

// Number utilities
export const formatSalary = (
  min?: number,
  max?: number,
  currency: string = 'USD'
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  } else if (min) {
    return `${formatter.format(min)}+`;
  } else if (max) {
    return `Up to ${formatter.format(max)}`;
  }
  return 'Negotiable';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Array utilities
export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const sortByProperty = <T>(array: T[], property: keyof T, ascending: boolean = true): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
};

// URL utilities
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const updateQueryParams = (params: Record<string, string | null>): void => {
  const url = new URL(window.location.href);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  
  window.history.replaceState({}, '', url.toString());
};

// File utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Local storage utilities
export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Color utilities
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: '#10B981',
    pending: '#F59E0B',
    rejected: '#EF4444',
    approved: '#10B981',
    closed: '#6B7280',
    draft: '#8B5CF6',
    hired: '#059669',
    shortlisted: '#3B82F6',
    reviewed: '#8B5CF6',
  };
  return colors[status] || '#6B7280';
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Theme utilities
export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
