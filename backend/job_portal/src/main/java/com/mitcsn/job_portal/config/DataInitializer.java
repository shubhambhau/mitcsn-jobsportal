package com.mitcsn.job_portal.config;

import com.mitcsn.job_portal.entity.Job;
import com.mitcsn.job_portal.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final JobRepository jobRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (jobRepository.count() == 0) {
            log.info("Initializing sample job data...");
            
            // Sample Job 1
            Job job1 = new Job();
            job1.setCompanyName("TechCorp Solutions");
            job1.setAddress("123 Tech Street, Bangalore, Karnataka, India");
            job1.setJobPosition("Software Engineer");
            job1.setNumberOfOpenings(5);
            job1.setRequiredExperience("0-2 years");
            job1.setSalaryPackage(new BigDecimal("600000"));
            job1.setSkillsRequired("Java, Spring Boot, React, MySQL");
            job1.setBond("2 years service agreement");
            job1.setTrainingPeriod("3 months");
            job1.setCompanySize(Job.CompanySize.MEDIUM);
            job1.setWorkingDays("Monday to Friday");
            job1.setJobType(Job.JobType.FULL_TIME);
            job1.setJobLocationType(Job.JobLocationType.HYBRID);
            job1.setJobDescription("We are looking for passionate software engineers to join our growing team. You will work on cutting-edge web applications and gain experience in full-stack development.");
            job1.setTravelRequirements(Job.TravelRequirements.MINIMAL);
            job1.setHiringStages("Online Assessment, Technical Interview, HR Interview");
            job1.setInterviewMode(Job.InterviewMode.HYBRID);
            job1.setExpectedJoiningDate(LocalDate.now().plusMonths(1));
            job1.setIsActive(true);
            
            // Sample Job 2
            Job job2 = new Job();
            job2.setCompanyName("DataFlow Analytics");
            job2.setAddress("456 Data Avenue, Pune, Maharashtra, India");
            job2.setJobPosition("Data Analyst");
            job2.setNumberOfOpenings(3);
            job2.setRequiredExperience("1-3 years");
            job2.setSalaryPackage(new BigDecimal("550000"));
            job2.setSkillsRequired("Python, SQL, Tableau, Excel, Statistics");
            job2.setBond("1 year service agreement");
            job2.setTrainingPeriod("2 months");
            job2.setCompanySize(Job.CompanySize.SMALL);
            job2.setWorkingDays("Monday to Saturday");
            job2.setJobType(Job.JobType.FULL_TIME);
            job2.setJobLocationType(Job.JobLocationType.ONSITE);
            job2.setJobDescription("Join our analytics team to work with large datasets and create meaningful insights for business decisions. Experience with data visualization tools is a plus.");
            job2.setTravelRequirements(Job.TravelRequirements.OCCASIONAL);
            job2.setHiringStages("Resume Screening, Technical Test, Panel Interview");
            job2.setInterviewMode(Job.InterviewMode.OFFLINE);
            job2.setExpectedJoiningDate(LocalDate.now().plusWeeks(3));
            job2.setIsActive(true);
            
            // Sample Job 3
            Job job3 = new Job();
            job3.setCompanyName("Global Tech Inc");
            job3.setAddress("789 Innovation Hub, Hyderabad, Telangana, India");
            job3.setJobPosition("Frontend Developer");
            job3.setNumberOfOpenings(2);
            job3.setRequiredExperience("2-4 years");
            job3.setSalaryPackage(new BigDecimal("750000"));
            job3.setSkillsRequired("React, Angular, TypeScript, CSS, HTML5");
            job3.setBond("No bond");
            job3.setTrainingPeriod("1 month");
            job3.setCompanySize(Job.CompanySize.LARGE);
            job3.setWorkingDays("Flexible");
            job3.setJobType(Job.JobType.FULL_TIME);
            job3.setJobLocationType(Job.JobLocationType.REMOTE);
            job3.setJobDescription("Work on modern web applications using the latest frontend technologies. Collaborate with international teams and contribute to open-source projects.");
            job3.setTravelRequirements(Job.TravelRequirements.NONE);
            job3.setHiringStages("Portfolio Review, Coding Challenge, Technical Interview, Cultural Fit Interview");
            job3.setInterviewMode(Job.InterviewMode.ONLINE);
            job3.setExpectedJoiningDate(LocalDate.now().plusMonths(2));
            job3.setIsActive(true);
            
            jobRepository.save(job1);
            jobRepository.save(job2);
            jobRepository.save(job3);
            
            log.info("Sample job data initialized successfully!");
        }
    }
}
