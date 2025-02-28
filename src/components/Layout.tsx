import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-full max-w-[600px] h-screen bg-black text-white flex flex-col justify-center items-center overflow-auto sm:p-6 p-4'>
        {children}
      </div>
    </div>
  );
}
