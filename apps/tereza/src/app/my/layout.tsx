'use client';

import * as React from 'react';
import { AuthProvider } from '@ttoss/react-auth';
import { Button, Container, Flex, Text } from '@ttoss/ui';
import { NotificationsProvider } from '@ttoss/react-notifications';
import { RelayEnvironmentProvider } from 'react-relay';
import { Sidebar } from './Sidebar';
import { environment } from 'src/relay/environment';
import { useAuth } from '@ttoss/react-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

const Navbar = () => {
  const { signOut } = useAuth();

  const onSignOut = React.useCallback(() => {
    signOut().then(() => {
      window.location.href = '/';
    });
  }, [signOut]);

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        padding: 'lg',
        alignItems: 'center',
      }}
    >
      <Text>Tereza</Text>
      <Flex
        sx={{
          gap: 'lg',
        }}
      >
        <Link href="/my/journal">Journal</Link>
        <Link href="/my/zettel">Zettel</Link>
      </Flex>
      <Button onClick={onSignOut}>Sign out</Button>
    </Flex>
  );
};

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationsProvider>
      <AuthProvider>
        <RelayEnvironmentProvider environment={environment}>
          <AuthRedirect>
            <Flex
              sx={{
                flexDirection: 'column',
                height: ['100%', '100vh'],
                overflowY: ['hidden'],
                overflowX: 'hidden',
              }}
            >
              <Navbar />
              <Container sx={{ flex: 1, overflowY: 'auto' }}>
                <Flex
                  sx={{
                    height: '100%',
                    flexDirection: ['column', 'row'],
                    position: 'relative',
                  }}
                >
                  <Sidebar />
                  <Flex
                    sx={{
                      width: '100%',
                      justifyContent: 'center',
                      overflowY: 'auto',
                      paddingX: ['lg', 'xl'],
                      paddingY: ['xl'],
                    }}
                  >
                    <Container
                      as="main"
                      sx={{
                        maxWidth: '800px',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Flex
                        sx={{
                          flexDirection: 'column',
                          gap: '2xl',
                          paddingBottom: '3xl',
                        }}
                      >
                        {children}
                      </Flex>
                    </Container>
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          </AuthRedirect>
        </RelayEnvironmentProvider>
      </AuthProvider>
    </NotificationsProvider>
  );
};

export default MyLayout;
