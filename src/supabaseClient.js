const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase 환경 변수가 설정되지 않았습니다. 루트의 .env(.local) 또는 .env.example을 확인하세요.");
}

const defaultHeaders = {
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
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
