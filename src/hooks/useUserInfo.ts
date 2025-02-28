import { useState, useEffect } from 'react';
import { DetailedMbtiType, mbtiMatches, mbtiPeople } from '@/constants/mbti';

export function useUserInfo() {
  const [username, setUsername] = useState('사용자');
  const [profileImage, setProfileImage] = useState('/images/profile.png');
  const [mbti, setMbti] = useState<DetailedMbtiType | '알 수 없음'>('알 수 없음');
  const [best, setBest] = useState<string[]>([]);
  const [worst, setWorst] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const user = searchParams.get('username') || '사용자';
      const userProfile = searchParams.get('profileImage');
      const mbtiType = searchParams.get('mbti')?.toUpperCase();

      if (mbtiType && Object.keys(mbtiMatches).includes(mbtiType)) {
        const match = mbtiMatches[mbtiType as DetailedMbtiType];
        setBest(mbtiPeople[match.best] || []);
        setWorst(mbtiPeople[match.worst] || []);
        setMbti(mbtiType as DetailedMbtiType);
      }

      setUsername(user);
      if (userProfile) {
        setProfileImage(userProfile);
      }
    }
  }, []);

  return { username, profileImage, mbti, best, worst };
}
