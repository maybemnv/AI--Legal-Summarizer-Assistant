// In client/lib/api.ts
import api from './axios';

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
}

// Updated uploadAndSummarize function
export async function uploadAndSummarize(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/summarize', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Upload failed');
  }
}

// Auth functions
export async function login(username: string, password: string) {
  try {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
}

export async function signup(userData: {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  organization?: string;
}) {
  try {
    const response = await api.post('/api/signup', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Signup failed');
  }
}

// Add a function to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

// Add a function to log out
export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/signin';
}

// Add a function to get the auth token
export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}