import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { formatJobType, formatSalary, formatRelativeTime, formatExperienceLevel } from '../utils/helpers';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  variant?: 'card' | 'list';
  showBookmark?: boolean;
  onBookmark?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  variant = 'card', 
  showBookmark = false,
  onBookmark 
}) => {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(job.id);
    }
  };

  if (variant === 'list') {
    return (
      <div className="job-list-item">
        <div className="job-list-content">
          <div className="job-list-header">
            <div className="company-logo-small">
              {job.company.logo ? (
                <img src={job.company.logo} alt={job.company.name} />
              ) : (
                <span>{job.company.name?.charAt(0) || 'C'}</span>
              )}
            </div>
            <div className="job-list-info">
              <h3>
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="company-info">
                {job.company.name} • {job.location}
              </p>
              <div className="job-tags-list">
                <span className="tag">{formatJobType(job.jobType)}</span>
                <span className="tag">{formatExperienceLevel(job.experience)}</span>
              </div>
            </div>
          </div>
          <div className="job-list-meta">
            <div className="job-salary">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </div>
            <div className="job-date">
              {formatRelativeTime(job.createdAt)}
            </div>
            {showBookmark && (
              <button 
                className="bookmark-btn"
                onClick={handleBookmark}
                aria-label="Bookmark job"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-card">
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
        {showBookmark && (
          <button 
            className="bookmark-btn"
            onClick={handleBookmark}
            aria-label="Bookmark job"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      
      <div className="job-details">
        <div className="job-tags">
          <span className="tag job-type">{formatJobType(job.jobType)}</span>
          <span className="tag experience">{formatExperienceLevel(job.experience)}</span>
        </div>
        
        <div className="job-salary">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </div>
        
        <p className="job-description">
          {job.description.length > 120 
            ? `${job.description.substring(0, 120)}...` 
            : job.description
          }
        </p>

        {job.skills && job.skills.length > 0 && (
          <div className="job-skills">
            <span className="skills-label">Skills:</span>
            <div className="skills-list">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {job.skills.length > 3 && (
                <span className="skill-tag more">+{job.skills.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="job-card-footer">
        <span className="job-date">{formatRelativeTime(job.createdAt)}</span>
        <div className="job-actions">
          <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          <button className="btn btn-primary btn-sm">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
