// Set VITE_USE_MOCKS=false (in .env) to make every service call the real backend.
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';