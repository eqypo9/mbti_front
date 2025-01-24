import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UsernamePage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요!');
      return;
    }
    router.push(`/question?username=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='w-full max-w-[600px] h-[720px] bg-[#87ceeb] p-6 flex flex-col justify-center items-center space-y-6'>
        <h1 className='text-2xl font-bold text-gray-900'>이름을 입력해주세요</h1>
        <input
          type='text'
          className='w-full px-4 py-2 border border-gray-300 rounded-md text-lg'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <button
          className='px-6 py-3 bg-black text-white font-medium text-lg rounded-md hover:bg-blue-700'
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
