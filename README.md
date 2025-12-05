🎬 Movie Explorer

TMDB 기반 영화 검색 및 추천 서비스입니다.
평점 슬라이드, 인기 영화 로딩, 검색 결과 표시, 상세 페이지를 제공합니다.

⭐ 주요 기능
1) 메인 캐러셀 (MovieCarousel)

자동 슬라이드

평점 높은 영화 기준 순환

중앙 정렬 처리 완료

반응형 UI

2) 인기 영화 목록

초기 1페이지 로딩

“더 불러오기” 방식으로 추가 페이지 로드

Redux 기반 누적 로딩 방식

3) 영화 검색 기능

TMDB 검색 API 사용

검색 결과는 별도 섹션에 표시

MovieSlider 컴포넌트 재사용

4) 영화 상세 페이지

제목, 설명, 이미지 출력

5) 영화 요청 페이지

제목, 사유 입력 가능

추후 Firestore 연동 가능 구조

📂 프로젝트 구조
src
│ App.jsx
│ main.jsx
│ index.css
│
├ store/
│  ├ store.jsx
│  └ movieSlice.js
│
├ components/
│  ├ MovieCarousel.jsx
│  ├ MovieSlider.jsx
│  ├ MovieCard.jsx
│  ├ Skeleton.jsx
│  └ MovieSearch.jsx
│
└ pages/
   ├ Home.jsx
   ├ MovieDetail.jsx
   └ RequestPage.jsx

🛠 해결한 이슈 기록
✔ 캐러셀 배경 정렬 문제
증상

화면이 넓을수록 배경이 왼쪽으로 쏠림

오른쪽 여백이 빈 상태로 남음

원인

부모 요소 폭 제한 (max-width 영향)

기본 background-position: left

해결 방법
style={{
  backgroundPosition: "center",
  backgroundSize: "cover",
}}

결과

👍 초광폭 해상도에서도 정렬 정상화

✔ MovieDetail import 오류
오류 메시지 예시
Failed to resolve import "./pages/MovieDetail"

원인

실제 파일명이 Detail.jsx

조치

파일명을 MovieDetail.jsx로 변경

✔ "unknown at rule @tailwind" 경고
원인

VSCode Tailwind 플러그인 미설치

결론

⚠ 실행 및 빌드에는 영향 없음
✔ 플러그인 설치 시 해결됨

🎨 Tailwind 설정 코드
tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

🧪 실행 방법
의존성 설치
npm install

개발 실행
npm run dev

🔧 기술 스택
기술	용도
React	UI 로직
Redux Toolkit	상태 관리
React Router	페이지 이동
TailwindCSS	스타일링
TMDB API	영화 데이터 제공
💡 향후 기능 계획

✔ 영화 요청 Firestore 저장
✔ 즐겨찾기 기능
✔ 사용자 리뷰
✔ 로그인 & 인증
