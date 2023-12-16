'use client';

import * as React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from 'src/relay/environment';
import { useAuth } from '@ttoss/react-auth';
import { useRouter } from 'next/navigation';

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthRedirect>{children}</AuthRedirect>
    </RelayEnvironmentProvider>
  );
};

export default MyLayout;
