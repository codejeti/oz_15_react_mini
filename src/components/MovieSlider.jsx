
import React from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieSlider = ({ title, movies }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>

      {/* 가로 스크롤 컨테이너 */}
      <div className="flex overflow-x-auto space-x-4 pb-4 px-2 scrollbar-hide max-w-full">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex-shrink-0 w-40 sm:w-52 cursor-pointer transition-transform duration-300 hover:scale-105 group"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-gray-700">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-100 truncate group-hover:text-yellow-500">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
