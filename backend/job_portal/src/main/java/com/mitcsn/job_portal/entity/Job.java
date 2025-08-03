package com.mitcsn.job_portal.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must not exceed 100 characters")
    @Column(name = "company_name", nullable = false, length = 100)
    private String companyName;
    
    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address must not exceed 500 characters")
    @Column(name = "address", nullable = false, length = 500)
    private String address;
    
    @NotBlank(message = "Job position is required")
    @Size(max = 100, message = "Job position must not exceed 100 characters")
    @Column(name = "job_position", nullable = false, length = 100)
    private String jobPosition;
    
    @NotNull(message = "Number of openings is required")
    @Positive(message = "Number of openings must be positive")
    @Column(name = "number_of_openings", nullable = false)
    private Integer numberOfOpenings;
    
    @NotBlank(message = "Required experience is required")
    @Size(max = 50, message = "Required experience must not exceed 50 characters")
    @Column(name = "required_experience", nullable = false, length = 50)
    private String requiredExperience;
    
    @Column(name = "salary_package", precision = 12, scale = 2)
    private BigDecimal salaryPackage;
    
    @NotBlank(message = "Skills required are required")
    @Size(max = 1000, message = "Skills required must not exceed 1000 characters")
    @Column(name = "skills_required", nullable = false, length = 1000)
    private String skillsRequired;
    
    @Size(max = 500, message = "Bond details must not exceed 500 characters")
    @Column(name = "bond", length = 500)
    private String bond;
    
    @Size(max = 100, message = "Training period must not exceed 100 characters")
    @Column(name = "training_period", length = 100)
    private String trainingPeriod;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    private CompanySize companySize;
    
    @Size(max = 50, message = "Working days must not exceed 50 characters")
    @Column(name = "working_days", length = 50)
    private String workingDays;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_location_type")
    private JobLocationType jobLocationType;
    
    @NotBlank(message = "Job description is required")
    @Size(max = 2000, message = "Job description must not exceed 2000 characters")
    @Column(name = "job_description", nullable = false, length = 2000)
    private String jobDescription;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "travel_requirements")
    private TravelRequirements travelRequirements;
    
    @Size(max = 1000, message = "Hiring stages must not exceed 1000 characters")
    @Column(name = "hiring_stages", length = 1000)
    private String hiringStages;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "interview_mode")
    private InterviewMode interviewMode;
    
    @Column(name = "expected_joining_date")
    private LocalDate expectedJoiningDate;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enums
    public enum CompanySize {
        STARTUP("1-10"),
        SMALL("11-50"),
        MEDIUM("51-200"),
        LARGE("201-1000"),
        ENTERPRISE("1000+");
        
        private final String description;
        
        CompanySize(String description) {
            this.description = description;
        }
        
        public String getDescription() {
            return description;
        }
    }
    
    public enum JobType {
        FULL_TIME,
        PART_TIME,
        CONTRACT,
        INTERNSHIP,
        FREELANCE
    }
    
    public enum JobLocationType {
        ONSITE,
        REMOTE,
        HYBRID
    }
    
    public enum TravelRequirements {
        NONE,
        MINIMAL,
        OCCASIONAL,
        FREQUENT,
        EXTENSIVE
    }
    
    public enum InterviewMode {
        ONLINE,
        OFFLINE,
        HYBRID
    }
}
