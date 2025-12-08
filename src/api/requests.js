import axiosInstance from './axios';

// API 단계에서 성인 차단
export const fetchPopularMovies = async (page = 1) => {
  const response = await axiosInstance.get(`/movie/popular`, {
    params: {
      page,
      include_adult: false,
    },
  });

  // 혹시 API에서 섞여 올 경우를 대비한 2차 방어
  const filtered = response.data.results.filter((movie) => !movie.adult);

  return { ...response.data, results: filtered };
};

// API 단계에서 성인 차단
export const fetchTopRatedMovies = async (page = 1) => {
  const response = await axiosInstance.get(`/movie/top_rated`, {
    params: {
      page,
      include_adult: false, //
    },
  });

  // 2차 방어 필터
  const filtered = response.data.results.filter((movie) => !movie.adult);

  return { ...response.data, results: filtered };
};

// 영화 상세
export const fetchMovieDetail = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

// 영화 검색 API 차단까지
export const fetchSearchMovies = async (query, page = 1) => {
  if (!query) return { results: [] };

  try {
    const response = await axiosInstance.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false, // API 1차 차단
      },
    });

    // 프론트 2차 필터
    const filtered = response.data.results.filter((movie) => !movie.adult);

    return { ...response.data, results: filtered };
  } catch (error) {
    console.error(`Error fetching search results for query ${query}:`, error);
    throw error;
  }
};
