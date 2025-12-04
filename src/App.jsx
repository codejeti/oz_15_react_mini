import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore, doc, collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { Star, AlertCircle, CheckCircle, Send, Users, Film, List, ChevronLeft, ChevronRight, Search, Menu, X, Play, Lock, Unlock, Clock, DollarSign, Tag, AlertTriangle, Sun, Moon, Youtube } from 'lucide-react';

// ====================================================================
// 1. 전역 상수 및 유틸리티 설정
// ====================================================================

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-movie-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const IMDB_GOLD = '#F5C518';

// --- (Mock Data remains the same) ---
const MOVIE_LIST_DATA_RAW = {
  "page": 1,
  "results": [
    {
      "id": 823464,
      "title": "고질라 X 콩: 뉴 엠파이어",
      "original_title": "Godzilla x Kong: The New Empire",
      "overview": "두 타이탄의 전설적인 대결 이후 할로우 어스에 남은 콩은 드디어 애타게 찾던 동족을 발견하지만 그 뒤에 도사리고 있는 예상치 못한 위협에 맞닥뜨린다. 한편, 깊은 동면에 빠진 고질라는 알 수 없는 신호로 인해 깨어나고 푸른 눈의 폭군 스카 킹의 지배 아래 위기에 처한 할로우 어스를 마주하게 된다.",
      "poster_path": "/4z1VMmlxHrziG45901esjB4dpIa.jpg",
      "backdrop_path": "/sR0SpCrXamlIkYMdfz83sFn5JS6.jpg",
      "release_date": "2024-03-27",
      "vote_average": 7.2,
      "vote_count": 2732,
      "popularity": 5014.446,
      "genres": [{"id": 878, "name": "SF"}, {"id": 28, "name": "액션"}],
      "runtime": 115,
      "tagline": "두 타이탄의 전설적인 대결",
      "budget": 135000000,
      "revenue": 567540090
    },
    {
      "id": 1011985,
      "title": "쿵푸팬더 4",
      "original_title": "Kung Fu Panda 4",
      "overview": "마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 '포' 이젠 평화의 계곡의 영적 지도자가 되고, 자신을 대신할 후계자를 찾아야만 한다. 하지만 모든 쿵푸 마스터들의 능력을 그대로 복제하는 강력한 빌런 '카멜레온'이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 '젠'과 함께 모험을 떠나게 되는데…",
      "poster_path": "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
      "backdrop_path": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
      "release_date": "2024-03-02",
      "vote_average": 7.1,
      "vote_count": 1720,
      "popularity": 841.65,
      "genres": [{"id": 16, "name": "애니메이션"}, {"id": 35, "name": "코미디"}],
      "runtime": 94,
      "tagline": "드림웍스 레전드 시리즈",
      "budget": 85000000,
      "revenue": 533540090
    },
    {
      "id": 653346,
      "title": "혹성탈출: 새로운 시대",
      "original_title": "Kingdom of the Planet of the Apes",
      "overview": "진화한 유인원과 퇴화된 인간들이 살아가는 땅, 세계를 지배하게 된 유인원들의 시대, 그들의 우두머리 '프록시무스'는 절대적인 권력을 구축하고 인간들을 사냥한다. 유인원에게 모든 것을 잃은 인간 '노아'는 의문의 한 인간 소녀와 마주하고, 자신을 뛰어넘는 위대한 여정을 시작하게 되는데...",
      "poster_path": "/plNOSbqkSuGEK2i15A5btAXtB7t.jpg",
      "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      "release_date": "2024-05-08",
      "vote_average": 7.2,
      "vote_count": 526,
      "popularity": 1585.42,
      "genres": [{"id": 878, "name": "SF"}, {"id": 12, "name": "모험"}],
      "runtime": 145,
      "tagline": "세상은 원숭이의 것이 되었다.",
      "budget": 160000000,
      "revenue": 300000000
    },
    {
      "id": 438631,
      "title": "듄",
      "original_title": "Dune",
      "overview": "10191년, 우주의 지배 가문으로 성장한 아트레이데스 가문과 그 후계자 폴의 여정. 우주에서 가장 귀한 물질인 '멜란지'를 두고 벌어지는 가문 간의 전쟁과 운명적인 모험을 다룬 서사.",
      "poster_path": "/68A2T8rORGm0Umgh1mNNCym8.jpg",
      "backdrop_path": "/A32S64X9jS5zWw2kQh87wN3eR41.jpg",
      "release_date": "2021-09-15",
      "vote_average": 7.8,
      "vote_count": 11677,
      "popularity": 700.0,
      "genres": [{"id": 878, "name": "SF"}, {"id": 12, "name": "모험"}],
      "runtime": 155,
      "tagline": "두려움은 마음을 죽이는 자이다.",
      "budget": 165000000,
      "revenue": 402000000
    },
    {
      "id": 872585,
      "title": "오펜하이머",
      "original_title": "Oppenheimer",
      "overview": "세상을 구원할 핵무기를 만들었지만 그 기술이 인류를 파괴할 수도 있다는 사실에 고뇌한 과학자, J. 로버트 오펜하이머의 삶과 고뇌를 다룬 전기 영화.",
      "poster_path": "/8bQf2sP7G9tI1l0xTfQzF8K5hS2.jpg",
      "backdrop_path": "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
      "release_date": "2023-07-19",
      "vote_average": 8.1,
      "vote_count": 10000,
      "popularity": 800.0,
      "genres": [{"id": 18, "name": "드라마"}, {"id": 36, "name": "역사"}],
      "runtime": 180,
      "tagline": "세상이 영원히 바뀌는 순간",
      "budget": 100000000,
      "revenue": 952000000
    },
    {
      "id": 293660,
      "title": "데드풀",
      "original_title": "Deadpool",
      "overview": "암 치료를 위한 비밀 실험에 참가한 용병 웨이드 윌슨이 강력한 힐링 팩터와 함께 통제 불가능한 캐릭터 '데드풀'로 거듭나, 자신을 끔찍하게 만든 실험실의 악당들을 쫓는 이야기.",
      "poster_path": "/org219X0gqS10G3Q6qK08Q50p9H.jpg",
      "backdrop_path": "/dfX92I00wE8yQy19zR9L3QyQv5n.jpg",
      "release_date": "2016-02-10",
      "vote_average": 7.6,
      "vote_count": 25000,
      "popularity": 650.0,
      "genres": [{"id": 28, "name": "액션"}, {"id": 35, "name": "코미디"}],
      "runtime": 108,
      "tagline": "히어로가 아닌, 안티-히어로의 등장!",
      "budget": 58000000,
      "revenue": 783000000
    },
    {
      "id": 346698,
      "title": "바비",
      "original_title": "Barbie",
      "overview": "바비랜드에서 살아가던 바비가 현실 세계와 이 세상의 모든 것들을 탐험하기 위해 떠나는 여정을 그린 영화.",
      "poster_path": "/k0wK8H6Yy5y6FwG1K3cKqY8wLz9.jpg",
      "backdrop_path": "/fWjX2oOqF3vB95HkU70I0s799vK.jpg",
      "release_date": "2023-07-19",
      "vote_average": 7.0,
      "vote_count": 15000,
      "popularity": 900.0,
      "genres": [{"id": 35, "name": "코미디"}, {"id": 14, "name": "판타지"}],
      "runtime": 114,
      "tagline": "그녀는 모든 것이다.",
      "budget": 145000000,
      "revenue": 1446000000
    },
    {
      "id": 872,
      "title": "블레이드 러너",
      "original_title": "Blade Runner",
      "overview": "2019년, LA. 인조인간 '리플리컨트'를 제거하는 임무를 맡은 특수 경찰 '블레이드 러너' 릭 데커드가 탈출한 리플리컨트들을 추적하는 과정을 그린 SF 느와르.",
      "poster_path": "/qGk3mD415pQJ2yFzGv2pQ7c7r4b.jpg",
      "backdrop_path": "/8bN0f316e1I9f0zJdM0gHw2f4vS.jpg",
      "release_date": "1982-06-25",
      "vote_average": 7.9,
      "vote_count": 14000,
      "popularity": 550.0,
      "genres": [{"id": 878, "name": "SF"}, {"id": 53, "name": "스릴러"}],
      "runtime": 117,
      "tagline": "인간보다 더 인간적인",
      "budget": 28000000,
      "revenue": 41500000
    }
  ]
};

