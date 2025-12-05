// Redux 임포트 추가
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
    <div className="min-h-screen bg-gray-900 text-white pb-20">
    <div className="relative h-[50vh] w-full">
    <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
    >
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
    </div>

    <button
    onClick={() => navigate(-1)}
    className="absolute top-6 left-6 z-10 p-2 bg-black/50 rounded-full hover:bg-yellow-500 hover:text-black transition"
    >
    <ChevronLeft size={28} />
    </button>

    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex items-end gap-8 z-10">
    <img
    src={`${POSTER_BASE_URL}${movie.poster_path}`}
    className="w-32 md:w-48 rounded-lg shadow-2xl hidden md:block"
    alt={movie.title}
    />
    <div className="mb-4">
    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
    <p className="text-yellow-400 italic mb-4">{movie.tagline}</p>
    <div className="flex items-center gap-4 text-sm text-gray-300">
    <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500"/> {movie.vote_average.toFixed(1)}</span>
    <span>{movie.runtime}분</span>
    <span>{movie.release_date}</span>
    </div>
    </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 mt-8">
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
    {movie.budget > 0 && <div><span className="font-bold text-white">예산:</span> ${movie.budget.toLocaleString()}</div>}
    {movie.revenue > 0 && <div><span className="font-bold text-white">수익:</span> ${movie.revenue.toLocaleString()}</div>}
    <div><span className="font-bold text-white">상태:</span> {movie.status}</div>

    </div>
    </div>
    </div>
  );
};
export default Detail;
