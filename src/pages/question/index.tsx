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
    <div className='flex flex-col p-6 justify-center items-center space-y-6 w-full'>
      {/* 프로그레스 바 */}
      <div className='relative w-full bg-gray-800 h-6 rounded-full overflow-hidden'>
        {/* 진행되는 바 */}
        <div
          className='h-full bg-white transition-all duration-500 ease-in-out'
          style={{ width: `${progress}%` }}
        />

        {/* 프로그레스 바 끝에 체리 아이콘 배치 */}
        <div
          className='absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out'
          style={{ left: `calc(${progress}% - 20px)` }} // 체리가 진행되는 느낌 구현
        >
          <Image
            src='/icons/icon-cherry.svg'
            alt='Cherry'
            width={32}
            height={32}
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
      <div className='flex space-x-4'>
        <Image
          src='/images/test-wolf.png'
          alt='First'
          className='object-contain'
          width={200}
          height={250}
        />
        <Image
          src='/images/test-wolf.png'
          alt='Second'
          className='object-contain'
          width={200}
          height={250}
        />
      </div>

      {/* 선택지 버튼 */}
      <div className='flex flex-col space-y-4 w-full px-4'>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            style={{ backgroundColor: 'black' }}
            className='w-full px-6 py-4 text-white font-[Danjo-bold-Regular] text-lg border border-white rounded-md hover:bg-gray-800 hover:text-gray-300 transition-all duration-300'
            onClick={() => handleAnswerClick(answer.text, answer.type)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
