interface ProgressBarProps {
  currentIndex: number;
  total: number;
}
export function ProgressBar({ currentIndex, total }: ProgressBarProps) {
  return (
    <div className='absolute top-4 left-4 right-4 flex space-x-1 z-10 px-4'>
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className='h-1 bg-gray-600 rounded-full flex-1'>
          <div
            className={`h-full ${
              index <= currentIndex ? 'rounded-full bg-white' : 'bg-gray-600'
            } transition-all duration-500`}
            style={{
              width:
                index === currentIndex
                  ? '100%'
                  : index < currentIndex
                  ? '100%'
                  : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
}
