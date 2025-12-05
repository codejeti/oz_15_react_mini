Movie Explorer

React + Redux + TailwindCSS 기반 영화 검색 및 추천 서비스입니다.
TMDB API를 사용하여 인기 영화, 평점 높은 영화, 검색 기능을 제공합니다.

[주요 기능]

메인 캐러셀 (MovieCarousel)

자동 슬라이드 전환

평점 높은 영화 순서대로 출력

이미지 중앙 정렬 처리 완료

반응형 UI

인기 영화 목록

첫 페이지 자동 로딩

"더 불러오기" 버튼 클릭 시 다음 페이지 로딩

Redux에서 데이터 누적 관리

영화 검색 기능

TMDB 검색 API 사용

검색 결과는 MovieSlider UI 재사용

검색 중일 때만 표시

영화 상세 페이지

영화 제목, 설명, 이미지, 평점 제공

영화 요청 페이지(RequestPage)

영화 요청 입력 가능

추후 Firestore 연결 가능

[프로젝트 폴더 구조]

src
App.jsx
main.jsx
index.css
store/store.jsx
store/movieSlice.js
components/
MovieCarousel.jsx
MovieSlider.jsx
MovieCard.jsx
Skeleton.jsx
MovieSearch.jsx
pages/
Home.jsx
MovieDetail.jsx
RequestPage.jsx

[해결했던 문제 기록]

캐러셀이 왼쪽으로 치우쳐 보이는 문제

증상:

해상도가 넓어지면 오른쪽 여백 발생

중앙이 아닌 왼쪽 기준으로 배경 이미지 렌더링됨

원인:

background-position 기본값 left

넓은 width에서 부모 컨테이너 중앙 정렬이 안됨

해결:
backgroundPosition을 center로 설정
backgroundSize를 cover로 변경
컨테이너 중앙 정렬로 해결됨

MovieDetail import 실패 문제

오류 메시지:
Failed to resolve import "./pages/MovieDetail"

원인:
파일명이 Detail.jsx 였음

해결:
MovieDetail.jsx 로 파일명 변경 완료

unknown at rule @tailwind 경고

원인:
VSCode Tailwind 확장 미인식 현상

결론:
실행에는 문제 없음
확장 설치 시 해결 가능

[TailwindCSS 설정 파일 위치]

tailwind.config.js

postcss.config.js

index.css (최상단 @tailwind 3줄 포함)

[실행 방법]

패키지 설치
npm install

실행
npm run dev

[사용 기술]

React
Redux Toolkit
React Router DOM
Tailwind CSS
TMDB API

[앞으로 확장 기능 예정]

영화 요청을 Firestore에 저장 가능

즐겨찾기 기능

사용자 리뷰 기능

로그인 기능 추가 가능
