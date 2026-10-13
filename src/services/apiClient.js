import axios from 'axios';
import { API_BASE_URL } from '../constants/env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach the auth token here once the backend provides one.
apiClient.interceptors.request.use((config) => config);

// Normalise every failure into { status, message, fieldErrors } so the UI handles one shape.
apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject({
      status: error.response?.status ?? null,
      message: error.response?.data?.message ?? error.message ?? 'Something went wrong',
      fieldErrors: error.response?.data?.errors ?? null,
    }),
);

export default apiClient;