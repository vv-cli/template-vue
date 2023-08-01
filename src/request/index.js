import axios from 'axios';
import { showToast } from 'vant';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: import.meta.env.VITE_APP_TIMEOUT || 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    withCredentials: true,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    const tokenType = sessionStorage.getItem('tokenType');
    if (token) {
      config.headers.Authorization = `${tokenType || 'bearer'} ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (typeof response.data !== 'object') {
      showToast('服务端异常！');
      return Promise.reject(response);
    }
    if (response.data.success === false) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

const http = {
  get(url, params, config = {}) {
    return axiosInstance.get(url, { params, ...config });
  },
  post(url, data, params, config = {}) {
    return axiosInstance.post(url, data, { params, ...config });
  },
};

export default http;
