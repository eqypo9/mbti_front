import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { DetailedMbtiType, mbtiMatches, mbtiPeople } from '@/constants/mbti';

export default function ResultPage() {
  return <ResultContent />;
}

function ResultContent() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);

  // 사용자 정보
  const [username, setUsername] = useState('사용자');
  const [mbti, setMbti] = useState<DetailedMbtiType | '알 수 없음'>(
    '알 수 없음'
  );
  const [best, setBest] = useState<string[]>([]);
  const [worst, setWorst] = useState<string[]>([]);

  const validDetailedMbtiTypes: DetailedMbtiType[] = [
    'INTJ',
    'INTP',
    'INFJ',
    'INFP',
    'ISTJ',
    'ISTP',
    'ISFJ',
    'ISFP',
    'ENTJ',
    'ENTP',
    'ENFJ',
    'ENFP',
    'ESTJ',
    'ESTP',
    'ESFJ',
    'ESFP',
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const user = searchParams.get('username') || '사용자';
      const mbtiType = searchParams.get('mbti')?.toUpperCase();

      if (
        mbtiType &&
        validDetailedMbtiTypes.includes(mbtiType as DetailedMbtiType)
      ) {
        const match = mbtiMatches[mbtiType as DetailedMbtiType];
        setBest(mbtiPeople[match.best] || []);
        setWorst(mbtiPeople[match.worst] || []);
        setMbti(mbtiType as DetailedMbtiType);
      } else {
        setMbti('알 수 없음');
      }

      setUsername(user);
    }
  }, []);

  // 페이지 데이터 (이미지 & MBTI 해설)
  const slides = [
    { type: 'image', src: '/images/test-cake-jo.png' },
    {
      type: 'text',
      title: `${username}님의 MBTI 결과`,
      description: `당신의 MBTI는 ${mbti} 입니다. 그래서 님같은 엠비티아이 유형은 이러쿵 저러쿵 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트`,
    },
    {
      type: 'text',
      title: '최고의 궁합',
      description: best.length
        ? `당신과 가장 잘 맞는 MBTI는 ${best.join(', ')} 입니다!`
        : '데이터 없음',
    },
    {
      type: 'text',
      title: '최악의 궁합',
      description: worst.length
        ? `가장 안 맞는 MBTI는 ${worst.join(', ')} 입니다!`
        : '데이터 없음',
    },
  ];

  const totalSlides = slides.length;

  // 이전 스토리로 이동
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 다음 스토리로 이동
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push('/'); // 마지막 페이지면 홈으로 이동
    }
  };

  // 이미지 다운로드 기능 (이벤트 전파 방지 추가)
  const handleSaveImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 부모 요소로 이벤트 전파 방지

    const imageUrl = '/images/test-cake-jo.png'; // 저장할 이미지 경로
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'test-cake-jo.png'; // 다운로드될 파일명
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='relative w-full h-screen flex justify-center items-center bg-white'>
      {/* 중앙 고정된 스토리 화면 */}
      <div className='relative w-full max-w-[600px] h-full bg-black text-white'>
        {/* 상단 프로그레스 바 */}
        <div className='absolute top-4 left-4 right-4 flex space-x-1 z-10 px-4'>
          {slides.map((_, index) => (
            <div
              key={index}
              className='h-1 bg-gray-600 rounded-full overflow-hidden flex-1'
            >
              <div
                className={`h-full ${
                  index <= currentIndex ? 'bg-white' : 'bg-gray-600'
                } transition-all duration-500 ease-in-out`}
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

        {/* 프로필 정보 & 닫기 아이콘 */}
        <div className='absolute top-8 left-4 right-4 flex items-center justify-between px-4 z-10'>
          <div className='flex items-center space-x-2'>
            <Image
              src='/images/profile.png'
              alt='Profile'
              width={40}
              height={40}
              className='rounded-full'
            />
            <span className='text-m font-semibold'>{username}</span>
          </div>
          <div className='flex items-center space-x-3'>
            {/* 닫기 아이콘 */}
            <Image
              src='/icons/close.svg'
              alt='Close'
              width={24}
              height={24}
              className='cursor-pointer'
              onClick={() => router.push('/')} // 닫기 클릭 시 홈으로 이동
            />
          </div>
        </div>

        {/* 스토리 컨텐츠 */}
        <div
          ref={storyRef}
          className='w-full h-full flex items-center justify-center p-4 relative'
        >
          <div
            className='absolute top-0 left-0 w-1/2 h-full cursor-pointer z-20'
            onClick={handlePrev}
          />
          <div
            className='absolute top-0 right-0 w-1/2 h-full cursor-pointer z-20'
            onClick={handleNext}
          />

          {slides[currentIndex].type === 'image' ? (
            <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'>
              <Image
                src={slides[currentIndex].src}
                alt='결과 이미지'
                layout='fill'
                objectFit='cover'
                className='pointer-events-none'
              />
            </div>
          ) : (
            <div className='text-center z-10'>
              <h1 className='text-2xl font-bold'>
                {slides[currentIndex].title}
              </h1>
              <p className='mt-2 text-lg'>{slides[currentIndex].description}</p>
            </div>
          )}
        </div>

        {/* 하단 아이콘 및 저장 버튼 */}
        <div className='absolute bottom-6 left-0 right-0 flex justify-between px-10 z-10'>
          <button className='text-white text-2xl'>
            <Image src='/icons/heart.svg' alt='Like' width={24} height={24} />
          </button>
          <button className='text-white text-2xl' onClick={handleSaveImage}>
            <Image
              src='/icons/icon-download.svg'
              alt='Download'
              width={30}
              height={30}
            />
          </button>
          <button className='text-white text-2xl'>
            <Image src='/icons/plane.svg' alt='Share' width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
