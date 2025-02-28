import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UsernamePage() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('/images/profile.png');
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요!');
      return;
    }
    router.push(
      `/question?username=${encodeURIComponent(
        name.trim()
      )}&profileImage=${encodeURIComponent(profileImage)}`
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className='w-full p-4 sm:p-6 flex flex-col justify-center items-center space-y-6'>
      <h1 className='sm:text-2xl text-xl font-bold text-white'>
        소녀의 이름은 무엇인가요?
      </h1>

      {/* 프로필 이미지 업로드 안내 텍스트 */}
      <p className='text-sm text-gray-300'>
        클릭하여 프로필 사진을 업로드하세요!
      </p>

      <label htmlFor='profile-upload' className='relative cursor-pointer'>
        {/* 프로필 이미지 박스 */}
        <div className='sm:w-36 w-28 sm:h-36 h-28 rounded-full border-4 border-gray-400 overflow-hidden relative'>
          <img
            src={profileImage}
            alt='Profile Preview'
            className='w-full h-full object-cover scale-110 block'
          />

          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity'>
            <span className='text-white text-sm font-semibold'>변경하기</span>
          </div>
        </div>
      </label>

      {/* 프로필 이미지 업로드 */}
      <input
        type='file'
        id='profile-upload'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
      />

      <input
        type='text'
        className='w-full px-4 py-2 sm:text-lg text-base border border-gray-300 rounded-md text-black'
        placeholder='이름을 입력하세요'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />

      <button
        className='sm:px-6 px-4 sm:py-3 py-2 bg-white text-black font-medium sm:text-lg text-base rounded-md hover:bg-gray-300'
        onClick={handleSubmit}
      >
        제출하기
      </button>
    </div>
  );
}
