import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse h-full border border-gray-700">
      <div className="bg-gray-700 aspect-[2/3] w-full"></div>
      <div className="p-4 flex flex-col gap-2">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-10 bg-gray-700 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
