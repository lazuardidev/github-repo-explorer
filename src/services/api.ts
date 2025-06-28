import axios from 'axios';
import { APIConfig } from '../config/api';

export const api = axios.create({
  baseURL: APIConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
