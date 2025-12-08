import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../store/movieSlice';
import { ChevronLeft, Star } from 'lucide-react';

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedMovie: movie, detailStatus, detailError } = useSelector((state) => state.movie);


  const [showDoomMessage, setShowDoomMessage] = useState(false);

  const runDoomEasterEgg = () => {
     const doomWindow = window.open('', '_blank');
    setShowDoomMessage(true);

    setTimeout(() => {
      window.open("https://js-dos.com/doom", "_blank");
      setShowDoomMessage(false);
    }, 2000);
  };

  //키보드로 D O O M 입력 시 실행
  useEffect(() => {
    let buffer = "";

    const handleKey = (e) => {
      const key = e.key.toLowerCase();


      buffer += key;


      if (
        buffer.includes("doom") ||   // 영문
        buffer.includes("둠")        // 한글
      ) {
        runDoomEasterEgg();
        buffer = "";
      }


      if (buffer.length > 10) buffer = "";
    };

      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
  }, []);


  useEffect(() => {
    if (id) dispatch(getMovieDetail(Number(id)));
  }, [id, dispatch]);

    if (detailStatus === 'loading' || !movie) {
      return <div className="text-center mt-20 text-gray-800 dark:text-white">Loading...</div>;
    }

    if (detailStatus === 'failed') {
      return <div className="text-center mt-20 text-red-500">Error: {detailError || "정보 로드 실패"}</div>;
    }

    const isDoom = movie.title.toLowerCase().includes("doom");

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20">
      <button
      onClick={() => window.open("https://js-dos.com/doom", "_blank")}
      className="px-6 py-3 bg-red-600 text-white rounded"
      >
      둠 테스트 열기
      </button>
      {/* ✅ 배경 이미지 */}
      <div className="relative h-[50vh] w-full">
      <div
      className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
      style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
      >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition"
      aria-label="뒤로가기"
      >
      <ChevronLeft size={24} />
      </button>
      </div>

      <div className="absolute inset-0 flex items-end">
      <div className="max-w-7xl mx-auto px-6 pb-6 pt-12 flex items-end space-x-6 w-full relative z-10">


      <img
      src={`${POSTER_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      onClick={isDoom ? runDoomEasterEgg : null}
      className={`w-32 h-48 md:w-40 md:h-60 rounded-lg shadow-2xl object-cover transform translate-y-1/4 hidden sm:block
        ${isDoom ? "cursor-pointer hover:scale-105 hover:shadow-red-600/50 transition" : ""}
        `}
        />

        <div className="flex-1 transform translate-y-1/4 sm:translate-y-0">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">
        {movie.title}
        </h1>

        <div className="text-lg text-gray-200 space-x-4">
        <span className="inline-flex items-center">
        <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500"/>
        {movie.vote_average.toFixed(1)}
        </span>
        <span>{movie.runtime}분</span>
        <span>{movie.release_date}</span>
        </div>
        </div>
        </div>
        </div>
        </div>

        {/* ✅ 상세 정보 */}
        <div className="max-w-7xl mx-auto px-6 mt-8 sm:mt-16">

        <h3 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">
        줄거리
        </h3>

        <p className="leading-relaxed text-lg text-gray-700 dark:text-gray-300">
        {movie.overview}
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 border-l-4 border-yellow-500 pl-3">
        상세 정보
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700 dark:text-gray-400">
        <div><span className="font-bold text-gray-900 dark:text-white">원제:</span> {movie.original_title}</div>
        <div><span className="font-bold text-gray-900 dark:text-white">언어:</span> {movie.original_language.toUpperCase()}</div>
        <div><span className="font-bold text-gray-900 dark:text-white">장르:</span> {movie.genres?.map(g => g.name).join(', ')}</div>
        <div><span className="font-bold text-gray-900 dark:text-white">개봉일:</span> {movie.release_date}</div>
        <div><span className="font-bold text-gray-900 dark:text-white">런타임:</span> {movie.runtime}분</div>
        <div><span className="font-bold text-gray-900 dark:text-white">제작사:</span> {movie.production_companies?.map(pc => pc.name).join(', ')}</div>
        </div>
        </div>

        {/* ✅ 2초 연출 오버레이 */}
        {showDoomMessage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <div className="text-red-600 text-2xl md:text-4xl font-extrabold tracking-widest animate-pulse">
          RIP AND TEAR UNTIL IT IS DONE.
          </div>
          </div>
        )}

        </div>
    );
};

export default MovieDetail;
