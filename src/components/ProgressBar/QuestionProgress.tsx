import Image from 'next/image';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='relative z-10 w-full bg-gray-800 h-3 sm:h-4 md:h-5 lg:h-6 rounded-full'>
      {/* 진행 바 */}
      <div
        className='h-full bg-white rounded-l-full transition-all duration-500 ease-in-out'
        style={{ width: `${progress}%`, minWidth: '10px' }} // 최소 크기 보장
      />

      {/* 체리 아이콘 */}
      <div
        className='absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-500 ease-in-out'
        style={{ left: `calc(${progress}% - 5px)` }}
      >
        <Image
          src='/images/cherry.png'
          alt='Cherry'
          width={20}
          height={20}
          className='object-contain'
        />
      </div>
    </div>
  );
}
