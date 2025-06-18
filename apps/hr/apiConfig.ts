import axios from 'axios';
import { getCookie } from 'cookies-next';

const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080',
    IMAGE_ROOT: 'http://localhost/abas_api/public/',
  },
  staging: {
    API_BASE_URL: 'https://api.avegabros.org',
    IMAGE_ROOT: 'https://api.avegabros.org/public/',
  },
} as const;

const environment = 'staging';

const { API_BASE_URL, IMAGE_ROOT } = config[environment];

export { API_BASE_URL, IMAGE_ROOT };

export const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = getCookie('auth_token');
  if (token) {
      config.headers.Authorization = `${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});
