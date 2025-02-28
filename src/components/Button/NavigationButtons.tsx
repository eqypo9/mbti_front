import Image from 'next/image';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalSlides: number;
}

export function NavigationButtons({
  onPrev,
  onNext,
  currentIndex,
  totalSlides,
}: NavigationButtonsProps) {
  return (
    <>
      <div
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10 ${
          currentIndex === 0 ? 'hidden' : ''
        }`}
      >
        <button onClick={onPrev}>
          <Image
            src='/icons/icon-left.svg'
            alt='Previous'
            width={32}
            height={32}
            className='sm:w-8 w-6'
          />
        </button>
      </div>

      <div
        className={`absolute top-1/2 right-2 transform -translate-y-1/2 z-10 ${
          currentIndex === totalSlides - 1 ? 'hidden' : ''
        }`}
      >
        <button onClick={onNext}>
          <Image
            src='/icons/icon-right.svg'
            alt='Next'
            width={32}
            height={32}
            className='sm:w-8 w-6'
          />
        </button>
      </div>
    </>
  );
}
