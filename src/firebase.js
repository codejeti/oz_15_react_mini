import { initializeApp } from "firebase/app";


// 1. .env 파일의 환경 변수를 사용하여 설정 객체 생성
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 2. Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 3. 필요한 Firebase 서비스 초기화
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// 4. 초기화된 앱 객체만 내보내기 (다른 파일에서 사용할 수 있도록)
export default app;
