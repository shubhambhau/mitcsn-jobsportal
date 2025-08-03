package com.mitcsn.job_portal.service;

import com.mitcsn.job_portal.dto.JobRequestDto;
import com.mitcsn.job_portal.dto.JobResponseDto;
import com.mitcsn.job_portal.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    
    JobResponseDto createJob(JobRequestDto jobRequestDto);
    
    JobResponseDto updateJob(Long id, JobRequestDto jobRequestDto);
    
    JobResponseDto getJobById(Long id);
    
    List<JobResponseDto> getAllActiveJobs();
    
    Page<JobResponseDto> getAllActiveJobs(Pageable pageable);
    
    void deleteJob(Long id);
    
    List<JobResponseDto> searchJobsByCompany(String companyName);
    
    List<JobResponseDto> searchJobsByPosition(String jobPosition);
    
    List<JobResponseDto> searchJobsBySkill(String skill);
    
    List<JobResponseDto> getJobsByType(Job.JobType jobType);
    
    List<JobResponseDto> getJobsByLocationType(Job.JobLocationType jobLocationType);
    
    List<JobResponseDto> getJobsByCompanySize(Job.CompanySize companySize);
    
    Page<JobResponseDto> searchJobs(String companyName, String jobPosition, String skill, 
                                   Job.JobType jobType, Job.JobLocationType jobLocationType, 
                                   Pageable pageable);
}
