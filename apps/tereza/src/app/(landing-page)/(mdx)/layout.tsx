'use client';

import * as React from 'react';
import { BaseStyles, Container } from '@ttoss/ui';

const MDXLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{
        maxWidth: '800px',
      }}
    >
      <BaseStyles>{children}</BaseStyles>
    </Container>
  );
};

export default MDXLayout;
