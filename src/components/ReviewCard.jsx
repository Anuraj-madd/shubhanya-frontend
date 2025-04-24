import React from 'react';

const ReviewCard = ({ name, review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="mb-4">
        <svg
          className="w-6 h-6 text-[#AAC7D8]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.18a1 1 0 00.95.69h4.398c.969 0 1.371 1.24.588 1.81l-3.562 2.59a1 1 0 00-.364 1.118l1.357 4.18c.3.921-.755 1.688-1.54 1.118l-3.562-2.59a1 1 0 00-1.176 0l-3.562 2.59c-.785.57-1.84-.197-1.54-1.118l1.357-4.18a1 1 0 00-.364-1.118L2.656 9.607c-.783-.57-.38-1.81.588-1.81h4.398a1 1 0 00.95-.69l1.357-4.18z" />
        </svg>
      </div>
      <p className="text-[#44576D] text-sm mb-4 italic">"{review}"</p>
      <h3 className="text-[#29353C] font-semibold text-md text-right">- {name}</h3>
    </div>
  );
};

export default ReviewCard;
