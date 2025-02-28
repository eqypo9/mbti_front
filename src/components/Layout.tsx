import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      {/* ✅ 한가운데 정렬된 div */}
      <div className='w-full max-w-[600px] h-screen bg-black text-white flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
