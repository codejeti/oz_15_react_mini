import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../store/movieSlice';
import { ChevronLeft, Star } from 'lucide-react';

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedMovie: movie, detailStatus, detailError } = useSelector((state) => state.movie);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetail(Number(id))); // Redux Thunk 호출
    }
  }, [id, dispatch]);
  if (detailStatus === 'loading' || !movie) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (detailStatus === 'failed') {
    return <div className="text-red-500 text-center mt-20">Error: {detailError || "정보 로드 실패"}</div>;
  }

  return (
    <div className="min-h-screen text-white pb-20">
    <div className="relative h-[50vh] w-full">
    <div
    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
    style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
    >
    {/* 어두운 오버레이 */}
    <div className="absolute inset-0 bg-black opacity-70"></div>
    {/* 뒤로가기 버튼 */}
    <button
    onClick={() => navigate(-1)}
    className="absolute top-4 left-4 z-10 p-2 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition"
    aria-label="뒤로가기"
    >
    <ChevronLeft size={24} />
    </button>
    </div>

    {/* 영화 정보 오버레이 */}
    <div className="absolute inset-0 flex items-end">
    <div className="max-w-7xl mx-auto px-6 pb-6 pt-12 flex items-end space-x-6 w-full relative z-10">
    {/* 포스터 이미지 */}
    <img
    src={`${POSTER_BASE_URL}${movie.poster_path}`}
    alt={movie.title}
    className="w-32 h-48 md:w-40 md:h-60 rounded-lg shadow-2xl object-cover transform translate-y-1/4 hidden sm:block"
    />

    {/* 텍스트 정보 */}
    <div className="flex-1 transform translate-y-1/4 sm:translate-y-0">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">{movie.title}</h1>
    <div className="text-lg text-gray-300 space-x-4">
    <span className="inline-flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500"/> {movie.vote_average.toFixed(1)}</span>
    <span>{movie.runtime}분</span>
    <span>{movie.release_date}</span>
    </div>
    </div>
    </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 mt-8 sm:mt-16">
    <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3">줄거리</h3>
    <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>

    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3">상세 정보</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-400">

    {/* 추가 정보 섹션 */}
    <div><span className="font-bold text-white">원제:</span> {movie.original_title}</div>
    <div><span className="font-bold text-white">언어:</span> {movie.original_language.toUpperCase()}</div>
    <div><span className="font-bold text-white">장르:</span>
    {movie.genres && movie.genres.map(g => g.name).join(', ')}</div>
    <div><span className="font-bold text-white">개봉일:</span> {movie.release_date}</div>
    <div><span className="font-bold text-white">런타임:</span> {movie.runtime}분</div>
    <div><span className="font-bold text-white">제작사:</span>
    {movie.production_companies && movie.production_companies.map(pc => pc.name).join(', ')}</div>
    </div>
    </div>
    </div>
  );
};

export default Detail;
