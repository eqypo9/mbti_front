import { useState } from 'react';
import { useRouter } from 'next/router';

export default function useUsername(profileImage: string) {
  const [name, setName] = useState('');
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

  return { name, setName, handleSubmit };
}
