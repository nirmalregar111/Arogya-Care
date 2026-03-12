import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Patients
export const patientService = {
  create: (data) => api.post('/patients', data),
  getAll: () => api.get('/patients'),
  get: (id) => api.get(`/patients/${encodeURIComponent(id)}`),
  update: (id, data) => api.put(`/patients/${encodeURIComponent(id)}`, data),
  delete: (id) => api.delete(`/patients/${encodeURIComponent(id)}`),
  uploadReport: (id, formData) =>
    api.post(`/patients/${encodeURIComponent(id)}/reports`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getReports: (id) => api.get(`/patients/${encodeURIComponent(id)}/reports`),
};

// AI Predictions
export const predictionService = {
  predictDisease: (data) => api.post('/ai/predict-disease', data),
  simulateTreatment: (data) => api.post('/ai/treatment-simulation', data),
  simulateLifestyle: (data) => api.post('/ai/lifestyle-impact', data),
  optimizeTreatmentCost: (data) => api.post('/ai/treatment-cost', data),
  getHabitPlan: (patientId) => api.get(`/ai/habit-plan${patientId ? `?patient_id=${encodeURIComponent(patientId)}` : ''}`),
  getPredictions: (params) => api.get('/ai/predictions', { params }),
};

// Chatbot
export const chatbotService = {
  sendMessage: (data) => api.post('/chatbot/message', data),
  getHistory: (sessionId) => api.get(`/chatbot/history${sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : ''}`),
  getSessions: () => api.get('/chatbot/sessions'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
