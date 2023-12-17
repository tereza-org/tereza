import { RootProviders } from './RootProviders';
import type { Metadata } from 'next';

import '@tereza-tech/components/src/components/Editor/styles.css';

export const metadata: Metadata = {
  title: 'Tereza',
  description: 'We build tools to help you grow and reach your full potential.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
