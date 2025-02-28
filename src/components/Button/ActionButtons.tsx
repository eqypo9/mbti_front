import Image from 'next/image';

interface ActionButtonsProps {
  onDownload: () => Promise<void>;
}

export function ActionButtons({ onDownload }: ActionButtonsProps) {
  return (
    <div className='absolute bottom-6 left-0 right-0 flex justify-between px-6 sm:px-10 z-10'>
      <Image
        src='/icons/heart.svg'
        alt='Like'
        width={30}
        height={30}
        className='sm:w-8 w-6'
      />
      
      {/* ✅ onClick 내부에서 async 함수 실행 */}
      <button onClick={() => onDownload().catch(console.error)}>
        <Image
          src='/icons/icon-download.svg'
          alt='Download'
          width={36}
          height={36}
          className='sm:w-8 w-6'
        />
      </button>

      <Image
        src='/icons/plane.svg'
        alt='Share'
        width={30}
        height={30}
        className='sm:w-8 w-6'
      />
    </div>
  );
}
