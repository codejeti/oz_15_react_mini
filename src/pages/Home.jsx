import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMovies, getSearchMovies, getTopRatedMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/Skeleton';
import MovieSlider from '../components/MovieSlider';
import { Search, PlusCircle } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux 상태 가져오기 (슬라이드 상태 추가)
  const {
    movies,
    status,
    searchResults,
    searchStatus,
    topRatedMovies,
    topRatedStatus
  } = useSelector((state) => state.movie);

  // 검색어 상태 관리 (로컬)
  const [searchTerm, setSearchTerm] = useState('');

  // 표시할 영화 목록과 상태를 검색어 유무에 따라 결정
  const moviesToDisplay = searchTerm ? searchResults : movies;
  const currentStatus = searchTerm ? searchStatus : status;

  // 데이터 로딩 및 검색 로직 (useEffect 통합)
  useEffect(() => {
    // 1. 초기 로딩 시 인기 영화 목록 호출 (검색어가 없을 때)
    if (status === 'idle' && !searchTerm) {
      dispatch(getMovies(1));
    }

    //  2. Top Rated 영화 목록 호출 (슬라이드용)
    if (topRatedStatus === 'idle') {
      dispatch(getTopRatedMovies(1));
    }

    // 3. 검색어가 있을 때만 검색 API 호출
    if (searchTerm.length > 0) {
      dispatch(getSearchMovies({ query: searchTerm, page: 1 }));
    }
  }, [status, dispatch, searchTerm, topRatedStatus]); // topRatedStatus 종속성 추가

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen">

    {/*  1. 영화 슬라이드 렌더링  */}
    {topRatedStatus === 'loading' ? (
      // 로딩 중일 때 임시 스켈레톤 표시
      <div className="mb-12 h-64 bg-gray-800 rounded-lg animate-pulse" />
    ) : topRatedStatus === 'succeeded' && topRatedMovies.length > 0 && (
      <MovieSlider
      title="평점 높은 추천 영화"
      movies={topRatedMovies}
      />
    )}

    {/* 2. 검색 입력창 UI */}
    <div className="mb-8 flex items-center bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-lg mx-auto border border-gray-700">
    <Search className="w-5 h-5 ml-4 text-gray-400" />
    <input
    type="text"
    placeholder="영화 제목을 검색하세요..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
    />
    </div>

    {/* 3. 영화 요청 버튼 (정확한 위치) */}
    <div className="flex justify-center mb-8">
    <button
    onClick={() => navigate('/request')}
    className="flex items-center p-3 bg-gray-800 text-yellow-500 border border-yellow-500 rounded-lg font-bold shadow-md hover:bg-yellow-500 hover:text-gray-900 transition"
    >
    <PlusCircle size={20} className="mr-2" /> 영화 추가 요청하기
    </button>
    </div>

    {/* 4. 제목 표시 */}
    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-3">
    {searchTerm ? `검색 결과: "${searchTerm}"` : '인기 영화'}
    </h2>

    {/* 5. 영화 목록 렌더링 */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {/* 로딩 스켈레톤 */}
    {currentStatus === 'loading'
      ? Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={idx} />)

      /* 결과 표시 (검색 또는 인기 영화) */
      : moviesToDisplay.length > 0
      ? moviesToDisplay.map((movie) => <MovieCard key={movie.id} movie={movie} />)

      /* 결과 없음 또는 에러 처리 */
      : (currentStatus === 'succeeded' && searchTerm)
      ? <p className="text-gray-400 col-span-full text-center py-10">검색 결과가 없습니다.</p>
      : (currentStatus === 'failed')
      ? <p className="text-red-500 col-span-full text-center py-10">데이터 로딩에 실패했습니다.</p>
      : null
    }
    </div>
    </div>
  );
};

export default Home;
