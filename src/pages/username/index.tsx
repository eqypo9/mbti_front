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
    <div className='w-full p-6 flex flex-col justify-center items-center space-y-6'>
      <h1 className='text-2xl font-bold text-white'>이름을 입력해주세요</h1>

      {/* ✅ 프로필 이미지 미리보기 */}
      <label htmlFor='profile-upload' className='cursor-pointer'>
        <img
          src={profileImage}
          alt='Profile Preview'
          className='w-36 h-36 rounded-full border-4 border-gray-400 object-cover'
        />
      </label>

      {/* ✅ 프로필 이미지 업로드 */}
      <input
        type='file'
        id='profile-upload'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
      />

      <input
        type='text'
        className='w-full px-4 py-2 border border-gray-300 rounded-md text-lg text-black'
        placeholder='이름을 입력하세요'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />

      <button
        className='px-6 py-3 bg-white text-black font-medium text-lg rounded-md hover:bg-gray-300'
        onClick={handleSubmit}
      >
        제출하기
      </button>
    </div>
  );
}
