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
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='w-full max-w-[600px] h-[720px] bg-[#87ceeb] p-6 flex flex-col justify-center items-center space-y-6'>
        {/* 진행률 바 */}
        <div className='w-full bg-white h-4 rounded-md overflow-hidden'>
          <div
            className='bg-blue-600 h-full transition-all'
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 상단 질문 */}
        <div className='text-center'>
          <p className='text-lg font-semibold'>
            {currentQuestion.id} / {questions.length}
          </p>
          <h1 className='text-2xl font-bold text-gray-900 mt-2'>
            {currentQuestion.question}
          </h1>
        </div>

        {/* 이미지 */}
        <div className='flex space-x-4'>
          <Image
            src='/images/test-one.png'
            alt='Sad'
            className='object-contain'
            width={240}
            height={300}
          />
          <Image
            src='/images/test-two.png'
            alt='Happy'
            className='object-contain'
            width={240}
            height={300}
          />
        </div>

        {/* 선택지 버튼 */}
        <div className='flex flex-col space-y-4'>
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              style={{ backgroundColor: answer.color }}
              className='px-6 py-3 text-white font-medium text-lg rounded-md hover:opacity-90'
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
