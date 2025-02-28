import Image from 'next/image';
import { useRouter } from 'next/router';

interface UserProfileProps {
  username: string;
  profileImage: string;
}

export function UserProfile({ username, profileImage }: UserProfileProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className='absolute top-8 left-4 right-4 flex items-center justify-between px-4 z-10'>
      <div className='flex items-center space-x-2'>
        <Image
          src={profileImage}
          alt='Profile'
          width={40}
          height={40}
          className='rounded-full w-8 h-8 sm:w-12 sm:h-12'
        />
        <span className='text-sm sm:text-base font-semibold'>{username}</span>
      </div>
      <Image
        src='/icons/close.svg'
        alt='Close'
        width={24}
        height={24}
        className='cursor-pointer sm:w-7 w-5'
        onClick={handleClose}
      />
    </div>
  );
}
