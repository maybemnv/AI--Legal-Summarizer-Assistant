// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-legal-summarizer-assistant-x0g7.onrender.com';

// Auth endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  SIGNUP: '/api/signup',
  SUMMARIZE: '/summarize',
};
