import Image from 'next/image';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='relative w-full bg-gray-800 h-6 rounded-full overflow-hidden'>
      {/* 진행 바 */}
      <div
        className='h-full bg-white transition-all duration-500 ease-in-out'
        style={{ width: `${progress}%` }}
      />

      {/* 체리 아이콘 */}
      <div
        className='absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out'
        style={{ left: `calc(${progress}% - 15px)` }}
      >
        <Image
          src='/icons/icon-cherry.svg'
          alt='Cherry'
          width={30}
          height={30}
          className='object-contain'
        />
      </div>
    </div>
  );
}
