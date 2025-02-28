import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSlides } from '@/hooks/useSlides';
import { ProgressBar } from '@/components/ProgressBar/StoryProgress';
import { UserProfile } from '@/components/UserProfile';
import { SlideContent } from '@/components/SlideContent';
import { NavigationButtons } from '@/components/Button/NavigationButtons';
import { ActionButtons } from '@/components/Button/ActionButtons';

export default function ResultPage() {
  return <ResultContent />;
}

function ResultContent() {
  const router = useRouter();
  const storyRef = useRef<HTMLDivElement>(null);
  const { username, profileImage, mbti, best, worst } = useUserInfo();
  const slides = useSlides(username, mbti, best, worst);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleSaveImage = async () => {
    if (storyRef.current) {
      try {
        const canvas = await html2canvas(storyRef.current);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'ganeunghan.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className='relative w-full h-screen flex justify-center items-center bg-black'>
      <div className='relative w-full sm:max-w-[600px] h-full text-white flex flex-col'>
        <ProgressBar currentIndex={currentIndex} total={slides.length} />

        <UserProfile
          username={username}
          profileImage={profileImage}
          onClose={() => router.push('/')}
        />

        <div ref={storyRef} className='relative w-full h-full'>
          <SlideContent currentSlide={slides[currentIndex]} />
        </div>

        <NavigationButtons onPrev={handlePrev} onNext={handleNext} />

        <ActionButtons onDownload={handleSaveImage} />
      </div>
    </div>
  );
}
