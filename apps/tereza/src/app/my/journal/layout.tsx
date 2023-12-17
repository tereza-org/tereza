'use client';

import { usePathname } from 'next/navigation';

const JournalLayout = ({
  children,
  journalSummary,
}: {
  children: React.ReactNode;
  journalSummary: React.ReactNode;
}) => {
  const pathname = usePathname();

  if (pathname === '/my/journal') {
    return (
      <>
        {children}
        {journalSummary}
      </>
    );
  }

  return <>{children}</>;
};

export default JournalLayout;
