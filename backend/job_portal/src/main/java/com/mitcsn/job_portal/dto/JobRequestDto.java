package com.mitcsn.job_portal.dto;

import com.mitcsn.job_portal.entity.Job;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDto {
    
    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String companyName;
    
    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address must not exceed 500 characters")
    private String address;
    
    @NotBlank(message = "Job position is required")
    @Size(max = 100, message = "Job position must not exceed 100 characters")
    private String jobPosition;
    
    @NotNull(message = "Number of openings is required")
    @Positive(message = "Number of openings must be positive")
    private Integer numberOfOpenings;
    
    @NotBlank(message = "Required experience is required")
    @Size(max = 50, message = "Required experience must not exceed 50 characters")
    private String requiredExperience;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Salary package must be positive")
    private BigDecimal salaryPackage;
    
    @NotBlank(message = "Skills required are required")
    @Size(max = 1000, message = "Skills required must not exceed 1000 characters")
    private String skillsRequired;
    
    @Size(max = 500, message = "Bond details must not exceed 500 characters")
    private String bond;
    
    @Size(max = 100, message = "Training period must not exceed 100 characters")
    private String trainingPeriod;
    
    private Job.CompanySize companySize;
    
    @Size(max = 50, message = "Working days must not exceed 50 characters")
    private String workingDays;
    
    private Job.JobType jobType;
    
    private Job.JobLocationType jobLocationType;
    
    @NotBlank(message = "Job description is required")
    @Size(max = 2000, message = "Job description must not exceed 2000 characters")
    private String jobDescription;
    
    private Job.TravelRequirements travelRequirements;
    
    @Size(max = 1000, message = "Hiring stages must not exceed 1000 characters")
    private String hiringStages;
    
    private Job.InterviewMode interviewMode;
    
    @Future(message = "Expected joining date must be in the future")
    private LocalDate expectedJoiningDate;
}
