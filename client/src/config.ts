// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Auth endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  SIGNUP: '/api/signup',
  SUMMARIZE: '/summarize',
};
