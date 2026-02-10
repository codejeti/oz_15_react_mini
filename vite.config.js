import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  base: '/oz_15_react_mini/',

  plugins: [
    react({
      babel: {
<<<<<<< HEAD
        plugins: [['babel-plugin-react-compiler']],
        base: '/oz_15_react_mini/'
=======
        plugins: ['babel-plugin-react-compiler'],
>>>>>>> d011e0e (build: Vite 배포 설정 수정 및 Tailwind 빌드 오류 해결)
      },
    }),
  ],
})
