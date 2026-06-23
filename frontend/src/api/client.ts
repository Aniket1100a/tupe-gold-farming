import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://e80e-2409-4090-2013-6615-7c88-3956-706f-505f.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});
