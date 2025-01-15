import { authInstance, defaultInstance } from '@apis/index';
import { removeAuthToken, removeRole, setAuthToken } from '@utils/auth';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';

const TokenRefresher = ({ children }: { children: React.ReactNode }) => {
  const [isRefreshing, setIsRefreshing] = useState(true);

  const handleLogout = () => {
    removeAuthToken();
    removeRole();
    window.location.replace('/start');
  };

  useEffect(() => {
    const interceptor = authInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        setIsRefreshing(false);
        return response;
      },
      // 에러 처리
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          setIsRefreshing(true);
          try {
            const res = await defaultInstance.post('/reissue');

            if (res.status === 200) {
              const token = res.headers.authorization;
              setAuthToken(token);

              const originalRequest = error.config as AxiosRequestConfig;
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              // 실패했던 요청 재시도
              setIsRefreshing(false);
              return authInstance(originalRequest);
            }
          } catch (refreshError) {
            // 토큰 갱신 실패 시 로그아웃 처리
            const reissueError = refreshError as AxiosError;
            if (reissueError.response?.status === 401) {
              // 로그아웃
              handleLogout();
            }
          }
        }
        setIsRefreshing(true);
        return Promise.reject(error);
      },
    );
    setIsRefreshing(false);
    return () => {
      authInstance.interceptors.response.eject(interceptor); // 인터셉터 해제
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isRefreshing) {
    return (
      <div className='flex h-[300px] w-full items-center justify-center'>
        <SyncLoader color='#50BEAD' />
      </div>
    );
  }

  return <>{children}</>;
};

export default TokenRefresher;
