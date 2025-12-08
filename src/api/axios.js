import axios from 'axios';


const TMDB_V3_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const API_BASE_URL = 'https://api.themoviedb.org/3' // V3 엔드포인트 유지

if (!TMDB_V3_KEY || TMDB_V3_KEY.length !== 32) { 
  console.error(
    "🚨 CONFIG ERROR: VITE_TMDB_API_KEY (V3 API Key)이 유효하지 않거나 로드되지 않았습니다."
  );
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    
    api_key: TMDB_V3_KEY,
    language: 'ko-KR', 
  },
  headers: {
    'Content-Type': 'application/json',
 
  },
});

// 에러 처리 인터셉터 추가 
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error(
        "❌ 401 Unauthorized Error: API Access Token이 유효하지 않거나 만료되었습니다. " +
        "TMDB 계정에서 V4 Access Token을 확인하고 .env 파일에 올바르게 입력했는지 확인해주세요."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;