'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/my/home');
  }, [router]);

  return null;
};

export default MyPage;
