package com.mitcsn.job_portal.service.impl;

import com.mitcsn.job_portal.dto.JobRequestDto;
import com.mitcsn.job_portal.dto.JobResponseDto;
import com.mitcsn.job_portal.entity.Job;
import com.mitcsn.job_portal.exception.ResourceNotFoundException;
import com.mitcsn.job_portal.mapper.JobMapper;
import com.mitcsn.job_portal.repository.JobRepository;
import com.mitcsn.job_portal.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JobServiceImpl implements JobService {
    
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    
    @Override
    public JobResponseDto createJob(JobRequestDto jobRequestDto) {
        log.info("Creating new job for company: {}", jobRequestDto.getCompanyName());
        
        Job job = jobMapper.toEntity(jobRequestDto);
        job.setIsActive(true);
        
        Job savedJob = jobRepository.save(job);
        
        log.info("Successfully created job with ID: {}", savedJob.getId());
        return jobMapper.toResponseDto(savedJob);
    }
    
    @Override
    public JobResponseDto updateJob(Long id, JobRequestDto jobRequestDto) {
        log.info("Updating job with ID: {}", id);
        
        Job existingJob = jobRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));
        
        jobMapper.updateEntityFromDto(jobRequestDto, existingJob);
        Job updatedJob = jobRepository.save(existingJob);
        
        log.info("Successfully updated job with ID: {}", id);
        return jobMapper.toResponseDto(updatedJob);
    }
    
    @Override
    @Transactional(readOnly = true)
    public JobResponseDto getJobById(Long id) {
        log.info("Fetching job with ID: {}", id);
        
        Job job = jobRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));
        
        return jobMapper.toResponseDto(job);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getAllActiveJobs() {
        log.info("Fetching all active jobs");
        
        List<Job> jobs = jobRepository.findByIsActiveTrue();
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<JobResponseDto> getAllActiveJobs(Pageable pageable) {
        log.info("Fetching active jobs with pagination");
        
        Page<Job> jobPage = jobRepository.findByIsActiveTrue(pageable);
        return jobPage.map(jobMapper::toResponseDto);
    }
    
    @Override
    public void deleteJob(Long id) {
        log.info("Deleting job with ID: {}", id);
        
        Job job = jobRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));
        
        job.setIsActive(false);
        jobRepository.save(job);
        
        log.info("Successfully deleted job with ID: {}", id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> searchJobsByCompany(String companyName) {
        log.info("Searching jobs by company name: {}", companyName);
        
        List<Job> jobs = jobRepository.findByCompanyNameContainingIgnoreCase(companyName);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> searchJobsByPosition(String jobPosition) {
        log.info("Searching jobs by position: {}", jobPosition);
        
        List<Job> jobs = jobRepository.findByJobPositionContainingIgnoreCase(jobPosition);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> searchJobsBySkill(String skill) {
        log.info("Searching jobs by skill: {}", skill);
        
        List<Job> jobs = jobRepository.findBySkillsRequiredContainingIgnoreCase(skill);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getJobsByType(Job.JobType jobType) {
        log.info("Fetching jobs by type: {}", jobType);
        
        List<Job> jobs = jobRepository.findByJobTypeAndIsActiveTrue(jobType);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getJobsByLocationType(Job.JobLocationType jobLocationType) {
        log.info("Fetching jobs by location type: {}", jobLocationType);
        
        List<Job> jobs = jobRepository.findByJobLocationTypeAndIsActiveTrue(jobLocationType);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getJobsByCompanySize(Job.CompanySize companySize) {
        log.info("Fetching jobs by company size: {}", companySize);
        
        List<Job> jobs = jobRepository.findByCompanySizeAndIsActiveTrue(companySize);
        return jobs.stream()
                .map(jobMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<JobResponseDto> searchJobs(String companyName, String jobPosition, String skill, 
                                          Job.JobType jobType, Job.JobLocationType jobLocationType, 
                                          Pageable pageable) {
        log.info("Searching jobs with filters - Company: {}, Position: {}, Skill: {}, Type: {}, Location: {}", 
                companyName, jobPosition, skill, jobType, jobLocationType);
        
        Page<Job> jobPage = jobRepository.searchJobs(companyName, jobPosition, skill, jobType, jobLocationType, pageable);
        return jobPage.map(jobMapper::toResponseDto);
    }
}
