import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { DetailedMbtiType, mbtiMatches, mbtiPeople } from '@/constants/mbti';

export default function ResultPage() {
  return <ResultContent />;
}

function ResultContent() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);

  // ✅ 사용자 정보 (URL 파라미터에서 가져오기)
  const [username, setUsername] = useState('사용자');
  const [profileImage, setProfileImage] = useState('/images/profile.png'); // 유저 프로필 이미지 유지
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
      const userProfile = searchParams.get('profileImage'); // 유저 프로필 이미지 URL 가져오기
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
      if (userProfile) {
        setProfileImage(userProfile); // 유저 프로필 이미지 업데이트
      }
    }
  }, []);

  // ✅ 스토리 슬라이드 데이터
  const slides = [
    { type: 'image', src: '/images/test-cake-jo.png' },
    {
      type: 'text',
      title: `${username}님의 MBTI 결과`,
      description: `당신의 MBTI는 ${mbti} 입니다. 이 유형의 특징은...`,
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

  // ✅ 스토리 슬라이드 전환 기능
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push('/');
    }
  };

  // ✅ 이미지 다운로드 기능 (html2canvas 적용)
  const handleSaveImage = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // 부모 이벤트로 전달 차단

    if (storyRef.current) {
      try {
        const canvas = await html2canvas(storyRef.current);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mbti-story.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className='relative w-full h-screen flex justify-center items-center bg-white'>
      <div className='relative w-full max-w-[600px] h-full bg-black text-white'>
        {/* ✅ 상단 프로그레스 바 */}
        <div className='absolute top-4 left-4 right-4 flex space-x-1 z-10 px-4'>
          {slides.map((_, index) => (
            <div
              key={index}
              className='h-1 bg-gray-600 rounded-full overflow-hidden flex-1'
            >
              <div
                className={`h-full ${
                  index <= currentIndex ? 'bg-white' : 'bg-gray-600'
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

        {/* ✅ 프로필 정보 & 닫기 버튼 */}
        <div className='absolute top-8 left-4 right-4 flex items-center justify-between px-4 z-10'>
          <div className='flex items-center space-x-2'>
            <Image
              src={profileImage}
              alt='Profile'
              width={40}
              height={40}
              className='rounded-full'
            />
            <span className='text-m font-semibold'>{username}</span>
          </div>
          <Image
            src='/icons/close.svg'
            alt='Close'
            width={24}
            height={24}
            className='cursor-pointer'
            onClick={() => router.push('/')}
          />
        </div>

        {/* ✅ 스토리 컨텐츠 (캡처 대상) */}
        <div
          ref={storyRef}
          className='w-full h-full flex items-center justify-center p-4 relative bg-gray-800'
        >
          {slides[currentIndex].type === 'image' ? (
            <Image
              src={slides[currentIndex].src}
              alt='결과 이미지'
              layout='fill'
              objectFit='cover'
              className='pointer-events-none'
            />
          ) : (
            <div className='text-center z-10'>
              <h1 className='text-2xl font-bold'>
                {slides[currentIndex].title}
              </h1>
              <p className='mt-2 text-lg'>{slides[currentIndex].description}</p>
            </div>
          )}
        </div>

        {/* ✅ 좌우 이동 버튼 (<> 스타일 아이콘) */}
        <div className='absolute top-1/2 left-4 transform -translate-y-1/2 z-10'>
          <button onClick={handlePrev}>
            <Image
              src='/icons/icon-left.svg'
              alt='Previous'
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className='absolute top-1/2 right-4 transform -translate-y-1/2 z-10'>
          <button onClick={handleNext}>
            <Image
              src='/icons/icon-right.svg'
              alt='Next'
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* ✅ 하단 아이콘 (좋아요, 다운로드, 공유) */}
        <div className='absolute bottom-6 left-0 right-0 flex justify-between px-10 z-10'>
          <Image src='/icons/heart.svg' alt='Like' width={30} height={30} />
          <button onClick={handleSaveImage}>
            <Image
              src='/icons/icon-download.svg'
              alt='Download'
              width={30}
              height={30}
            />
          </button>
          <Image src='/icons/plane.svg' alt='Share' width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
