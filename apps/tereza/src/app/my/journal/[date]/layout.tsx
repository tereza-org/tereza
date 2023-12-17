'use client';

import { usePathname } from 'next/navigation';

const JournalDateLayout = ({
  children,
  journalDay,
  params,
}: {
  children: React.ReactNode;
  journalDay: React.ReactNode;
  params: {
    date: string;
  };
}) => {
  const pathname = usePathname();

  if (pathname === `/my/journal/${params.date}`) {
    return (
      <>
        {children}
        {journalDay}
      </>
    );
  }

  return <>{children}</>;
};

export default JournalDateLayout;
