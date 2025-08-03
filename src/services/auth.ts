import apiService from './api';
import { 
  User, 
  LoginForm, 
  RegisterForm, 
  ApiResponse,
  JobSeeker,
  Employer 
} from '../types';

class AuthService {
  // Login user
  async login(credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiService.post<{ user: User; token: string }>('/auth/login', credentials);
    
    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // Register user
  async register(userData: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiService.post<{ user: User; token: string }>('/auth/register', userData);
    
    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Refresh user profile
  async refreshProfile(): Promise<ApiResponse<User>> {
    const response = await apiService.get<User>('/auth/profile');
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response;
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>('/auth/forgot-password', { email });
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>('/auth/reset-password', {
      token,
      password: newPassword,
    });
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  // Update profile
  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiService.put<User>('/auth/profile', profileData);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response;
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<ApiResponse<{ profilePicture: string }>> {
    return await apiService.uploadFile<{ profilePicture: string }>('/auth/profile/picture', file);
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>('/auth/verify-email', { token });
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<ApiResponse<{ message: string }>> {
    return await apiService.post<{ message: string }>('/auth/resend-verification');
  }
}

export default new AuthService();
