import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { User } from '../types';
import './Header.css';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    onLogout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>MITCSN</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link 
              to="/jobs" 
              className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
            >
              Find Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`nav-link ${isActive('/companies') ? 'active' : ''}`}
            >
              Companies
            </Link>
            {user?.userType === 'employer' && (
              <Link 
                to="/post-job" 
                className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}
              >
                Post Job
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            {user ? (
              <div className="user-menu">
                <button
                  className="user-menu-trigger"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="user-avatar">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.firstName || 'User'} />
                    ) : (
                      <span>
                        {user.firstName?.charAt(0) || 'U'}
                        {user.lastName?.charAt(0) || ''}
                      </span>
                    )}
                  </div>
                  <span>{user.firstName || 'User'}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className="user-menu-dropdown">
                    <Link 
                      to="/dashboard" 
                      className="dropdown-item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {user.userType === 'job_seeker' && (
                      <>
                        <Link 
                          to="/applications" 
                          className="dropdown-item"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Applications
                        </Link>
                        <Link 
                          to="/bookmarks" 
                          className="dropdown-item"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Bookmarks
                        </Link>
                      </>
                    )}
                    {user.userType === 'employer' && (
                      <>
                        <Link 
                          to="/my-jobs" 
                          className="dropdown-item"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          My Jobs
                        </Link>
                        <Link 
                          to="/candidates" 
                          className="dropdown-item"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Candidates
                        </Link>
                      </>
                    )}
                    <hr className="dropdown-divider" />
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <Link 
              to="/jobs" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/companies" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </Link>
            {user?.userType === 'employer' && (
              <Link 
                to="/post-job" 
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Job
              </Link>
            )}
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
