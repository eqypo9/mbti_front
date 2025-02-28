import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center items-center space-y-6'>
      <h1 className='text-4xl font-bold text-white'>테스트 페이지</h1>

      <Image
        src='/images/test-main.png'
        alt='Main'
        width={240}
        height={240}
        className='object-contain'
      />

      <Link href='/username'>
        <button className='px-6 py-3 bg-white text-black font-medium text-lg rounded-md hover:bg-gray-300'>
          테스트 시작하기
        </button>
      </Link>
    </div>
  );
}
