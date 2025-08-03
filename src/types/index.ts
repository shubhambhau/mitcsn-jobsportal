// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'job_seeker' | 'employer' | 'admin';
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobSeeker extends User {
  userType: 'job_seeker';
  profile: JobSeekerProfile;
}

export interface Employer extends User {
  userType: 'employer';
  company: Company;
}

export interface JobSeekerProfile {
  id: string;
  phone?: string;
  location?: string;
  experience?: number;
  skills: string[];
  education: Education[];
  resume?: string;
  bio?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  location: string;
  industry: string;
  size: string;
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
}

// Job Related Types
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  location: string;
  jobType: 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  company: Company;
  employerId: string;
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: string;
  updatedAt: string;
  job: Job;
  jobSeeker: JobSeeker;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  userType: 'job_seeker' | 'employer';
}

export interface JobForm {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  location: string;
  jobType: Job['jobType'];
  experience: Job['experience'];
  salaryMin?: number;
  salaryMax?: number;
  deadline?: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  experience?: number;
  skills: string[];
  bio?: string;
}

// Search and Filter Types
export interface JobSearchFilters {
  query?: string;
  location?: string;
  jobType?: Job['jobType'][];
  experience?: Job['experience'][];
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  companyId?: string;
}

export interface SortOptions {
  sortBy: 'createdAt' | 'salary' | 'relevance' | 'applications';
  sortOrder: 'asc' | 'desc';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'application_received' | 'application_status' | 'new_job_match' | 'profile_view';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

// Statistics Types
export interface DashboardStats {
  totalJobs?: number;
  totalApplications?: number;
  profileViews?: number;
  activeJobs?: number;
  pendingApplications?: number;
  shortlistedCandidates?: number;
}
