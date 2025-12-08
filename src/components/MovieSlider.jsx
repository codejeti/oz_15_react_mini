import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieSlider = ({ title, movies }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      e.preventDefault();                //  세로 스크롤 완전 차단
      slider.scrollLeft += e.deltaY;     //  가로 이동만 적용
    };

    // ✅ passive:false 가 핵심
    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-yellow-500 pl-3">
    {title}
    </h2>

    <div
    ref={sliderRef}
    className="
    flex overflow-x-auto overflow-y-hidden
    space-x-4 pb-4 px-2 scrollbar-hide max-w-full
    "
    >
    {movies.map((movie) => (
      <div
      key={movie.id}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="flex-shrink-0 w-40 sm:w-52 cursor-pointer transition-transform duration-300 hover:scale-105 group"
      >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <img
      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-full object-cover"
      loading="lazy"
      />
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-yellow-500">
      {movie.title}
      </p>
      </div>
    ))}
    </div>
    </div>
  );
};

export default MovieSlider;
