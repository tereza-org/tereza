'use client';

import * as React from 'react';
import { Container, Flex } from '@ttoss/ui';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from 'src/relay/environment';
import { useAuth } from '@ttoss/react-auth';

const MyLayout = ({
  auth,
  children,
  navbar,
  sidebar,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{auth}</>;
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Flex
        sx={{
          flexDirection: 'column',
          height: ['100%', '100vh'],
          overflowY: ['hidden'],
          overflowX: 'hidden',
        }}
      >
        {navbar}
        <Container sx={{ flex: 1, overflowY: 'auto' }}>
          <Flex
            sx={{
              height: '100%',
              flexDirection: ['column', 'row'],
              position: 'relative',
            }}
          >
            {sidebar}
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
                    paddingTop: 'xl',
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
    </RelayEnvironmentProvider>
  );
};

export default MyLayout;
