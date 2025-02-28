import Image from 'next/image';

export function NavigationButtons({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        onClick={onPrev}
        className='absolute top-1/2 left-0 transform -translate-y-1/2 z-10'
      >
        <Image
          src='/icons/icon-left.svg'
          alt='Previous'
          width={32}
          height={32}
          className='sm:w-8 w-6'
        />
      </button>
      <button
        onClick={onNext}
        className='absolute top-1/2 right-4 transform -translate-y-1/2 z-10'
      >
        <Image
          src='/icons/icon-right.svg'
          alt='Next'
          width={32}
          height={32}
          className='sm:w-8 w-6'
        />
      </button>
    </>
  );
}
