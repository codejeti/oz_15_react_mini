# 🎬 Movie Explorer App

React + Redux + TailwindCSS 기반 영화 추천 및 검색 서비스입니다.  
TMDB API를 이용하여 인기 영화, 평점 높은 영화 목록을 제공하며 검색 기능과 영화 상세보기 기능을 포함합니다.

---

## 🚀 주요 기능

### ✅ 1. 메인 캐러셀 (MovieCarousel)
- 자동으로 영화 슬라이드 전환
- 평점 높은 영화 순으로 표시
- **백그라운드 이미지 중앙 정렬 처리 완료**
- 반응형 지원

### ✅ 2. 인기 영화 목록 (Pagination 지원)
- 처음 1페이지 불러옴
- "더 불러오기" 버튼으로 페이지 증가
- Redux 상태 기반 추가 로딩 가능

### ✅ 3. 검색 기능 (MovieSearch)
- TMDB 검색 API 사용
- 검색 결과는 MovieSlider UI 재활용
- 검색 결과 있을 때만 자동 표시

### ✅ 4. 영화 상세 페이지
- 영화 설명, 이미지, 평점 노출

### ✅ 5. 영화 요청 페이지 (RequestPage)
- 제목, 설명 입력 후 요청 완료 처리
- 이후 Firebase 추가 가능

---

---

## 📂 프로젝트 구조



src
│ App.jsx
│ main.jsx
│ index.css
│ store/store.jsx
│ store/movieSlice.js
│ components/
│ ├ MovieCarousel.jsx
│ ├ MovieSlider.jsx
│ ├ MovieCard.jsx
│ ├ Skeleton.jsx
│ ├ MovieSearch.jsx
│ pages/
│ ├ Home.jsx
│ ├ MovieDetail.jsx
│ ├ RequestPage.jsx


---

---

## 🛠 주요 문제 해결 기록

### 🧩 1) Carousel이 왼쪽으로 쏠리는 문제
원인
- 부모 컨테이너가 제한(width: max-7xl)
- 이미지 background-position이 left로 정렬됨

해결 방법 핵심 코드:

```jsx
<div className="w-screen relative left-1/2 -translate-x-1/2">
  <MovieCarousel />
</div>


그리고 CSS:

style={{
  backgroundImage: `url(...)`,
  backgroundPosition: "center",
  backgroundSize: "cover"
}}


👉 이미지 중앙 정렬 성공
👉 초광폭 모니터에서도 정상 표시

🧩 2) MovieDetail 파일 불러오기 실패

오류 메시지:

Failed to resolve import "./pages/MovieDetail"


원인: 실제 파일명은 Detail.jsx

해결 방법:

파일명을 MovieDetail.jsx 로 변경

🧩 3) unknown at rule @tailwind 문제

원인:

VSCode Tailwind 플러그인 인식 문제

컴파일 과정에서는 정상 작동

결론:
✔ 오류 무시 가능
✔ 빌드와 실행에는 문제 없음

🧱 Tailwind 설정

프로젝트 루트에 아래가 있어야 함

tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


그리고 index.css 최상단:

@tailwind base;
@tailwind components;
@tailwind utilities;

👇 실행 방법
의존성 설치
npm install

개발 모드 실행
npm run dev

🔥 기술 스택
기술	사용 목적
React	UI 구조
Redux Toolkit	전역 상태관리
React Router	페이지 이동
Tailwind CSS	스타일링
TMDB API	영화 정보 제공
Lucide Icons	아이콘 사용
🧃 향후 확장 아이디어

✔ Firebase Firestore 연동하여
→ “영화 요청” 저장 가능
✔ 사용자 리뷰 기능
✔ 영화별 좋아요/북마크 기능
✔ 로그인 / 인증 기능 추가 가능

🎉 상태

👉 UI 완성
👉 기능 정상 작동
👉 반응형 처리 완료
👉 버그 수정 완료
