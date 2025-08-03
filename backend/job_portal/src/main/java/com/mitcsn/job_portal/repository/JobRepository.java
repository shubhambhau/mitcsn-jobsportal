package com.mitcsn.job_portal.repository;

import com.mitcsn.job_portal.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Find all active jobs
    List<Job> findByIsActiveTrue();
    
    // Find all active jobs with pagination
    Page<Job> findByIsActiveTrue(Pageable pageable);
    
    // Find active job by ID
    Optional<Job> findByIdAndIsActiveTrue(Long id);
    
    // Search jobs by company name (case-insensitive)
    @Query("SELECT j FROM Job j WHERE j.isActive = true AND LOWER(j.companyName) LIKE LOWER(CONCAT('%', :companyName, '%'))")
    List<Job> findByCompanyNameContainingIgnoreCase(@Param("companyName") String companyName);
    
    // Search jobs by job position (case-insensitive)
    @Query("SELECT j FROM Job j WHERE j.isActive = true AND LOWER(j.jobPosition) LIKE LOWER(CONCAT('%', :jobPosition, '%'))")
    List<Job> findByJobPositionContainingIgnoreCase(@Param("jobPosition") String jobPosition);
    
    // Search jobs by skills (case-insensitive)
    @Query("SELECT j FROM Job j WHERE j.isActive = true AND LOWER(j.skillsRequired) LIKE LOWER(CONCAT('%', :skill, '%'))")
    List<Job> findBySkillsRequiredContainingIgnoreCase(@Param("skill") String skill);
    
    // Find jobs by job type
    List<Job> findByJobTypeAndIsActiveTrue(Job.JobType jobType);
    
    // Find jobs by location type
    List<Job> findByJobLocationTypeAndIsActiveTrue(Job.JobLocationType jobLocationType);
    
    // Find jobs by company size
    List<Job> findByCompanySizeAndIsActiveTrue(Job.CompanySize companySize);
    
    // Complex search query
    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
           "AND (:companyName IS NULL OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :companyName, '%'))) " +
           "AND (:jobPosition IS NULL OR LOWER(j.jobPosition) LIKE LOWER(CONCAT('%', :jobPosition, '%'))) " +
           "AND (:skill IS NULL OR LOWER(j.skillsRequired) LIKE LOWER(CONCAT('%', :skill, '%'))) " +
           "AND (:jobType IS NULL OR j.jobType = :jobType) " +
           "AND (:jobLocationType IS NULL OR j.jobLocationType = :jobLocationType)")
    Page<Job> searchJobs(@Param("companyName") String companyName,
                        @Param("jobPosition") String jobPosition,
                        @Param("skill") String skill,
                        @Param("jobType") Job.JobType jobType,
                        @Param("jobLocationType") Job.JobLocationType jobLocationType,
                        Pageable pageable);
}
