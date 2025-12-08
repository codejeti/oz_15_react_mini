import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTopRatedMovies } from '../store/movieSlice';
import useAutoSlide from './useAutoSlide';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies);
  const status = useSelector((state) => state.movie.topRatedStatus);

  const movies = useMemo(() => {
    return topRatedMovies || [];
  }, [topRatedMovies]);

  const [currentIndex, setCurrentIndex] = useAutoSlide(movies.length);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTopRatedMovies());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="h-[50vh] flex items-center justify-center">
      <p className="text-xl text-yellow-500">최고 평점 영화를 불러오는 중...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
      <p className="text-xl text-white">영화 데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">

    {/* 배경 이미지 */}
    <div
    className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
    style={{
      backgroundImage: `url(${IMAGE_BASE_URL}${currentMovie.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
    }}
    ></div>

    {/* 어두운 배경 레이어 */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* 아래쪽 그라데이션 */}
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>

    {/* 영화 텍스트 콘텐츠 */}
    <div className="absolute inset-0 flex flex-col justify-center items-center px-10 text-center text-white">

    <h1 className="text-3xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
    {currentMovie.title}
    </h1>

    <p className="text-base md:text-xl leading-relaxed max-w-[900px] mx-auto mb-8 drop-shadow-lg line-clamp-3">
    {currentMovie.overview}
    </p>

    <button
    onClick={() => navigate(`/movie/${currentMovie.id}`)}
    className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold rounded-xl shadow-xl transition-all"
    >
    자세히 보기
    </button>
    </div>

    {/* 아래 인디케이터 */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex z-50 space-x-2">
    {movies.map((_, index) => (
      <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-3 h-3 rounded-full transition-all ${
        index === currentIndex ? 'bg-yellow-400 w-7' : 'bg-gray-400 opacity-50'
      }`}
      />
    ))}
    </div>

    </div>
  );
};

export default MovieCarousel;
