🎬 Movie Explorer App

React + Redux + TailwindCSS 기반 영화 검색 및 추천 서비스입니다.
TMDB API를 사용하여 최신 인기 영화, 평점 높은 영화 목록을 제공하며 검색 및 상세 보기 기능을 포함합니다.

주요 기능
1) 메인 캐러셀 (MovieCarousel)

자동 슬라이드 전환

평점 높은 영화 표시

백그라운드 이미지 중앙 고정 처리

반응형 디자인 적용

2) 인기 영화 목록 (페이지네이션 지원)

초기 로딩 시 첫 페이지 요청

"더 불러오기" 버튼 클릭 시 다음 페이지 로딩

Redux 상태 기반 누적 로딩 방식

3) 영화 검색 기능 (MovieSearch)

검색 결과는 별도 영역에 출력

검색 시 MovieSlider 컴포넌트 재사용

4) 영화 상세 페이지

영화 제목, 설명, 포스터, 평가 등 출력

5) 영화 요청 페이지 (RequestPage)

영화 제목 및 요청 사유 입력

이후 Firebase 기능으로 확장 가능

프로젝트 구조
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

해결한 이슈 기록
1) 캐러셀 정렬 문제

증상

화면이 넓어질수록 배경이 왼쪽 정렬됨

오른쪽 여백이 과도하게 생김

원인

부모 컨테이너 폭 제한(max-width)

background-position 기본값 left

해결 내용

<div className="w-screen relative left-1/2 -translate-x-1/2">
  <MovieCarousel />
</div>


또는 스타일 수정:

backgroundPosition: "center",
backgroundSize: "cover"


결과

초광폭 해상도에서도 중앙 정렬 정상 유지

2) 파일명 불일치로 import 실패

오류 메시지 예시:

Failed to resolve import "./pages/MovieDetail"


원인

실제 파일명은 Detail.jsx 였음

조치

MovieDetail.jsx 로 변경

3) unknown at rule @tailwind 경고

원인

VSCode Tailwind 플러그인 미인식

결론

실행 및 빌드에는 영향 없음

플러그인 설치 시 해결됨

Tailwind 설정 정보
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

index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

실행 방법
패키지 설치
npm install

로컬 실행
npm run dev

기술 스택
기술	용도
React	UI 구성
Redux Toolkit	상태 관리
React Router DOM	페이지 이동
TailwindCSS	스타일링
TMDB API	영화 정보 제공
향후 확장 계획

Firebase 연동하여 요청 영화 저장

즐겨찾기 및 북마크 기능 추가

사용자 리뷰 기능

로그인 및 인증

필요하면 형 GitHub Repo 스타일에 맞게 문장 톤 더 조정해줄 수도 있어 👍

You said:
해줘 그러면 
ChatGPT said:

좋아 형 👍
GitHub에서 개발자가 보기 편하고
"프로젝트 소개 + 핵심 내용"만 깔끔하게 담긴 버전으로 최적화해줄게.

목표: 딱 필요한 정보만 명확하게
톤: 개발자 문체 / 담백 / 간결

📌 README.md (최적화 버전)
# Movie Explorer

TMDB 기반 영화 검색 및 추천 서비스입니다.  
평점 순 캐러셀, 인기 영화 목록, 검색 기능, 상세 페이지를 제공합니다.

---

## 주요 기능

### ● 메인 캐러셀 (MovieCarousel)
- 자동 슬라이드
- 평점 높은 영화 기준 로테이션
- 초광폭 해상도 포함 중앙 정렬 처리

### ● 인기 영화 목록
- 초기 1페이지 로딩
- “더 불러오기” 버튼으로 페이지 증가
- Redux 상태를 활용한 누적 방식

### ● 검색 기능
- TMDB 검색 API 사용
- 검색 결과는 별도 섹션으로 표시
- MovieSlider 컴포넌트 재사용

### ● 상세 페이지
- 영화 제목, 줄거리, 이미지 표시

### ● 영화 요청 페이지
- 요청 내용 입력
- 이후 Firestore 연동 가능 구조

---

## 프로젝트 구조



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

## 이슈 해결 기록

### 1) 캐러셀 중앙 정렬 문제
증상: 화면을 넓힐수록 이미지가 왼쪽으로 치우침  
원인: 부모 컨테이너 max-width 및 background-position 영향  

처리 방식:
```jsx
<div className="w-screen relative left-1/2 -translate-x-1/2">
  <MovieCarousel />
</div>


그리고 스타일 적용:

backgroundPosition: "center"
backgroundSize: "cover"


→ 초광폭 모니터에서도 정렬 유지됨

2) MovieDetail import 오류

원인: 실제 파일명 불일치
조치: 파일명을 MovieDetail.jsx로 변경

3) "@tailwind unknown at rule" 경고

원인: 에디터 플러그인 인식 문제
실제 빌드 문제 없음

Tailwind 설정
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

실행 방법
설치
npm install

개발 실행
npm run dev

기술 스택

React

Redux Toolkit

React Router DOM

Tailwind CSS

TMDB API

향후 계획

영화 요청 기능 DB 저장(Firestore 예정)

즐겨찾기 기능

사용자 코멘트 기능

로그인 기능 확장
