import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!email.includes('@')) {
      alert('올바른 이메일 형식을 입력하세요.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({ email, password });

      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_profile', JSON.stringify(result.user));

      alert('로그인 성공!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-white text-center">로그인</h1>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default Login;
