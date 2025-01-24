import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white-300 flex items-center justify-center">
      <div className="w-full max-w-[600px] h-[720px] bg-[#87ceeb] p-6 flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">테스트 페이지</h1>
        <Image
          src="/images/test-main.png"
          alt="Main"
          width={240}
          height={240}
          className="object-contain"
        />
        <Link href="/username">
          <button className="px-6 py-3 bg-black text-white font-medium text-lg rounded-md hover:bg-gray-800">
            테스트 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}