const MOVIE_LIST_DATA = {
  results: MOVIE_LIST_DATA_RAW.results.map(movie => ({
    ...movie,
    rating: movie.vote_average,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteCount: movie.vote_count,
  }))
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const REQUESTS_COLLECTION = `artifacts/${appId}/public/data/movie_requests`;
const ADMIN_UID = 'admin-user-id';

const formatNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  return num.toLocaleString('en-US');
};

/**
 * 영화 제목을 기반으로 YouTube 공식 예고편 검색 페이지를 새 창으로 엽니다.
 * @param {string} title 영화 제목
 */
const openTrailerSearch = (title) => {
  const query = `${title} 공식 예고편`;
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  window.open(url, '_blank');
};


// ====================================================================
// 2. Firebase 초기화 및 상태
// ====================================================================

const firebaseApp = Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;

// ====================================================================
// 3. 공통 UI 컴포넌트
// ====================================================================

const AppNotification = ({ message, type, onClose }) => {
  if (!message) return null;
  const colorClasses = type === 'error' ? 'bg-red-700 border-red-900' : 'bg-green-700 border-green-900';
  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white flex items-center space-x-3 transition-opacity duration-300 animate-fadeInUp ${colorClasses}`} role="alert">
    <Icon className="w-5 h-5" />
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-auto text-white/80 hover:text-white">&times;</button>
    </div>
  );
};

// ====================================================================
// 4. 영화 카드 및 캐러셀 컴포넌트
// ====================================================================

const MovieCard = React.memo(({ movie, onClick }) => {
  const rating = movie.rating.toFixed(1);
  const posterUrl = movie.posterPath
  ? `${IMAGE_BASE_URL}${movie.posterPath}`
  : `https://placehold.co/500x750/111827/fcd34d?text=${encodeURIComponent(movie.title)}`;

  return (
    <div
    onClick={() => onClick(movie.id)}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-amber-900/50 overflow-hidden transition-transform duration-300 hover:scale-[1.03] flex flex-col h-full border border-gray-200 dark:border-gray-700 cursor-pointer group"
    >
    <div className="relative aspect-[2/3]">
    <img
    src={posterUrl}
    alt={movie.title}
    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/500x750/111827/fcd34d?text=No+Image`; }}
    />
    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-md flex items-center">
    <Star className="w-3 h-3 mr-1 fill-current" /> {rating}
    </div>
    </div>
    <div className="p-4 flex-grow flex flex-col">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 truncate group-hover:text-yellow-500 transition-colors">{movie.title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{movie.releaseDate}</p>
    <p className="text-xs text-gray-600 dark:text-gray-500 line-clamp-2 mt-auto">{movie.overview}</p>
    </div>
    </div>
  );
});

const MovieCarousel = ({ movies, onSelectMovie }) => {
  const carouselMovies = useMemo(() => movies.slice(0, 5), [movies]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 5000;

  useEffect(() => {
    if (carouselMovies.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselMovies.length);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [carouselMovies.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + carouselMovies.length) % carouselMovies.length);
  }, [carouselMovies.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % carouselMovies.length);
  }, [carouselMovies.length]);

  const currentMovie = carouselMovies[currentIndex];
  const backdropUrl = currentMovie?.backdropPath ? `${BACKDROP_BASE_URL}${currentMovie.backdropPath}` : 'https://placehold.co/1280x720/1e293b/ffffff?text=No+Image';

  if (!currentMovie) return null;

  // 캐러셀의 "예고편 보기" 버튼 클릭 핸들러
  const handleTrailerClick = useCallback(() => {
    openTrailerSearch(currentMovie.title);
  }, [currentMovie.title]);


  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl mb-10 bg-gray-900 group">
    <div
    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
    style={{ backgroundImage: `url(${backdropUrl})` }}
    key={currentMovie.id}
    >
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
    </div>

    <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white pb-16">
    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider bg-yellow-500 text-gray-900 rounded-full w-fit">
    Featured Movie
    </span>
    <h2 className="text-4xl md:text-6xl font-extrabold mb-3 max-w-3xl leading-tight drop-shadow-lg animate-fadeInUp">
    {currentMovie.title}
    </h2>
    <p className="text-gray-300 text-sm md:text-lg mb-6 max-w-2xl line-clamp-2 drop-shadow-md">
    {currentMovie.overview}
    </p>
    <button
    onClick={handleTrailerClick} // 수정: YouTube 검색으로 바로 이동
    className="w-fit px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg transition transform hover:-translate-y-1 flex items-center"
    >
    <Youtube className="w-5 h-5 mr-2 fill-current" /> 예고편 보기
    </button>
    </div>

    {/* 캐러셀 자체를 클릭하면 상세 페이지로 이동 (기존 기능 유지) */}
    <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => onSelectMovie(currentMovie.id)}></div>


    <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
    <button onClick={goToPrevious} className="p-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-white rounded-full transition"><ChevronLeft size={24} /></button>
    <button onClick={goToNext} className="p-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-white rounded-full transition"><ChevronRight size={24} /></button>
    </div>

    <div className="absolute bottom-6 left-6 md:left-10 flex space-x-2 z-20">
    {carouselMovies.map((_, index) => (
      <div
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-yellow-500 w-8' : 'bg-gray-600 w-4 hover:bg-gray-400'}`}
      ></div>
    ))}
    </div>
    </div>
  );
};

