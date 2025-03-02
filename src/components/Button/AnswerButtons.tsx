import { MbtiType } from '@/constants/mbti';

interface AnswerButtonsProps {
  answers: { text: string; type: MbtiType }[];
  onAnswerClick: (answerText: string, type: MbtiType) => void;
}

export default function AnswerButtons({
  answers,
  onAnswerClick,
}: AnswerButtonsProps) {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 w-full px-4'>
      {answers.map((answer, index) => (
        <button
          key={index}
          className='w-full sm:max-w-sm px-6 py-3 text-white text-sm sm:text-lg border border-white rounded-md hover:bg-gray-800 hover:text-gray-300 transition-all duration-300'
          onClick={() => onAnswerClick(answer.text, answer.type)}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
}
