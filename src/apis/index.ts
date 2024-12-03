import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@constants/constants';
import { getAuthToken, removeAuthToken, setAuthToken } from '@utils/auth';
import useAuthStore from '@store/authStore';

// Default Instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Auth Instance
const authInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// response interceptor (토큰 갱신)
authInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // token 갱신하기
    if (error.response && error.response.status === 401) {
      try {
        const response = await authInstance.post('/reissue');

        if (response.status === 200) {
          const token = response.headers.authorization;
          setAuthToken(token);

          const originalRequest = error.config as AxiosRequestConfig;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return await authInstance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        // 로그아웃 처리
        const { storeLogout } = useAuthStore();
        authInstance.post('/logout');
        removeAuthToken();
        storeLogout();
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

// request interceptor
authInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAuthToken();
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
const responseInterceptor = (response: AxiosResponse) => response;

// error handling
const onError = (message: string): never => {
  throw new Error(message);
};

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    console.log(error);
    switch (status) {
      case 400:
        onError('요청이 올바르지 않습니다.');
        break;
      case 401: {
        onError('인증이 만료되었습니다.');
        break;
      }
      case 403: {
        onError('접근 권한이 없습니다.');
        break;
      }
      default: {
        onError(`알 수 없는 오류가 발생했습니다. ${error.message}`);
      }
    }
  }

  if (!error.response) {
    onError('네트워크 연결을 확인해주세요.');
  }

  return Promise.reject(error);
};

defaultInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor,
);
authInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export { defaultInstance, authInstance };
