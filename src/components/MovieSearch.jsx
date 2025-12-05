import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSearchMovies, clearSearchResults } from '../store/movieSlice';

// 디바운싱 커스텀 훅 (500ms 지연)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const MovieSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5초 디바운싱
  const searchStatus = useSelector((state) => state.movie.searchStatus);

  useEffect(() => {
    if (debouncedSearchTerm) {

      dispatch(getSearchMovies({ query: debouncedSearchTerm, page: 1 }));
    } else {
      // 검색어가 비었을 때 검색 결과 초기화
      dispatch(clearSearchResults());
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
    <input
    type="text"
    placeholder="영화 제목을 검색해 보세요..."
    value={searchTerm}
    onChange={handleChange}
    className="block w-full max-w-[100%] p-4 pl-12 text-lg rounded-full bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-yellow-500 transition duration-300"
    />
    <svg /* 검색 아이콘 */

    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
    fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"
    >
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>

    {/* 로딩 인디케이터 */}
    {searchStatus === 'loading' && debouncedSearchTerm && (
      <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500">
      검색 중...
      </p>
    )}
    </div>
  );
};

export default MovieSearch;
