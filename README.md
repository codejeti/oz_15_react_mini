# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

🎥 MOVIZ: React 영화 예고편 앱 (GitHub 버전)

다크 모드와 반응형 디자인을 갖춘 영화 예고편 탐색 웹 애플리케이션

📌 목차 (Table of Contents)

프로젝트 개요

기술 스택 및 환경 설정

실행 방법

주요 디버깅 히스토리 (V4 → V3)

핵심 파일 요약

1. 프로젝트 개요

이 프로젝트는 React와 Tailwind CSS v3을 기반으로 구축된 반응형 영화 예고편 앱입니다. 다크 테마 디자인과 안정적인 빌드 환경을 핵심 목표로 개발되었습니다.

2. 기술 스택 및 환경 설정

2.1 최종 기술 스택

분류

기술

최종 버전

역할 및 설명

Frontend

React

^19.2.0

UI 구성 및 상태 관리

Styling

Tailwind CSS

v3.4.4

안정화된 유틸리티 우선 CSS 프레임워크

Bundler

Vite

rolldown-vite@7.2.5

빠르고 효율적인 개발 서버 및 빌드 도구

Processor

PostCSS

v8.4.38

CSS 전처리 (Tailwind 통합)

Icons

lucide-react

-

심플하고 일관된 아이콘 제공

Modules

TypeScript (JSX)

-

정적 타입 검사 지원

2.2 핵심 설정 파일 및 V3 통합 규격

이 프로젝트는 Tailwind CSS v3의 안정적인 PostCSS 통합 방식을 따릅니다.

postcss.config.js (V3 표준 설정)

PostCSS 설정 파일은 Tailwind CSS v3 버전의 표준 로드 방식인 함수 호출을 사용해야 빌드 파이프라인이 정상 작동합니다.

// PostCSS 설정 파일: Tailwind V3 규격
import tailwindcss from 'tailwindcss'; 
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    // V3는 반드시 플러그인을 함수처럼 호출 ( ) 해야 합니다.
    tailwindcss(), 
    autoprefixer(),
  ],
}


3. 실행 방법 (Quick Start)

3.1 전제 조건

Node.js (LTS 버전)

npm 또는 Yarn

Vite 환경

3.2 실행 명령어

프로젝트를 구동하는 표준 명령어는 다음과 같습니다.

의존성 설치 (최초 1회):

npm install


개발 서버 실행:

npm run dev


🚨 중요: 접속 시 주의사항

반드시 npm run dev로 서버를 실행하고, 터미널에 표시되는 http://localhost:5173/ 주소로 접속해야 합니다.

ORB/CORS 보안 에러 방지: file:/// 로컬 경로로 index.html을 직접 열면, 브라우저의 보안 정책에 의해 외부 리소스(Mock 이미지, API 호출 등)가 차단되어 앱이 정상적으로 표시되지 않습니다. 이 문제 해결을 위해 Vite 개발 서버 사용이 강제됩니다.

4. 주요 디버깅 히스토리 (V4 → V3 전환 과정)

프로젝트 초기, Tailwind CSS v4를 시도했으나 안정성 문제로 v3으로 다운그레이드 했습니다. 이 과정은 빌드 환경을 안정화하는 데 중요한 역할을 했습니다.

4.1 ❌ 문제점: Tailwind V4 설정 실패

원인:

V4의 알파/프리뷰 상태: Tailwind CSS v4는 현재 정식(Stable) 버전이 아닌 Alpha/Beta 단계입니다.

아키텍처 변경: V4는 기존 JavaScript 기반 PostCSS 엔진 대신 Rust 기반의 새로운 코어를 도입하면서 모듈 로딩 및 통합 규격이 완전히 달라졌습니다.

모듈 통합 충돌: 새로운 코어는 @tailwindcss/postcss와 같은 별도의 플러그인을 요구하며, 기존 V3의 단순한 함수 호출(tailwindcss()) 방식과 충돌하여 잦은 Cannot find package 오류나 Syntax Error를 유발했습니다.

✅ 결론 및 해결책:

안정성 우선: 통합 안정성 문제 해결을 위해 **Tailwind CSS v3.4.4 (Stable 버전)**으로 다운그레이드했습니다.

설정 변경: postcss.config.js 파일의 플러그인 로드 방식을 V3 표준인 tailwindcss() 함수 호출 형태로 수정하여 빌드 파이프라인을 안정화했습니다.

5. 핵심 파일 요약

5.1 MovieTrailerApp.jsx (메인 컴포넌트)

애플리케이션의 핵심 UI와 로직이 담긴 파일입니다.

주요 기능: 다크 테마 디자인, 반응형 내비게이션 메뉴 (Mobile Menu), 영화 목록 필터링(검색), 예고편 카드 표시.

V3 전환 영향: Tailwind 클래스 이름이 V3/V4 모두 동일하기 때문에, 내부 코드는 수정할 필요가 없었습니다.

5.2 package.json (프로젝트 의존성)

Tailwind V4 관련 패키지는 제거되었고, V3 코어와 필수 PostCSS 플러그인들이 devDependencies에 정의되어 있습니다.

5.3 tailwind.config.js (커스터마이징 예시)

프로젝트에서 사용된 커스텀 색상(예: dark-bg, primary-red, light-gray)을 정의하여 다크 테마의 일관성을 유지합니다.
