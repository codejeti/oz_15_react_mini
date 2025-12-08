import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, fetchMovieDetail, fetchSearchMovies, fetchTopRatedMovies } from '../api/requests';

// 비동기 액션 (Thunk)
export const getMovies = createAsyncThunk('movie/getMovies', async (page) => {
  const data = await fetchPopularMovies(page);
  // 성인 영화 필터링
  const filtered = data.results.filter((movie) => !movie.adult);
  return filtered;
});

export const getMovieDetail = createAsyncThunk('movie/getMovieDetail', async (movieId) => {
  const data = await fetchMovieDetail(movieId);
  return data;
});

// Top Rated 영화를 가져오는 새로운 Thunk 
export const getTopRatedMovies = createAsyncThunk('movie/getTopRatedMovies', async (page = 1) => {
  const data = await fetchTopRatedMovies(page);
  const filtered = data.results.filter((movie) => !movie.adult);
  return filtered;
});

export const getSearchMovies = createAsyncThunk(
  'movie/getSearchMovies',
  async ({ query, page = 1 }) => {
    const data = await fetchSearchMovies(query, page);
    return data.results; // 필터링된 결과만 반환
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    status: 'idle', // 인기 영화 (메인 목록) 상태
      error: null,


      searchResults: [],
      searchStatus: 'idle',
      searchError: null,


      topRatedMovies: [],
      topRatedStatus: 'idle',
      topRatedError: null,


      selectedMovie: null,
      detailStatus: 'idle',
      detailError: null,
  },
  reducers: {
    clearSearchResults: (state) => {
        state.searchResults = [];
        state.searchStatus = 'idle';
  },
},
  extraReducers: (builder) => {
    // getMovies cases (인기 영화)
    builder
    .addCase(getMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getMovies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.movies = action.payload;
    })
    .addCase(getMovies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })

    // getMovieDetail cases (영화 상세)
    .addCase(getMovieDetail.pending, (state) => {
      state.detailStatus = 'loading';
      state.detailError = null;
      state.selectedMovie = null;
    })
    .addCase(getMovieDetail.fulfilled, (state, action) => {
      state.detailStatus = 'succeeded';
      state.selectedMovie = action.payload;
    })
    .addCase(getMovieDetail.rejected, (state, action) => {
      state.detailStatus = 'failed';
      state.detailError = action.error.message;
      state.selectedMovie = null;
    })

    // getSearchMovies cases (검색 결과)
    .addCase(getSearchMovies.pending, (state) => {
      state.searchStatus = 'loading';
      state.searchError = null;
      state.searchResults = [];
    })
    .addCase(getSearchMovies.fulfilled, (state, action) => {
      state.searchStatus = 'succeeded';
      state.searchResults = action.payload;
    })
    .addCase(getSearchMovies.rejected, (state, action) => {
      state.searchStatus = 'failed';
      state.searchError = action.error.message;
    })

    // getTopRatedMovies cases
    .addCase(getTopRatedMovies.pending, (state) => {
      state.topRatedStatus = 'loading';
      state.topRatedError = null;
    })
    .addCase(getTopRatedMovies.fulfilled, (state, action) => {
      state.topRatedStatus = 'succeeded';
      // 슬라이드에 10개만 사용
    state.topRatedMovies = action.payload.slice(0, 10);
    })
    .addCase(getTopRatedMovies.rejected, (state, action) => {
      state.topRatedStatus = 'failed';
      state.topRatedError = action.error.message;
    });
  },
});

export const { clearSearchResults } = movieSlice.actions;
export const {resetSearch} = movieSlice.actions;
export default movieSlice.reducer;
