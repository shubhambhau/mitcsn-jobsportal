package com.mitcsn.job_portal.mapper;

import com.mitcsn.job_portal.dto.JobRequestDto;
import com.mitcsn.job_portal.dto.JobResponseDto;
import com.mitcsn.job_portal.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {
    
    public Job toEntity(JobRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Job job = new Job();
        job.setCompanyName(dto.getCompanyName());
        job.setAddress(dto.getAddress());
        job.setJobPosition(dto.getJobPosition());
        job.setNumberOfOpenings(dto.getNumberOfOpenings());
        job.setRequiredExperience(dto.getRequiredExperience());
        job.setSalaryPackage(dto.getSalaryPackage());
        job.setSkillsRequired(dto.getSkillsRequired());
        job.setBond(dto.getBond());
        job.setTrainingPeriod(dto.getTrainingPeriod());
        job.setCompanySize(dto.getCompanySize());
        job.setWorkingDays(dto.getWorkingDays());
        job.setJobType(dto.getJobType());
        job.setJobLocationType(dto.getJobLocationType());
        job.setJobDescription(dto.getJobDescription());
        job.setTravelRequirements(dto.getTravelRequirements());
        job.setHiringStages(dto.getHiringStages());
        job.setInterviewMode(dto.getInterviewMode());
        job.setExpectedJoiningDate(dto.getExpectedJoiningDate());
        
        return job;
    }
    
    public JobResponseDto toResponseDto(Job job) {
        if (job == null) {
            return null;
        }
        
        JobResponseDto dto = new JobResponseDto();
        dto.setId(job.getId());
        dto.setCompanyName(job.getCompanyName());
        dto.setAddress(job.getAddress());
        dto.setJobPosition(job.getJobPosition());
        dto.setNumberOfOpenings(job.getNumberOfOpenings());
        dto.setRequiredExperience(job.getRequiredExperience());
        dto.setSalaryPackage(job.getSalaryPackage());
        dto.setSkillsRequired(job.getSkillsRequired());
        dto.setBond(job.getBond());
        dto.setTrainingPeriod(job.getTrainingPeriod());
        dto.setCompanySize(job.getCompanySize());
        dto.setWorkingDays(job.getWorkingDays());
        dto.setJobType(job.getJobType());
        dto.setJobLocationType(job.getJobLocationType());
        dto.setJobDescription(job.getJobDescription());
        dto.setTravelRequirements(job.getTravelRequirements());
        dto.setHiringStages(job.getHiringStages());
        dto.setInterviewMode(job.getInterviewMode());
        dto.setExpectedJoiningDate(job.getExpectedJoiningDate());
        dto.setIsActive(job.getIsActive());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setUpdatedAt(job.getUpdatedAt());
        
        return dto;
    }
    
    public void updateEntityFromDto(JobRequestDto dto, Job job) {
        if (dto == null || job == null) {
            return;
        }
        
        job.setCompanyName(dto.getCompanyName());
        job.setAddress(dto.getAddress());
        job.setJobPosition(dto.getJobPosition());
        job.setNumberOfOpenings(dto.getNumberOfOpenings());
        job.setRequiredExperience(dto.getRequiredExperience());
        job.setSalaryPackage(dto.getSalaryPackage());
        job.setSkillsRequired(dto.getSkillsRequired());
        job.setBond(dto.getBond());
        job.setTrainingPeriod(dto.getTrainingPeriod());
        job.setCompanySize(dto.getCompanySize());
        job.setWorkingDays(dto.getWorkingDays());
        job.setJobType(dto.getJobType());
        job.setJobLocationType(dto.getJobLocationType());
        job.setJobDescription(dto.getJobDescription());
        job.setTravelRequirements(dto.getTravelRequirements());
        job.setHiringStages(dto.getHiringStages());
        job.setInterviewMode(dto.getInterviewMode());
        job.setExpectedJoiningDate(dto.getExpectedJoiningDate());
    }
}
