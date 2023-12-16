'use client';

import * as React from 'react';
import { Auth, useAuth } from '@ttoss/react-auth';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/my');
    }
  }, [isAuthenticated, router]);

  return <Auth />;
};

export default AuthPage;
