import axios from 'axios';
import { API_V1_URL } from '../constants';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_V1_URL,
});

$api.interceptors.request.use((config) => {
  //TODO: should i do that?
  // const tokenLocalStorage = localStorage.getItem('token');
  // if (!tokenLocalStorage) {
  //   return config;
  // }
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(`${API_V1_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);

        return $api.request(originalRequest);
      } catch (error) {
        console.log('USER DON`T AUTHORIZATION!');
      }
    }

    throw error;
  },
);

export default $api;
