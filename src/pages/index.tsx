import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-4'>
      <h1 className='sm:text-4xl text-2xl font-bold text-white'>GANEUNGHAN</h1>

      <Image
        src='/images/test-wolf.png'
        alt='Main'
        width={240}
        height={240}
        className='object-contain sm:w-[240px] w-[180px]'
      />

      <Link href='/username'>
        <button className='sm:px-6 px-4 sm:py-3 py-2 bg-white text-black font-medium sm:text-lg text-base rounded-md hover:bg-gray-300'>
          Press Start
        </button>
      </Link>
    </div>
  );
}
