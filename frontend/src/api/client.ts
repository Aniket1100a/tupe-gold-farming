import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://111e-2409-4090-2013-6615-813f-b565-6073-7106.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});