const HorizontalMovieList = ({ title, movies, onSelectMovie }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies.length) return null;

  return (
    <div className="mt-12 relative group">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-yellow-500 mb-4 pl-2 border-l-4 border-yellow-500 flex items-center">
    {title} <ChevronRight className="ml-1 w-5 h-5 text-gray-500" />
    </h2>
    <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 z-10 p-2 bg-black/70 text-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500 hover:text-black"><ChevronLeft size={24} /></button>
    <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-1 scroll-smooth">
    {movies.map(movie => (
      <div key={movie.id} className="w-40 md:w-48 flex-shrink-0 transition-transform hover:scale-105">
      <MovieCard movie={movie} onClick={onSelectMovie} />
      </div>
    ))}
    </div>
    <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 z-10 p-2 bg-black/70 text-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500 hover:text-black"><ChevronRight size={24} /></button>
    </div>
  );
};

// --- 5. 페이지 컴포넌트 (목록, 상세, 요청, 관리자) ---

const MovieListView = ({ onSelectMovie, onGoToRequest, onGoToAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredMovies = useMemo(() => {
    if (!searchTerm) return MOVIE_LIST_DATA.results;
    return MOVIE_LIST_DATA.results.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
    <MovieCarousel movies={MOVIE_LIST_DATA.results} onSelectMovie={onSelectMovie} />

    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
    <div className="w-full md:w-1/2 relative">
    <input
    type="text"
    placeholder="영화 제목 검색..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-3 pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition shadow-md placeholder-gray-500"
    />
    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    <div className="flex space-x-3">
    <button onClick={onGoToRequest} className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 transition text-sm flex items-center">
    <Send className="w-4 h-4 mr-2" /> 요청하기
    </button>
    <button onClick={onGoToAdmin} className="px-4 py-2 bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 transition text-sm flex items-center">
    <Lock className="w-4 h-4 mr-2" /> 관리자
    </button>
    </div>
    </div>

    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-yellow-500 pl-3">전체 영화 목록</h2>
    {filteredMovies.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
      ))}
      </div>
    ) : (
      <div className="text-center py-20 text-gray-500">검색 결과가 없습니다.</div>
    )}
    </div>
  );
};

