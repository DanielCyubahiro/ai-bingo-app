'use client';

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({onClick, children}) => {
  return (
      <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <button
            className="px-10 py-5 text-5xl bg-[#f39c12] border-none rounded-2xl cursor-pointer text-white font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={onClick}
        >
          {children}
        </button>
      </div>
  );
};

export default Button;