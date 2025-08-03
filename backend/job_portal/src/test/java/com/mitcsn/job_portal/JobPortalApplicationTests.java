package com.mitcsn.job_portal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mitcsn.job_portal.dto.JobRequestDto;
import com.mitcsn.job_portal.entity.Job;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
class JobPortalApplicationTests {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void contextLoads() {
	}

	@Test
	void testCreateJob() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

		JobRequestDto jobRequest = new JobRequestDto();
		jobRequest.setCompanyName("Test Company");
		jobRequest.setAddress("Test Address");
		jobRequest.setJobPosition("Test Position");
		jobRequest.setNumberOfOpenings(1);
		jobRequest.setRequiredExperience("0-1 years");
		jobRequest.setSalaryPackage(new BigDecimal("500000"));
		jobRequest.setSkillsRequired("Java, Spring");
		jobRequest.setJobDescription("Test job description");
		jobRequest.setJobType(Job.JobType.FULL_TIME);
		jobRequest.setJobLocationType(Job.JobLocationType.ONSITE);
		jobRequest.setExpectedJoiningDate(LocalDate.now().plusMonths(1));

		mockMvc.perform(post("/api/v1/jobs")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(jobRequest)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.companyName").value("Test Company"))
				.andExpect(jsonPath("$.jobPosition").value("Test Position"));
	}

	@Test
	void testGetAllJobs() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

		mockMvc.perform(get("/api/v1/jobs"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON));
	}
}
