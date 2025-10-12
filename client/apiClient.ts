import axios from 'axios';
import { useAppContext } from './Context';

// Create a new Axios instance
const apiClient = axios.create({
  baseURL: 'https://localhost:3000',
});

// Use an interceptor to add the token to every request
apiClient.interceptors.request.use(
  (config: any) => {
    // Get the token from localStorage (or wherever you store it)
    const { token } = useAppContext();

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // IMPORTANT: You must return the config object, otherwise the request will be blocked
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error(error)
    return Promise.reject(error);
  }
);

export default apiClient;