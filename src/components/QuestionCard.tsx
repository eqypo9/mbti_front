interface QuestionCardProps {
  questionId: number;
  totalQuestions: number;
  questionText: string;
}

export default function QuestionCard({
  questionId,
  totalQuestions,
  questionText,
}: QuestionCardProps) {
  return (
    <div className='text-center'>
      <p className='text-lg font-semibold text-white'>
        {questionId} / {totalQuestions}
      </p>
      <h1 className='text-2xl font-bold text-white mt-2 font-[Danjo-bold-Regular]'>
        {questionText}
      </h1>
    </div>
  );
}
