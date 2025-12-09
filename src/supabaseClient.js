const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "Supabase 환경 변수가 설정되지 않았습니다. 루트의 .env(.local) 또는 .env.example을 확인하세요."
    );
}

const defaultHeaders = {
    apikey: supabaseAnonKey,
    'Content-Type': 'application/json',
};


export const submitMovieRequest = async ({ title, description }) => {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/movie_requests`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            Prefer: 'return=representation',
        },
        body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || '요청 저장 중 오류가 발생했습니다.');
    }

    return response.json();
};


export const signUpUser = async ({ email, password, name }) => {
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
        },
        body: JSON.stringify({
            email,
            password,
            data: { name },
        }),
    });

    const data = await response.json();
    console.log("✅ Supabase 회원가입 응답:", data);

    if (!response.ok) {
        throw new Error(data.error_description || '회원가입 실패');
    }

    return data;
};


export const loginUser = async ({ email, password }) => {
    const response = await fetch(
        `${supabaseUrl}/auth/v1/token?grant_type=password`,
        {
            method: 'POST',
            headers: {
                apikey: supabaseAnonKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    const data = await response.json();
    console.log("✅ Supabase 진짜 로그인 토큰 응답:", data);

    if (!response.ok || !data.access_token) {
        throw new Error(
            data.error_description ||
            data.error ||
            '로그인 실패 (토큰 발급 안 됨)'
        );
    }

    return data;
};
