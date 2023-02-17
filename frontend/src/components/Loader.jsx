import React from 'react';

const Loader = () => (
  <div className="flex items-center justify-center" role="status">
    <svg className="w-12 h-12 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#6469ff" d="M12 22.5c3.5 0 5.5-1.5 6.5-2.5 1-1 1.5-2 1.5-3.5s-0.5-2.5-1.5-3.5c-1-1-3-2-6.5-2s-5.5 1-6.5 2.5c-1 1.5-1.5 2.5-1.5 3.5s0.5 2.5 1.5 3.5c1 1 3 2 6.5 2z">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 5; 0 -5; 0 5"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
);

export default Loader;
