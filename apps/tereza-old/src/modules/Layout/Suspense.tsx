import * as React from 'react';

export const Suspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
};
