import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Job } from '../types';
import jobService from '../services/job';
import { formatJobType, formatSalary, formatRelativeTime } from '../utils/helpers';
import './Home.css';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [featuredResponse, recentResponse] = await Promise.all([
        jobService.getFeaturedJobs(6),
        jobService.getRecentJobs(8)
      ]);

      if (featuredResponse.success) {
        setFeaturedJobs(featuredResponse.data);
      }

      if (recentResponse.success) {
        setRecentJobs(recentResponse.data);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.append('q', searchQuery);
    if (location) searchParams.append('location', location);
    
    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Dream Job Today</h1>
            <p>
              Discover thousands of job opportunities with all the information you need. 
              It's your future. Come find it. Manage all your job applications from start to finish.
            </p>
            
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-inputs">
                <div className="search-input-group">
                  <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="search-input-group">
                  <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              
              <button type="submit" className="search-btn">
                Search Jobs
              </button>
            </form>

            <div className="quick-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Jobs Available</span>
              </div>
              <div className="stat">
                <span className="stat-number">5,000+</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat">
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Job Seekers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs">
        <div className="container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <Link to="/jobs" className="view-all-link">
              View All Jobs →
            </Link>
          </div>

          {isLoading ? (
            <div className="loading">Loading featured jobs...</div>
          ) : (
            <div className="jobs-grid">
              {featuredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-card-header">
                    <div className="company-logo">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} />
                      ) : (
                        <span>{job.company.name?.charAt(0) || 'C'}</span>
                      )}
                    </div>
                    <div className="job-info">
                      <h3>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="company-name">{job.company.name}</p>
                      <p className="job-location">{job.location}</p>
                    </div>
                  </div>
                  
                  <div className="job-details">
                    <div className="job-tags">
                      <span className="tag job-type">{formatJobType(job.jobType)}</span>
                      <span className="tag experience">{job.experience}</span>
                    </div>
                    
                    <div className="job-salary">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </div>
                    
                    <p className="job-description">
                      {job.description.length > 100 
                        ? `${job.description.substring(0, 100)}...` 
                        : job.description
                      }
                    </p>
                  </div>
                  
                  <div className="job-card-footer">
                    <span className="job-date">{formatRelativeTime(job.createdAt)}</span>
                    <Link to={`/jobs/${job.id}`} className="apply-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3>Create Your Profile</h3>
              <p>Build a compelling profile that showcases your skills, experience, and career goals.</p>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3>Search & Apply</h3>
              <p>Browse thousands of job opportunities and apply to positions that match your interests.</p>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Get Hired</h3>
              <p>Connect with employers, showcase your talents, and land your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="recent-jobs">
        <div className="container">
          <div className="section-header">
            <h2>Latest Job Openings</h2>
            <Link to="/jobs" className="view-all-link">
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="loading">Loading recent jobs...</div>
          ) : (
            <div className="jobs-list">
              {recentJobs.map((job) => (
                <div key={job.id} className="job-list-item">
                  <div className="job-list-info">
                    <div className="company-logo-small">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} />
                      ) : (
                        <span>{job.company.name?.charAt(0) || 'C'}</span>
                      )}
                    </div>
                    <div className="job-details-small">
                      <h4>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </h4>
                      <p>{job.company.name} • {job.location}</p>
                      <div className="job-tags-small">
                        <span className="tag-small">{formatJobType(job.jobType)}</span>
                        <span className="tag-small">{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-list-meta">
                    <div className="job-salary-small">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </div>
                    <div className="job-date-small">
                      {formatRelativeTime(job.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of professionals who have found their dream jobs through our platform.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/jobs" className="btn btn-outline btn-large">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
