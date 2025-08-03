package com.mitcsn.job_portal.controller;

import com.mitcsn.job_portal.dto.JobRequestDto;
import com.mitcsn.job_portal.dto.JobResponseDto;
import com.mitcsn.job_portal.entity.Job;
import com.mitcsn.job_portal.service.JobService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Slf4j
//@CrossOrigin(origins = "*", maxAge = 3600)
public class JobController {
    
    private final JobService jobService;
    
    @PostMapping
    public ResponseEntity<JobResponseDto> createJob(@Valid @RequestBody JobRequestDto jobRequestDto) {
        log.info("Received request to create job for company: {}", jobRequestDto.getCompanyName());
        JobResponseDto createdJob = jobService.createJob(jobRequestDto);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobResponseDto> updateJob(
            @PathVariable Long id, 
            @Valid @RequestBody JobRequestDto jobRequestDto) {
        log.info("Received request to update job with ID: {}", id);
        JobResponseDto updatedJob = jobService.updateJob(id, jobRequestDto);
        return ResponseEntity.ok(updatedJob);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable Long id) {
        log.info("Received request to get job with ID: {}", id);
        JobResponseDto job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }
    
    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getAllJobs() {
        log.info("Received request to get all active jobs");
        List<JobResponseDto> jobs = jobService.getAllActiveJobs();
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/paginated")
    public ResponseEntity<Page<JobResponseDto>> getAllJobsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("Received request to get paginated jobs - page: {}, size: {}, sortBy: {}, sortDir: {}", 
                page, size, sortBy, sortDir);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<JobResponseDto> jobs = jobService.getAllActiveJobs(pageable);
        
        return ResponseEntity.ok(jobs);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.info("Received request to delete job with ID: {}", id);
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search/company")
    public ResponseEntity<List<JobResponseDto>> searchJobsByCompany(
            @RequestParam String companyName) {
        log.info("Received request to search jobs by company: {}", companyName);
        List<JobResponseDto> jobs = jobService.searchJobsByCompany(companyName);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/search/position")
    public ResponseEntity<List<JobResponseDto>> searchJobsByPosition(
            @RequestParam String jobPosition) {
        log.info("Received request to search jobs by position: {}", jobPosition);
        List<JobResponseDto> jobs = jobService.searchJobsByPosition(jobPosition);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/search/skill")
    public ResponseEntity<List<JobResponseDto>> searchJobsBySkill(
            @RequestParam String skill) {
        log.info("Received request to search jobs by skill: {}", skill);
        List<JobResponseDto> jobs = jobService.searchJobsBySkill(skill);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/filter/type")
    public ResponseEntity<List<JobResponseDto>> getJobsByType(
            @RequestParam Job.JobType jobType) {
        log.info("Received request to get jobs by type: {}", jobType);
        List<JobResponseDto> jobs = jobService.getJobsByType(jobType);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/filter/location-type")
    public ResponseEntity<List<JobResponseDto>> getJobsByLocationType(
            @RequestParam Job.JobLocationType jobLocationType) {
        log.info("Received request to get jobs by location type: {}", jobLocationType);
        List<JobResponseDto> jobs = jobService.getJobsByLocationType(jobLocationType);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/filter/company-size")
    public ResponseEntity<List<JobResponseDto>> getJobsByCompanySize(
            @RequestParam Job.CompanySize companySize) {
        log.info("Received request to get jobs by company size: {}", companySize);
        List<JobResponseDto> jobs = jobService.getJobsByCompanySize(companySize);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<JobResponseDto>> searchJobs(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String jobPosition,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) Job.JobType jobType,
            @RequestParam(required = false) Job.JobLocationType jobLocationType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("Received advanced search request with filters");
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<JobResponseDto> jobs = jobService.searchJobs(
                companyName, jobPosition, skill, jobType, jobLocationType, pageable);
        
        return ResponseEntity.ok(jobs);
    }
    
    // Utility endpoints for enum values
    @GetMapping("/enums/job-types")
    public ResponseEntity<Job.JobType[]> getJobTypes() {
        return ResponseEntity.ok(Job.JobType.values());
    }
    
    @GetMapping("/enums/location-types")
    public ResponseEntity<Job.JobLocationType[]> getLocationTypes() {
        return ResponseEntity.ok(Job.JobLocationType.values());
    }
    
    @GetMapping("/enums/company-sizes")
    public ResponseEntity<Job.CompanySize[]> getCompanySizes() {
        return ResponseEntity.ok(Job.CompanySize.values());
    }
    
    @GetMapping("/enums/travel-requirements")
    public ResponseEntity<Job.TravelRequirements[]> getTravelRequirements() {
        return ResponseEntity.ok(Job.TravelRequirements.values());
    }
    
    @GetMapping("/enums/interview-modes")
    public ResponseEntity<Job.InterviewMode[]> getInterviewModes() {
        return ResponseEntity.ok(Job.InterviewMode.values());
    }
}
