import { useState } from 'react';
import { useRouter } from 'next/router';
import { MbtiType } from '@/constants/mbti';
import { questions } from '@/data/questions';

export function useMbti(username: string) {
  const router = useRouter();
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
  const [answerRecords, setAnswerRecords] = useState<
    { questionId: number; question: string; answer: string; type: MbtiType }[]
  >([]);

  const currentQuestion = questions[currentQuestionIndex];

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
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateMbti();
    }
  };

  const calculateMbti = () => {
    const result =
      (mbtiScores.E >= mbtiScores.I ? 'E' : 'I') +
      (mbtiScores.S >= mbtiScores.N ? 'S' : 'N') +
      (mbtiScores.T >= mbtiScores.F ? 'T' : 'F') +
      (mbtiScores.J >= mbtiScores.P ? 'J' : 'P');

    router.push(
      `/result?username=${encodeURIComponent(
        username
      )}&mbti=${result}&records=${encodeURIComponent(
        JSON.stringify(answerRecords)
      )}`
    );
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return { currentQuestion, handleAnswerClick, progress };
}
