# 🎬 Movie Explorer App

React + Redux + TailwindCSS 기반 영화 추천 및 검색 서비스입니다. TMDB API를 이용하여 인기 영화, 평점 높은 영화 목록을 제공하며 검색 기능과 영화 상세보기 기능을 포함합니다.

---

## 🆕 신규 미션 가이드: 회원가입/로그인 UI

### 1) 회원가입/로그인 페이지 구성하기
- 하나의 페이지 안에 **회원가입**과 **로그인** 레이아웃을 나란히 배치합니다.
- 입력 필드와 버튼은 테이블처럼 정돈된 형태로 배치하여 가독성을 높입니다.
- 공통 필드 규칙
  - 아이디: 이메일을 사용합니다.
  - 비밀번호: 입력하는 동안 숨김 처리합니다.
- 로그인 필드
  - 아이디(이메일)
  - 비밀번호
- 회원가입 필드
  - 아이디(이메일)
  - 이름
  - 비밀번호
  - 비밀번호 확인
- 각 입력값은 아래 조건으로 검증합니다.
  - 이름: 2~5자, 한글/영어만 허용.
  - 이메일: 이메일 형식(@ 포함, 완성된 도메인)인지 검사.
  - 비밀번호: 8~20자, 영문 대소문자 + 숫자 + 특수문자 모두 포함 여부 확인.
  - 비밀번호 확인: 비밀번호와 동일해야 합니다.

### 2) NavBar에 회원가입/로그인 UI 구현하기
- NavBar 우측에 회원가입/로그인 버튼을 배치합니다.
- 로그인 상태에 따라 버튼 텍스트가 변경되며, 비로그인 상태에서만 회원가입 버튼을 노출합니다.
- 모바일 화면에서는 반응형 드로어 메뉴로 전환되어야 합니다.

### 3) 기능 구현하기
- 이메일로 회원가입(Sign Up) 및 로그인(Sign In)을 처리합니다.
- **Supabase**로 인증을 구현합니다. 이메일 회원가입 시 이메일 검증 링크(Confirm email)를 포함해 가입을 완료하도록 합니다.
- 짧은 시간 동안 과도한 요청 시 `429 status too many requests` 응답이 올 수 있으니 토큰/요청 수를 관리합니다.
- `.env` 파일에 Supabase `Project URL`과 `API Key`(anon key)를 관리합니다. 예시:
  ```bash
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

### 🔥 도전 미션
- 기본 미션을 완료했다면 Supabase의 OAuth 설정을 활용해 소셜 로그인(Google 등)을 추가로 구현해 보세요.

---

## 🔧 Supabase 연동 준비
- `src/supabaseClient.js`에서 Supabase 클라이언트를 초기화합니다.
- 영화 요청 폼(`MovieRequestForm`)은 `movie_requests` 테이블에 제목/설명을 저장하도록 Supabase REST 호출을 사용합니다.
- 개발/배포 환경별로 `.env` 값만 바꿔 적용하면 됩니다.

### 🔑 환경 변수(.env) 설정 방법
1. 저장소 루트의 `.env.example`을 확인합니다. (커밋에 포함된 샘플)
2. 다음 중 하나의 이름으로 복사 후 값을 입력하세요.
   - 로컬 개발: `.env` 또는 `.env.local`
   - 특정 환경 분리: `.env.development`, `.env.production` 등 Vite가 읽는 패턴
3. Supabase 프로젝트에서 발급받은 정보를 입력합니다.
   ```bash
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
4. 파일은 `.gitignore`에 포함되어 자동으로 커밋되지 않습니다. 배포 환경에는 별도의 비밀 관리(배포 플랫폼의 환경 변수 설정 등)를 사용하세요.
5. 앱 내에서는 `import.meta.env.VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`로 접근합니다.

> ⚠️ 환경 변수 이름은 반드시 `VITE_` 접두어를 가져야 Vite 빌드 시 노출됩니다.

---

## 🚀 기존 기능 요약

### ✅ 메인 캐러셀 (MovieCarousel)
- 자동으로 영화 슬라이드 전환
- 평점 높은 영화 순으로 표시
- **백그라운드 이미지 중앙 정렬 처리 완료**
- 반응형 지원

### ✅ 인기 영화 목록 (Pagination 지원)
- 처음 1페이지 불러옴
- "더 불러오기" 버튼으로 페이지 증가
- Redux 상태 기반 추가 로딩 가능

### ✅ 검색 기능 (MovieSearch)
- TMDB 검색 API 사용
- 검색 결과는 MovieSlider UI 재활용
- 검색 결과 있을 때만 자동 표시

### ✅ 영화 상세 페이지
- 영화 설명, 이미지, 평점 노출

### ✅ 영화 요청 페이지 (RequestPage)
- 제목, 설명 입력 후 요청 완료 처리
- 이후 Supabase로 요청 내역 저장 가능

---

## 📂 프로젝트 구조

```
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
```

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
```

그리고 CSS:

```jsx
style={{
  backgroundImage: `url(...)`,
  backgroundPosition: "center",
  backgroundSize: "cover"
}}
```

👉 이미지 중앙 정렬 성공
👉 초광폭 모니터에서도 정상 표시

### 🧩 2) MovieDetail 파일 불러오기 실패

오류 메시지:

Failed to resolve import "./pages/MovieDetail"

원인: 실제 파일명은 Detail.jsx

해결 방법:

파일명을 MovieDetail.jsx 로 변경

### 🧩 3) unknown at rule @tailwind 문제

원인:

VSCode Tailwind 플러그인 인식 문제

컴파일 과정에서는 정상 작동

결론:
✔ 오류 무시 가능
✔ 빌드와 실행에는 문제 없음

### 🧱 Tailwind 설정

프로젝트 루트에 아래가 있어야 함

`tailwind.config.js`
```js
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
```

`postcss.config.js`
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

그리고 `index.css` 최상단:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

👇 실행 방법
- 의존성 설치: `npm install`
- 개발 모드 실행: `npm run dev`
