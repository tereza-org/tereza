'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

const MyHomePage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/my/journal');
  }, [router]);

  return null;
};

export default MyHomePage;
