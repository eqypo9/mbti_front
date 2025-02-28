import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { questions } from '@/data/questions';
import { MbtiType } from '@/constants/mbti';
import Image from 'next/image';

type AnswerRecord = {
  questionId: number;
  question: string;
  answer: string;
  type: MbtiType;
};

export default function QuestionPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mbtiScores, setMbtiScores] = useState<Record<MbtiType, number>>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const currentQuestion = questions[currentQuestionIndex];

  // Username 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const user = searchParams.get('username') || '사용자';
      setUsername(user);
    }
  }, []);

  // 답변 클릭 처리
  const handleAnswerClick = (answerText: string, type: MbtiType) => {
    setMbtiScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setAnswerRecords((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        answer: answerText,
        type,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateMbti();
    }
  };

  // MBTI 결과 계산
  const calculateMbti = () => {
    const result =
      (mbtiScores.E >= mbtiScores.I ? 'E' : 'I') +
      (mbtiScores.S >= mbtiScores.N ? 'S' : 'N') +
      (mbtiScores.T >= mbtiScores.F ? 'T' : 'F') +
      (mbtiScores.J >= mbtiScores.P ? 'J' : 'P');

    const query = new URLSearchParams({
      username: username,
      mbti: result,
      records: JSON.stringify(answerRecords),
    }).toString();

    router.push(`/result?${query}`);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className='relative w-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center p-6 space-y-6'>
        {/* 프로그레스 바 */}
        <div className='relative w-full bg-gray-800 h-6 rounded-full overflow-hidden'>
          {/* 진행 바 */}
          <div
            className='h-full bg-white transition-all duration-500 ease-in-out'
            style={{ width: `${progress}%` }}
          />
          {/* 체리 아이콘 */}
          <div
            className='absolute top-1/2 transform -translate-y-1/2 transition-transform duration-500 ease-in-out'
            style={{
              left: `calc(${progress}% - 18px)`,
            }}
          >
            <Image
              src='/icons/icon-cherry.svg'
              alt='Cherry'
              width={30}
              height={30}
              className='object-contain'
            />
          </div>
        </div>

        {/* 상단 질문 */}
        <div className='text-center'>
          <p className='text-lg font-semibold text-white'>
            {currentQuestion.id} / {questions.length}
          </p>
          <h1 className='text-2xl font-bold text-white mt-2 font-[Danjo-bold-Regular]'>
            {currentQuestion.question}
          </h1>
        </div>

        {/* 이미지 */}
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
          <div className='max-w-[45%]'>
            <Image
              src='/images/test-wolf.png'
              alt='First'
              className='object-contain w-full h-auto'
              width={200}
              height={250}
            />
          </div>
          <div className='max-w-[45%]'>
            <Image
              src='/images/test-wolf.png'
              alt='Second'
              className='object-contain w-full h-auto'
              width={200}
              height={250}
            />
          </div>
        </div>

        {/* 선택지 버튼 */}
        <div className='flex flex-col items-center justify-center space-y-3 w-full px-4'>
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className='w-full sm:max-w-sm px-6 py-3 text-white font-[Danjo-bold-Regular] text-sm sm:text-lg border border-white rounded-md hover:bg-gray-800 hover:text-gray-300 transition-all duration-300'
              onClick={() => handleAnswerClick(answer.text, answer.type)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
