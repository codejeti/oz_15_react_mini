import { useState, useEffect } from 'react';

const AUTO_SLIDE_INTERVAL = 6000; // 6초

/**
 * 영화 목록의 길이를 기반으로 자동 슬라이드 인덱스를 관리하는 커스텀 훅
 * @param {number} length 슬라이드할 항목(영화)의 총 개수
 * @returns {[number, function]} [현재 인덱스, 인덱스 설정 함수]
 */
const useAutoSlide = (length) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 항목이 존재할 때만 자동 슬라이드 실행
    if (length > 0) {
      const intervalId = setInterval(() => {
        // 인덱스를 1씩 증가시키고, 배열의 끝에 도달하면 0으로 순환
        setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
      }, AUTO_SLIDE_INTERVAL);

      // 클린업 함수: 컴포넌트가 언마운트되거나 length가 변경될 때 인터벌 정리
      return () => clearInterval(intervalId);
    }
  }, [length]);

  return [currentIndex, setCurrentIndex];
};

export default useAutoSlide;