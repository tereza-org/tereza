import { RootProviders } from './RootProviders';
import '@tereza-tech/components/dist/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tereza Tech',
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
