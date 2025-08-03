import apiService from './api';
import { 
  Job, 
  JobForm, 
  JobApplication, 
  JobSearchFilters, 
  SortOptions,
  ApiResponse,
  PaginatedResponse 
} from '../types';

class JobService {
  // Get all jobs with filters and pagination
  async getJobs(
    filters: JobSearchFilters = {},
    sortOptions: SortOptions = { sortBy: 'createdAt', sortOrder: 'desc' },
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Job>>> {
    const queryParams = {
      ...filters,
      ...sortOptions,
      page,
      limit,
    };

    const queryString = apiService.buildQueryString(queryParams);
    return await apiService.get<PaginatedResponse<Job>>(`/jobs?${queryString}`);
  }

  // Get featured jobs
  async getFeaturedJobs(limit: number = 6): Promise<ApiResponse<Job[]>> {
    return await apiService.get<Job[]>(`/jobs/featured?limit=${limit}`);
  }

  // Get recent jobs
  async getRecentJobs(limit: number = 10): Promise<ApiResponse<Job[]>> {
    return await apiService.get<Job[]>(`/jobs/recent?limit=${limit}`);
  }

  // Get job by ID
  async getJobById(id: string): Promise<ApiResponse<Job>> {
    return await apiService.get<Job>(`/jobs/${id}`);
  }

  // Create new job (for employers)
  async createJob(jobData: JobForm): Promise<ApiResponse<Job>> {
    return await apiService.post<Job>('/jobs', jobData);
  }

  // Update job
  async updateJob(id: string, jobData: Partial<JobForm>): Promise<ApiResponse<Job>> {
    return await apiService.put<Job>(`/jobs/${id}`, jobData);
  }

  // Delete job
  async deleteJob(id: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.delete<{ message: string }>(`/jobs/${id}`);
  }

  // Get jobs by employer
  async getJobsByEmployer(
    employerId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Job>>> {
    return await apiService.get<PaginatedResponse<Job>>(
      `/jobs/employer/${employerId}?page=${page}&limit=${limit}`
    );
  }

  // Get my jobs (for authenticated employers)
  async getMyJobs(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Job>>> {
    return await apiService.get<PaginatedResponse<Job>>(
      `/jobs/my-jobs?page=${page}&limit=${limit}`
    );
  }

  // Apply for a job
  async applyForJob(
    jobId: string,
    applicationData: { coverLetter?: string; resumeFile?: File }
  ): Promise<ApiResponse<JobApplication>> {
    if (applicationData.resumeFile) {
      // Upload resume first if provided
      const resumeResponse = await apiService.uploadFile<{ url: string }>(
        '/uploads/resume',
        applicationData.resumeFile
      );
      
      if (resumeResponse.success) {
        return await apiService.post<JobApplication>(`/jobs/${jobId}/apply`, {
          coverLetter: applicationData.coverLetter,
          resumeUrl: resumeResponse.data.url,
        });
      } else {
        throw new Error('Failed to upload resume');
      }
    } else {
      return await apiService.post<JobApplication>(`/jobs/${jobId}/apply`, {
        coverLetter: applicationData.coverLetter,
      });
    }
  }

  // Get job applications for a job (for employers)
  async getJobApplications(
    jobId: string,
    page: number = 1,
    limit: number = 10,
    status?: JobApplication['status']
  ): Promise<ApiResponse<PaginatedResponse<JobApplication>>> {
    const queryParams = { page, limit, ...(status && { status }) };
    const queryString = apiService.buildQueryString(queryParams);
    return await apiService.get<PaginatedResponse<JobApplication>>(
      `/jobs/${jobId}/applications?${queryString}`
    );
  }

  // Get my applications (for job seekers)
  async getMyApplications(
    page: number = 1,
    limit: number = 10,
    status?: JobApplication['status']
  ): Promise<ApiResponse<PaginatedResponse<JobApplication>>> {
    const queryParams = { page, limit, ...(status && { status }) };
    const queryString = apiService.buildQueryString(queryParams);
    return await apiService.get<PaginatedResponse<JobApplication>>(
      `/applications/my-applications?${queryString}`
    );
  }

  // Update application status (for employers)
  async updateApplicationStatus(
    applicationId: string,
    status: JobApplication['status']
  ): Promise<ApiResponse<JobApplication>> {
    return await apiService.patch<JobApplication>(`/applications/${applicationId}/status`, {
      status,
    });
  }

  // Get application by ID
  async getApplicationById(id: string): Promise<ApiResponse<JobApplication>> {
    return await apiService.get<JobApplication>(`/applications/${id}`);
  }

  // Withdraw application
  async withdrawApplication(applicationId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.delete<{ message: string }>(`/applications/${applicationId}`);
  }

  // Check if user has applied for a job
  async checkApplicationStatus(jobId: string): Promise<ApiResponse<{ hasApplied: boolean; application?: JobApplication }>> {
    return await apiService.get<{ hasApplied: boolean; application?: JobApplication }>(
      `/jobs/${jobId}/application-status`
    );
  }

  // Bookmark job
  async bookmarkJob(jobId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>(`/jobs/${jobId}/bookmark`);
  }

  // Remove bookmark
  async removeBookmark(jobId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.delete<{ message: string }>(`/jobs/${jobId}/bookmark`);
  }

  // Get bookmarked jobs
  async getBookmarkedJobs(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Job>>> {
    return await apiService.get<PaginatedResponse<Job>>(
      `/jobs/bookmarks?page=${page}&limit=${limit}`
    );
  }

  // Get job statistics (for employers)
  async getJobStats(jobId: string): Promise<ApiResponse<{
    views: number;
    applications: number;
    bookmarks: number;
  }>> {
    return await apiService.get<{
      views: number;
      applications: number;
      bookmarks: number;
    }>(`/jobs/${jobId}/stats`);
  }

  // Search job suggestions
  async getJobSuggestions(query: string): Promise<ApiResponse<string[]>> {
    return await apiService.get<string[]>(`/jobs/suggestions?q=${encodeURIComponent(query)}`);
  }

  // Get skills suggestions
  async getSkillsSuggestions(query: string): Promise<ApiResponse<string[]>> {
    return await apiService.get<string[]>(`/skills/suggestions?q=${encodeURIComponent(query)}`);
  }

  // Get location suggestions
  async getLocationSuggestions(query: string): Promise<ApiResponse<string[]>> {
    return await apiService.get<string[]>(`/locations/suggestions?q=${encodeURIComponent(query)}`);
  }

  // Report job
  async reportJob(jobId: string, reason: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>(`/jobs/${jobId}/report`, { reason });
  }
}

export default new JobService();