const MovieDetailView = ({ onBack, movieId, allMovies, onSelectMovie }) => {
  const movie = useMemo(() => allMovies.find(m => m.id === movieId), [movieId, allMovies]);
  const relatedMovies = useMemo(() => allMovies.filter(m => m.id !== movieId), [movieId, allMovies]);

  // 상세 페이지의 "예고편 보기" 버튼 클릭 핸들러
  const handleTrailerClick = useCallback(() => {
    if (movie) openTrailerSearch(movie.title);
  }, [movie]);

    if (!movie) return <div className="p-10 text-center text-white">영화를 찾을 수 없습니다.</div>;

    const backdropUrl = movie.backdropPath ? `${BACKDROP_BASE_URL}${movie.backdropPath}` : 'https://placehold.co/1280x720/111827/fcd34d?text=No+Backdrop';
  const posterUrl = movie.posterPath ? `${IMAGE_BASE_URL}${movie.posterPath}` : `https://placehold.co/500x750/111827/fcd34d?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white pb-20">
    <div className="relative h-[50vh] md:h-[70vh] w-full">
    <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${backdropUrl})` }}>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent"></div>
    </div>
    <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white/50 dark:bg-black/50 text-gray-800 dark:text-white rounded-full hover:bg-yellow-500 hover:text-black transition z-20">
    <ChevronLeft size={28} />
    </button>
    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row gap-8 items-end">
    <img src={posterUrl} alt={movie.title} className="w-32 md:w-52 rounded-lg shadow-2xl border-2 border-gray-300 dark:border-gray-700 hidden md:block" />
    <div className="flex-1 mb-4">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-md">{movie.title}</h1>
    <p className="text-lg text-yellow-600 dark:text-yellow-400 italic mb-4">{movie.tagline}</p>
    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
    <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1" /> {movie.rating.toFixed(1)} ({movie.voteCount})</span>
    <span className="flex items-center"><Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" /> {movie.runtime}분</span>
    <span className="flex items-center"><Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" /> {movie.releaseDate.split('-')[0]}</span>
    </div>
    {/* 상세 정보 페이지에 예고편 보기 버튼 추가 */}
    <button
    onClick={handleTrailerClick}
    className="w-fit mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg transition transform hover:-translate-y-0.5 flex items-center text-sm"
    >
    <Youtube className="w-4 h-4 mr-2 fill-current" /> 예고편 보기
    </button>
    </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
    <div className="lg:col-span-2">
    <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-500 mb-4 flex items-center"><List className="w-5 h-5 mr-2"/> 줄거리</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-10">{movie.overview || "줄거리 정보가 없습니다."}</p>
    <HorizontalMovieList title="비슷한 장르의 영화" movies={relatedMovies} onSelectMovie={onSelectMovie} />
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl h-fit border border-gray-200 dark:border-gray-700 shadow-lg">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">상세 정보</h3>
    <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
    <div className="flex justify-between"><span>원제</span> <span className="text-gray-800 dark:text-white">{movie.original_title}</span></div>
    <div className="flex justify-between"><span>개봉일</span> <span className="text-gray-800 dark:text-white">{movie.releaseDate}</span></div>
    <div className="flex justify-between"><span>예산</span> <span className="text-gray-800 dark:text-white">${formatNumber(movie.budget)}</span></div>
    <div className="flex justify-between"><span>수익</span> <span className="text-gray-800 dark:text-white">${formatNumber(movie.revenue)}</span></div>
    </div>
    </div>
    </div>
    </div>
  );
};

