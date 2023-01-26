import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from '../../firebase/authContext';

const UnProtectedRoute = ({ children }: PropsWithChildren) => {
  const { User } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!!User) {
      router.push('/userlist');
    }
  }, [User]);

  return <>{User ? null : children}</>;
}

export default UnProtectedRoute;