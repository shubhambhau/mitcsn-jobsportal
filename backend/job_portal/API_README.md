# Job Portal Backend API

This is a Spring Boot REST API for a job portal application that supports creating and retrieving job postings.

## Features

- **Create Job Postings**: Add new job opportunities with comprehensive details
- **Retrieve Jobs**: Get all active jobs or filter by specific criteria
- **Update Jobs**: Modify existing job postings
- **Delete Jobs**: Soft delete jobs (mark as inactive)
- **Search & Filter**: Advanced search capabilities by company, position, skills, etc.
- **Pagination**: Support for paginated responses
- **Validation**: Input validation with detailed error messages

## Job Fields

Each job posting includes the following fields:

- **Company Name** (required)
- **Address** (required)
- **Job Position** (required)
- **Number of Openings** (required, positive integer)
- **Required Experience** (required)
- **Salary Package** (optional, decimal)
- **Skills Required** (required)
- **Bond** (optional)
- **Training Period** (optional)
- **Company Size** (enum: STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE)
- **Working Days** (optional)
- **Job Type** (enum: FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE)
- **Job Location Type** (enum: ONSITE, REMOTE, HYBRID)
- **Job Description** (required)
- **Travel Requirements** (enum: NONE, MINIMAL, OCCASIONAL, FREQUENT, EXTENSIVE)
- **Hiring Stages** (optional)
- **Interview Mode** (enum: ONLINE, OFFLINE, HYBRID)
- **Expected Joining Date** (optional, future date)

## API Endpoints

### Job Management

#### Create Job
```
POST /api/v1/jobs
```

#### Get All Jobs
```
GET /api/v1/jobs
```

#### Get Jobs with Pagination
```
GET /api/v1/jobs/paginated?page=0&size=10&sortBy=createdAt&sortDir=desc
```

#### Get Job by ID
```
GET /api/v1/jobs/{id}
```

#### Update Job
```
PUT /api/v1/jobs/{id}
```

#### Delete Job
```
DELETE /api/v1/jobs/{id}
```

### Search and Filter

#### Search by Company
```
GET /api/v1/jobs/search/company?companyName=TechCorp
```

#### Search by Position
```
GET /api/v1/jobs/search/position?jobPosition=Developer
```

#### Search by Skill
```
GET /api/v1/jobs/search/skill?skill=Java
```

#### Filter by Job Type
```
GET /api/v1/jobs/filter/type?jobType=FULL_TIME
```

#### Filter by Location Type
```
GET /api/v1/jobs/filter/location-type?jobLocationType=REMOTE
```

#### Filter by Company Size
```
GET /api/v1/jobs/filter/company-size?companySize=MEDIUM
```

#### Advanced Search
```
GET /api/v1/jobs/search?companyName=Tech&jobPosition=Developer&skill=Java&jobType=FULL_TIME&page=0&size=10
```

### Utility Endpoints

#### Get Job Types
```
GET /api/v1/jobs/enums/job-types
```

#### Get Location Types
```
GET /api/v1/jobs/enums/location-types
```

#### Get Company Sizes
```
GET /api/v1/jobs/enums/company-sizes
```

#### Get Travel Requirements
```
GET /api/v1/jobs/enums/travel-requirements
```

#### Get Interview Modes
```
GET /api/v1/jobs/enums/interview-modes
```

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Development Mode
```bash
cd backend/job_portal
./mvnw spring-boot:run
```

### Build and Run
```bash
cd backend/job_portal
./mvnw clean package
java -jar target/job_portal-0.0.1-SNAPSHOT.jar
```

### Access Points
- **API Base URL**: http://localhost:8080/api/v1
- **Database**: PostgreSQL (microservices_Demo)

## Database Configuration

### Production (PostgreSQL)
The application uses PostgreSQL database with the following configuration:
- URL: `jdbc:postgresql://localhost:5432/microservices_Demo`
- Username: `postgres`
- Password: `root`

Make sure PostgreSQL is installed and running on your system, and create the database:
```sql
CREATE DATABASE microservices_Demo;
```

### Test Database
For testing, create a separate test database:
```sql
CREATE DATABASE microservices_Demo_test;
```

## Sample Data

The application automatically creates sample job data on startup for testing purposes.

## Error Handling

The API provides comprehensive error handling with:
- **400 Bad Request**: Validation errors
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Unexpected errors

Error responses include:
- Timestamp
- HTTP status code
- Error message
- Request path
- Validation details (for validation errors)

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000 (React development server)
- http://localhost:3001 (Alternative React port)

## Testing

Run the test suite:
```bash
./mvnw test
```

## Technologies Used

- **Spring Boot 2.7.18**
- **Spring Data JPA**
- **Spring Web**
- **PostgreSQL Database**
- **Lombok**
- **Maven**
