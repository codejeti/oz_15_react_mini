# 🎬 Movie Explorer: 영화 검색 및 추천 서비스

![Movie Explorer Banner]
> TMDB(The Movie Database) API를 기반으로 구축된 영화 검색 및 추천 서비스입니다. 사용자에게 인기 영화 목록, 평점 기반 캐러셀, 영화 상세 페이지, 그리고 영화 요청 기능을 제공하는 React 기반의 웹 애플리케이션입니다.

---

## 🔑 주요 기능 (Features)

프로젝트는 모듈성과 재사용성을 고려하여 다음 기능을 구현했습니다.

### 1. 메인 캐러셀 (MovieCarousel)

* **평점 기준 로테이션:** 평점이 높은 영화들을 자동으로 슬라이드하며 보여줍니다.
* **중앙 정렬 처리:** 초광폭 해상도에서도 배경 이미지가 중앙에 정확하게 정렬됩니다. (🐞 **Debugging Point** 참조)

### 2. 인기 영화 목록

* **초기 로딩:** 애플리케이션 시작 시 인기 영화의 첫 페이지를 로딩합니다.
* **무한 스크롤/더 불러오기:** "더 불러오기" 버튼을 통해 다음 페이지의 영화 목록을 Redux 상태에 누적하여 표시합니다.

### 3. 검색 기능

* **TMDB 검색 API:** TMDB의 공식 검색 API를 사용하여 영화를 찾습니다.
* **결과 섹션:** 검색 결과는 별도의 섹션에 표시되며, `MovieSlider` 컴포넌트를 재사용하여 시각화합니다.

### 4. 상세 페이지 및 요청 기능

* **상세 페이지 (`MovieDetail.jsx`):** 선택된 영화의 제목, 상세 줄거리, 포스터 이미지를 표시합니다.
* **영화 요청 페이지 (`RequestPage.jsx`):** 사용자가 보고 싶은 영화를 요청할 수 있는 인터페이스를 제공하며, 향후 Firestore 연동을 고려한 구조로 설계되었습니다.

---

## 💻 기술 스택 (Tech Stack)

| 카테고리 | 기술 | 용도 | 설명 |
| :--- | :--- | :--- | :--- |
| **Frontend** | `React` | UI 로직 | 사용자 인터페이스 구축 및 컴포넌트 기반 개발 |
| **상태 관리** | `Redux Toolkit` | 상태 관리 | 중앙 집중식 상태 관리 및 비동기 데이터 처리 |
| **라우팅** | `React Router DOM` | 페이지 이동 | SPA(Single Page Application) 라우팅 처리 |
| **스타일링** | `Tailwind CSS` | 스타일링 | 유틸리티 퍼스트(Utility-first) CSS 프레임워크 |
| **데이터 소스** | `TMDB API` | 데이터 제공 | 영화 검색, 평점, 상세 정보 등 데이터 소스 |

---

## 📁 프로젝트 구조

프로젝트는 모듈성과 유지보수성을 고려하여 컴포넌트, 상태 관리, 페이지 별로 명확히 분리된 구조를 갖습니다.

| 카테고리 | 파일 / 디렉토리 | 설명 |
| :--- | :--- | :--- |
| **루트** | `App.jsx`, `main.jsx`, `index.css` | 기본 레이아웃, 애플리케이션 진입점, 전역 스타일 |
| **상태 관리** | `store/` | Redux Toolkit을 사용한 전역 상태 관리 |
| | └ `movieSlice.js` | 영화 데이터 상태 및 비동기 로직(`createAsyncThunk`) 정의 |
| **컴포넌트** | `components/` | 재사용 가능한 UI 모듈 |
| | ├ `MovieCarousel.jsx` | 메인 페이지의 상단 캐러셀 |
| | ├ `MovieSlider.jsx` | 영화 목록을 가로로 표시하는 슬라이더 |
| **페이지** | `pages/` | React Router DOM을 위한 라우트 컴포넌트 |
| | ├ `Home.jsx` | 메인 랜딩 페이지 |
| | └ `MovieDetail.jsx` | 영화 상세 정보 페이지 |

---

## 🐞 주요 오류 및 해결 과정 (Debugging Journey)

### 1. 캐러셀 배경 중앙 정렬 문제

| 증상 | 원인 | 해결 방법 |
| :--- | :--- | :--- |
| 화면을 넓힐수록 배경 이미지가 왼쪽으로 치우치고 오른쪽 여백이 발생. | 부모 컨테이너에 적용된 `max-width`의 영향과 배경 스타일의 부재. | 캐러셀 컨테이너에 `w-screen relative left-1/2 -translate-x-1/2` 클래스를 적용하여 뷰포트 전체 너비를 사용하고 중앙으로 강제 이동. **배경 스타일로 `backgroundPosition: "center"`와 `backgroundSize: "cover"`를 명시적으로 적용.** |

### 2. MovieDetail Import 오류

| 증상 | 원인 | 조치 |
| :--- | :--- | :--- |
| `Failed to resolve import "./pages/MovieDetail"` 오류 발생. | 실제 파일명이 `Detail.jsx`로 되어 있어 `MovieDetail.jsx`로 import 시 충돌 발생. | 파일명을 `MovieDetail.jsx`로 변경하여 라우팅 및 import 경로를 일치시켰습니다. |

---

## 🚀 프로젝트 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

## 최종 제출 버전
- Mission 3 최종 제출용 정리 커밋입니다.