const MovieRequestForm = ({ userId, requestsCollectionRef, onNotify, onBack }) => {
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestsCollectionRef) return onNotify("DB 연결 오류", 'error');
    try {
      await addDoc(requestsCollectionRef, { userId, title, reason, status: 'Requested', createdAt: serverTimestamp() });
      onNotify("요청이 성공적으로 전송되었습니다!", 'success');
      setTitle(''); setReason('');
    } catch (e) { onNotify("전송 실패", 'error'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 relative">
    <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center"><ChevronLeft /></button>
    <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">영화 추가 요청</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <input className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white focus:border-yellow-500 outline-none" placeholder="영화 제목" value={title} onChange={e => setTitle(e.target.value)} required />
    <textarea className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white focus:border-yellow-500 outline-none h-32" placeholder="요청 사유" value={reason} onChange={e => setReason(e.target.value)} required />
    <button type="submit" className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded transition">제출하기</button>
    </form>
    </div>
    </div>
  );
};

const AdminPanel = ({ requests, requestsCollectionRef, onNotify, onBack }) => {
  const handleUpdate = async (id, status) => {
    if(!requestsCollectionRef) return;
    await updateDoc(doc(requestsCollectionRef, id), { status });
    onNotify(`상태 변경: ${status}`, 'success');
  };
  const handleDelete = async (id) => {
    if(!requestsCollectionRef) return;
    await deleteDoc(doc(requestsCollectionRef, id));
    onNotify("삭제 완료", 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
    <button onClick={onBack} className="mb-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center"><ChevronLeft className="mr-1"/> 메인으로</button>
    <h2 className="text-3xl font-bold text-yellow-500 mb-8">관리자 대시보드</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
    <table className="w-full text-left text-gray-500 dark:text-gray-400">
    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
    <tr><th className="p-4">제목</th><th className="p-4">사유</th><th className="p-4">상태</th><th className="p-4 text-right">관리</th></tr>
    </thead>
    <tbody>
    {requests.map(req => (
      <tr key={req.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="p-4 text-gray-900 dark:text-white font-bold">{req.title}</td>
      <td className="p-4 text-sm">{req.reason}</td>
      <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400'}`}>{req.status}</span></td>
      <td className="p-4 text-right space-x-2">
      <button onClick={() => handleUpdate(req.id, 'Completed')} className="text-green-600 dark:text-green-500 hover:text-green-500 dark:hover:text-green-400">승인</button>
      <button onClick={() => handleDelete(req.id)} className="text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400">삭제</button>
      </td>
      </tr>
    ))}
    </tbody>
    </table>
    {requests.length === 0 && <div className="p-8 text-center text-gray-500">요청이 없습니다.</div>}
    </div>
    </div>
  );
};

const AdminLogin = ({ onLogin, onBack }) => {
  const [pw, setPw] = useState('');
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm text-center">
    <Lock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">관리자 접근</h2>
    <input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white mb-4 focus:border-yellow-500 outline-none" placeholder="비밀번호 (supersecretpassword123)" />
    <button onClick={() => onLogin(pw)} className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-400 transition mb-4">로그인</button>
    <button onClick={onBack} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm">돌아가기</button>
    </div>
    </div>
  );
};

// --- 7. Main App Component ---
const App = () => {
  const [view, setView] = useState('list');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [appMessage, setAppMessage] = useState(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Firebase
  const [userId, setUserId] = useState(null);
  const [db, setDb] = useState(null);
  const [requests, setRequests] = useState([]);

  // Data
  const allMovies = useMemo(() => MOVIE_LIST_DATA.results, []);

  // Dark Mode Toggle Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleNotify = (msg, type) => {
    setAppMessage({ message: msg, type });
    setTimeout(() => setAppMessage(null), 3000);
  };

  // Firebase Init
  useEffect(() => {
    if (!firebaseApp) return;
    setDb(getFirestore(firebaseApp));
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), async (user) => {
      if (user) setUserId(user.uid);
      else if (initialAuthToken) await signInWithCustomToken(getAuth(firebaseApp), initialAuthToken);
      else await signInAnonymously(getAuth(firebaseApp));
    });
      return () => unsubscribe();
  }, []);

  // Firestore Listener
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, REQUESTS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [db]);

  // Navigation Handlers
  const goToList = () => { setView('list'); setSelectedMovieId(null); window.scrollTo(0,0); };
  const goToDetail = (id) => { setSelectedMovieId(id); setView('detail'); window.scrollTo(0,0); };
  const goToRequest = () => setView('request');
  const goToAdmin = () => setView('admin-login');
  const handleAdminLogin = (pw) => {
    if (pw === 'supersecretpassword123') setView('admin-dash');
    else handleNotify('비밀번호 오류', 'error');
  };

    return (
      <div className={`font-sans min-h-screen ${darkMode ? 'dark' : ''}`}>
      <AppNotification message={appMessage?.message} type={appMessage?.type} onClose={() => setAppMessage(null)} />

      {/* Dark Mode Toggle Button (Fixed Position) */}
      <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
      aria-label="Toggle Dark Mode"
      >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {view === 'list' && (
        <MovieListView
        onSelectMovie={goToDetail}
        onGoToRequest={goToRequest}
        onGoToAdmin={goToAdmin}
        />
      )}
      {view === 'detail' && (
        <MovieDetailView
        movieId={selectedMovieId}
        allMovies={allMovies}
        onBack={goToList}
        onSelectMovie={goToDetail}
        />
      )}
      {view === 'request' && (
        <MovieRequestForm
        userId={userId}
        requestsCollectionRef={db ? collection(db, REQUESTS_COLLECTION) : null}
        onNotify={handleNotify}
        onBack={goToList}
        />
      )}
      {view === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} onBack={goToList} />}
      {view === 'admin-dash' && (
        <AdminPanel
        requests={requests}
        requestsCollectionRef={db ? collection(db, REQUESTS_COLLECTION) : null}
        onNotify={handleNotify}
        onBack={goToList}
        />
      )}
      </div>
    );
};

export default App;
