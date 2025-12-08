import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/Skeleton';
import MovieSlider from '../components/MovieSlider';
import MovieCarousel from '../components/MovieCarousel';
import MovieSearch from '../components/MovieSearch';
import { PlusCircle } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    movies: moviesPopular,
    status: popularStatus,
    topRatedMovies: moviesTopRated,
    searchResults,
    searchStatus
  } = useSelector((state) => state.movie);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (popularStatus === 'idle') {
      dispatch(getMovies(1));
    }
  }, [dispatch, popularStatus]);

  const hasSearchResults =
  searchResults &&
  searchResults.length > 0 &&
  searchStatus === 'succeeded';

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getMovies(nextPage));
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full">


    <div className="w-screen relative left-1/2 -translate-x-1/2">
    <MovieCarousel />
    </div>


    <div className="mx-auto px-4 py-8 w-full max-w-[1600px]">

    {/* 검색 */}
    <div className="mb-12">
    <MovieSearch />
    </div>

    {/* 요청 버튼 */}
    <div className="mb-12 text-center">
    <button
    onClick={() => navigate('/request')}
    className="flex items-center mx-auto px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition"
    >
    <PlusCircle size={20} className="mr-2" /> 영화 추가 요청하기
    </button>
    </div>

    {/* 검색 결과 */}
    {hasSearchResults && (
      <MovieSlider title="🔍 검색 결과" movies={searchResults} />
    )}

    {/* 평점 높은 영화 */}
    {moviesTopRated &&
      moviesTopRated.length > 0 &&
      !hasSearchResults && (
        <MovieSlider
        title="🌟 평점 높은 추천 영화"
        movies={moviesTopRated.slice(0, 10)}
        />
      )}

      {/* 인기 영화 목록 */}
      {!hasSearchResults && (
        <>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-yellow-500 pl-3">
        🔥 지금 인기 있는 영화
        </h2>

        {popularStatus === 'loading' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
          </div>
        )}

        {popularStatus === 'succeeded' && moviesPopular.length > 0 && (
          <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesPopular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          </div>

          {/* 페이지 로드 버튼 */}
          <div className="mt-10 text-center">
          <button
          onClick={loadMoreMovies}
          className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition shadow-xl"
          >
          더 불러오기
          </button>
          </div>
          </>
        )}

        {popularStatus === 'failed' && (
          <p className="text-red-500 text-center font-bold">
          영화 목록을 불러오는 데 실패했습니다.
          </p>
        )}
        </>
      )}
      </div>
      </div>
  );
};

export default Home;
