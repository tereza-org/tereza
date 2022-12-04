import * as React from 'react';
import { ThemeProvider } from '@tereza-tech/theme';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Root;
