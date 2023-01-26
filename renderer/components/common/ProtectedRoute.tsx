import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from '../../firebase/authContext';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { User } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!User) {
      router.push('/home');
    }
  }, [User]);

  return <>{User ? children : null}</>;
}

export default ProtectedRoute;