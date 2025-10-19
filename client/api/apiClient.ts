import axios from 'axios';

// Create a new Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an interceptor to add the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const storedState = localStorage.getItem('app-state');
    
    let token = null;
    if (storedState) {
        try {
            // Parse the JSON string to get the state object
            const state = JSON.parse(storedState);
            token = state?.token;
        } catch (e) {
            console.error("Could not parse stored app state:", e);
        }
    }
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // IMPORTANT: You must return the config object, otherwise the request will be blocked
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;