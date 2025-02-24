import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DetailedMbtiType, mbtiMatches, mbtiPeople } from '@/constants/mbti';
import html2canvas from 'html2canvas';
import Image from 'next/image';

export default function ResultPage() {
  return <ResultContent />;
}

function ResultContent() {
  const [username, setUsername] = useState('사용자');
  const [best, setBest] = useState<string[]>([]);
  const [worst, setWorst] = useState<string[]>([]);
  const [rectBgColor, setRectBgColor] = useState('#ffffff');
  const captureRef = useRef<HTMLDivElement>(null);

  const colorPalette = [
    '#ffffff',
    '#f87171',
    '#fbbf24',
    '#34d399',
    '#60a5fa',
    '#c084fc',
    '#f472b6',
  ];

  const [mbti, setMbti] = useState<DetailedMbtiType | '알 수 없음'>(
    '알 수 없음'
  );
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

  const handleSaveImage = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: rectBgColor,
      });
      const link = document.createElement('a');
      link.download = 'result-rectangle.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='w-full max-w-[600px] h-auto bg-[#87ceeb] p-6 flex flex-col items-center space-y-6'>
        {/* 결과 제목 */}
        <h1 className='text-4xl font-bold text-gray-900'>결과</h1>
        <p className='text-2xl font-semibold text-center'>
          <span className='text-blue-600'>{username}</span>님의 MBTI는{' '}
          <span className='text-blue-600'>{mbti}</span>입니다!
        </p>

        {/* 케이크 이미지와 배경 */}
        <div className='w-full flex flex-col items-center space-y-4 p-4'>
          <div
            ref={captureRef}
            className='w-360 h-360 flex justify-center items-center rounded-md p-4'
            style={{ backgroundColor: rectBgColor }}
          >
            <Image
              src='/images/test-cake-jo.png'
              alt='테스트 케이크'
              width={360}
              height={360}
            />
          </div>
        </div>

        {/* 팔레트 선택 및 저장 버튼 */}
        <div className='w-full flex flex-col items-center space-y-4'>
          <label htmlFor='rect-bg-color' className='text-lg font-bold'>
            테두리 선택
          </label>
          <div className='flex space-x-2'>
            {colorPalette.map((color, index) => (
              <button
                key={index}
                onClick={() => setRectBgColor(color)}
                className='w-8 h-8 rounded-full border-2'
                style={{
                  backgroundColor: color,
                  borderColor: rectBgColor === color ? '#000' : 'transparent',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleSaveImage}
            className='px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-md hover:bg-green-600'
          >
            이미지 저장하기
          </button>
        </div>

        {/* 궁합 섹션 */}
        <div className='flex w-full justify-center items-start space-x-12 p-4'>
          <div className='w-1/2 text-center'>
            <h2 className='text-lg font-bold mb-2'>최고의 궁합:</h2>
            <ul className='text-sm space-y-2'>
              {best.map((person, index) => (
                <li key={index} className='text-blue-700'>
                  {person}
                </li>
              ))}
            </ul>
          </div>

          <div className='w-1/2 text-center'>
            <h2 className='text-lg font-bold mb-2'>최악의 궁합:</h2>
            <ul className='text-sm space-y-2'>
              {worst.map((person, index) => (
                <li key={index} className='text-red-700'>
                  {person}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 다시 테스트하기 버튼 */}
        <Link href='/'>
          <button className='px-6 py-3 bg-black text-white font-medium text-lg rounded-md hover:bg-gray-800'>
            다시 테스트하기
          </button>
        </Link>
      </div>
    </div>
  );
}
