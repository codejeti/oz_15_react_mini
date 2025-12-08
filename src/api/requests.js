import axiosInstance from './axios';

export const fetchPopularMovies = async (page = 1) => {
  const response = await axiosInstance.get(`/movie/popular`, {
    params: { page },
  });
  return response.data;
};

// Top Rated 영화 요청 함수 (슬라이드용)
export const fetchTopRatedMovies = async (page = 1) => {
  const response = await axiosInstance.get(`/movie/top_rated`, {
    params: { page },
  });
  return response.data;
};

export const fetchMovieDetail = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchSearchMovies = async (query, page = 1) => {
  if (!query) return { results: [] };
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page },
    });
    // 성인 영화 필터링
    const filtered = response.data.results.filter((movie) => !movie.adult);
    return { ...response.data, results: filtered };
  } catch (error) {
    console.error(`Error fetching search results for query ${query}:`, error);
    throw error;
  }
};
