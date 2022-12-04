import * as React from 'react';
import { ThemeProvider } from 'theme-ui';
import { theme } from './theme';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Root;
