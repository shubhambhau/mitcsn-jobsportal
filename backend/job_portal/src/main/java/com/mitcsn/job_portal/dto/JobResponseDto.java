package com.mitcsn.job_portal.dto;

import com.mitcsn.job_portal.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponseDto {
    
    private Long id;
    private String companyName;
    private String address;
    private String jobPosition;
    private Integer numberOfOpenings;
    private String requiredExperience;
    private BigDecimal salaryPackage;
    private String skillsRequired;
    private String bond;
    private String trainingPeriod;
    private Job.CompanySize companySize;
    private String workingDays;
    private Job.JobType jobType;
    private Job.JobLocationType jobLocationType;
    private String jobDescription;
    private Job.TravelRequirements travelRequirements;
    private String hiringStages;
    private Job.InterviewMode interviewMode;
    private LocalDate expectedJoiningDate;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
