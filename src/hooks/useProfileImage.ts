import { useState } from 'react';

export default function useProfileImage(defaultImage = '/images/profile.png') {
  const [profileImage, setProfileImage] = useState(defaultImage);

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

  return { profileImage, handleImageChange };
}
