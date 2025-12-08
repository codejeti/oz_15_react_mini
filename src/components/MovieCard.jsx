import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div
    onClick={() => navigate(`/movie/${movie.id}`)}
    className="
    bg-white dark:bg-gray-800
    rounded-xl shadow-lg overflow-hidden
    transition-transform duration-300 hover:scale-[1.03]
    cursor-pointer group
    border border-gray-200 dark:border-gray-700
    "
    >
    <div className="relative aspect-[2/3]">
    <img
    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-full object-cover"
    loading="lazy"
    />

    <div className="
    absolute top-2 right-2
    bg-yellow-500 text-gray-900
    text-xs font-bold px-2 py-1 rounded
    flex items-center
    ">
    <Star className="w-3 h-3 mr-1 fill-current" /> {rating}
    </div>
    </div>

    <div className="p-4">
    {/* ✅ 제목 라이트/다크 대응 */}
    <h3 className="
    text-lg font-bold
    text-gray-900 dark:text-gray-100
    truncate
    group-hover:text-yellow-500
    ">
    {movie.title}
    </h3>

    {/* ✅ 개봉일 라이트/다크 대응 */}
    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
    {movie.release_date}
    </p>
    </div>
    </div>
  );
};

export default MovieCard;
