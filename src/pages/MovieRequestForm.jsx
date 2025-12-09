import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import { submitMovieRequest } from '../supabaseClient';

const MovieRequestForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("영화 제목을 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);

      await submitMovieRequest({
        title,
        description
      });

      alert(`영화 "${title}"의 추가 요청이 Supabase에 정상적으로 저장되었습니다!`);
      navigate('/');
    } catch (error) {
      console.error('Supabase 저장 실패:', error);
      alert('요청 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 max-w-2xl mx-auto">
    <div className="flex items-center mb-8">
    <button
    onClick={() => navigate(-1)}
    className="p-2 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition mr-4"
    aria-label="뒤로가기"
    >
    <ChevronLeft size={24} />
    </button>
    <h1 className="text-3xl font-bold border-l-4 border-yellow-500 pl-3">
    영화 추가 요청하기
    </h1>
    </div>

    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
    <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
    요청할 영화 제목 <span className="text-red-500">*</span>
    </label>
    <input
    id="title"
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-yellow-500 focus:border-yellow-500"
    placeholder="예: 인터스텔라"
    />
    </div>

    <div>
    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
    요청 사유 또는 설명
    </label>
    <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows="4"
    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-yellow-500 focus:border-yellow-500"
    placeholder="이 영화가 목록에 추가되어야 하는 이유를 간략히 설명해 주세요."
    ></textarea>
    </div>

    <button
    type="submit"
    disabled={loading}
    className="w-full flex items-center justify-center p-3 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-400 transition disabled:opacity-50"
    >
    <Send size={20} className="mr-2" />
    {loading ? '저장 중...' : '요청 제출하기'}
    </button>
    </form>
    </div>
  );
};

export default MovieRequestForm;
