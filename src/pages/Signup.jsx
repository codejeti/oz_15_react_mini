
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../supabaseClient';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('이름을 입력해 주세요.');
            return;
        }

        if (!email.includes('@')) {
            alert('올바른 이메일 형식을 입력해 주세요.');
            return;
        }

        if (password.length < 6) {
            alert('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            setLoading(true);

            await signUpUser({
                email,
                password,
                name,
            });

            alert('회원가입이 완료되었습니다! 이제 로그인해 주세요.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert(error.message || '회원가입 중 오류가 발생했습니다.');
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
        <h1 className="text-3xl font-bold text-white text-center">회원가입</h1>

        <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
        type="password"
        placeholder="비밀번호 (6자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50"
        >
        {loading ? '가입 중...' : '회원가입'}
        </button>
        </form>
        </div>
    );
};


export default Signup;
