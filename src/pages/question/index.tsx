import { useState, useEffect } from 'react';
import { useMbti } from '@/hooks/useMbti';
import ProgressBar from '@/components/ProgressBar/QuestionProgress';
import QuestionCard from '@/components/QuestionCard';
import AnswerButtons from '@/components/Button/AnswerButtons';
import { questions } from '@/data/questions';
import Image from 'next/image';

export default function QuestionPage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUsername(searchParams.get('username') || '사용자');
    }
  }, []);

  const { currentQuestion, handleAnswerClick, progress } = useMbti(username);

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-black'>
      <div className="relative max-w-[600px] w-full min-h-[600px] bg-[url('/images/test-bg-cherry.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center p-6 space-y-6">
        <ProgressBar progress={progress} />
        <QuestionCard
          questionId={currentQuestion.id}
          totalQuestions={questions.length}
          questionText={currentQuestion.question}
        />

        <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
          <div className='max-w-[45%]'>
            <Image
              src='/images/test-wolf.png'
              alt='First'
              width={200}
              height={250}
              className='object-contain w-full h-auto'
            />
          </div>
          <div className='max-w-[45%]'>
            <Image
              src='/images/test-wolf.png'
              alt='Second'
              width={200}
              height={250}
              className='object-contain w-full h-auto'
            />
          </div>
        </div>

        <AnswerButtons
          answers={currentQuestion.answers}
          onAnswerClick={handleAnswerClick}
        />
      </div>
    </div>
  );
}
